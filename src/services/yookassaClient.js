// src/services/yookassaClient.js
//
// Тонкий HTTP-клиент API ЮKassa v3.
//   • Basic-авторизация shopId:secretKey
//   • Idempotence-Key на каждый POST (обязателен). Повтор с тем же ключом в
//     течение 24 часов возвращает РЕЗУЛЬТАТ ПЕРВОГО запроса — это и есть
//     защита от двойного списания на стороне ЮKassa.
//   • При сетевой ошибке / 5xx повторяем с ТЕМ ЖЕ ключом (рекомендация ЮKassa:
//     «HTTP 500 не говорит об успешности операции»).
//   • 4xx не повторяем — это ошибка данных.

import axios from 'axios';
import { getPaymentConfig } from '../config/payments.js';

export class YooKassaError extends Error {
    constructor(message, { status = null, code = null, retriable = false, data = null } = {}) {
        super(message);
        this.name = 'YooKassaError';
        this.status = status;
        this.code = code;
        this.retriable = retriable;
        this.data = data;
    }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Фибоначчи-паузы между повторами (рекомендация ЮKassa).
// Итого не дольше ~40 с — запрос идёт под блокировкой строки заказа.
const BACKOFF_MS = [700, 1500];

const request = async (method, path, { body, idempotenceKey } = {}) => {
    const cfg = getPaymentConfig();
    if (!cfg.shopId || !cfg.secretKey) {
        throw new YooKassaError('YooKassa is not configured (YOOKASSA_SHOP_ID / YOOKASSA_SECRET_KEY).', { code: 'not_configured' });
    }
    if (method !== 'GET' && !idempotenceKey) {
        throw new YooKassaError('Idempotence-Key is required for POST requests.');
    }

    const headers = { 'Content-Type': 'application/json' };
    if (idempotenceKey) headers['Idempotence-Key'] = String(idempotenceKey).slice(0, 64);

    let lastErr = null;
    for (let attempt = 0; attempt <= BACKOFF_MS.length; attempt++) {
        try {
            const res = await axios.request({
                method,
                url: `${cfg.apiUrl}${path}`,
                data: body,
                headers,
                auth: { username: cfg.shopId, password: cfg.secretKey },
                timeout: 12000,
                // проверяем статус сами
                validateStatus: () => true,
            });

            if (res.status >= 200 && res.status < 300) return res.data;

            const data = res.data || {};
            const msg = `YooKassa ${method} ${path} → HTTP ${res.status}: ${data.description || data.code || 'error'}`;
            // 202 / 5xx — результат неизвестен, повторяем с тем же ключом.
            if (res.status === 202 || res.status >= 500) {
                lastErr = new YooKassaError(msg, { status: res.status, code: data.code, retriable: true, data });
            } else {
                // 4xx — повтор не поможет.
                throw new YooKassaError(msg, { status: res.status, code: data.code, retriable: false, data });
            }
        } catch (err) {
            if (err instanceof YooKassaError && !err.retriable) throw err;
            lastErr = err instanceof YooKassaError
                ? err
                : new YooKassaError(`YooKassa ${method} ${path} network error: ${err.message}`, { retriable: true });
        }
        if (attempt < BACKOFF_MS.length) await sleep(BACKOFF_MS[attempt]);
    }
    throw lastErr;
};

export const yookassa = {
    createPayment: (body, idempotenceKey) => request('POST', '/payments', { body, idempotenceKey }),
    getPayment: (id) => request('GET', `/payments/${encodeURIComponent(id)}`),
    capturePayment: (id, body, idempotenceKey) =>
        request('POST', `/payments/${encodeURIComponent(id)}/capture`, { body: body || {}, idempotenceKey }),
    cancelPayment: (id, idempotenceKey) =>
        request('POST', `/payments/${encodeURIComponent(id)}/cancel`, { body: {}, idempotenceKey }),
    createRefund: (body, idempotenceKey) => request('POST', '/refunds', { body, idempotenceKey }),
    getRefund: (id) => request('GET', `/refunds/${encodeURIComponent(id)}`),
    createReceipt: (body, idempotenceKey) => request('POST', '/receipts', { body, idempotenceKey }),
};

export default yookassa;
