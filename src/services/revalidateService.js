// Уведомляет фронтенд (Next.js ISR) о том, что данные изменились, чтобы он
// мгновенно сбросил кэш нужных страниц вместо ожидания таймера revalidate.
//
// Полностью additive и безопасно: если переменные окружения не заданы или
// фронт недоступен — просто логируем и НЕ роняем основной запрос (заказ,
// сохранение в админке и т.п. проходят в любом случае). Это "fire-and-forget".
//
// Требует env:
//   FRONTEND_REVALIDATE_URL  — напр. http://frontend:3000/api/revalidate
//                              (внутренний адрес контейнера) или https-URL.
//   REVALIDATE_SECRET        — общий секрет, совпадает с фронтом.

const REVALIDATE_URL = process.env.FRONTEND_REVALIDATE_URL;
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

/**
 * @param {Object} payload
 * @param {string[]} [payload.tags]  теги кэша: navigation|content|checkout|products|product-{id}
 * @param {string[]} [payload.paths] пути: '/', '/gallery', '/item/123'
 */
export async function revalidateFrontend({ tags = [], paths = [] } = {}) {
    if (!REVALIDATE_URL || !REVALIDATE_SECRET) {
        // Не настроено (например, локалка без фронта) — тихо выходим.
        return;
    }
    if (tags.length === 0 && paths.length === 0) return;

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(REVALIDATE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ secret: REVALIDATE_SECRET, tags, paths }),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) {
            console.error(`[revalidate] frontend responded ${res.status}`);
        }
    } catch (error) {
        // Сетевая ошибка / таймаут / фронт лежит — не критично для бэка.
        console.error('[revalidate] failed to notify frontend:', error?.message || error);
    }
}

export default revalidateFrontend;
