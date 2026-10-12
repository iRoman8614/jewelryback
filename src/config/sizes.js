// src/config/sizes.js
// Фиксированная сетка размеров колец: 15..23 с шагом 0.5 (17 значений).
// Единый источник на бэке (админ-компонент + валидация заказа).
// На фронте есть своя копия (front/src/lib/sizes.js) — держать синхронно.

export const RING_SIZES = (() => {
    const list = [];
    for (let v = 15; v <= 23 + 1e-9; v += 0.5) {
        // нормализуем к строке без лишних нулей: 15, 15.5, 16, ...
        list.push(String(Number(v.toFixed(1))));
    }
    return list;
})();

// Проверка, что строка размера принадлежит сетке.
export const isValidSize = (s) => RING_SIZES.includes(String(s));

// Нормализует объект sizes из админки/БД: оставляет только валидные ключи,
// значения приводит к неотрицательным целым. Пустой результат → null (безразмерный).
export const normalizeSizes = (raw) => {
    if (raw == null) return null;
    let obj = raw;
    if (typeof raw === 'string') {
        const t = raw.trim();
        if (!t) return null;
        try { obj = JSON.parse(t); } catch { return null; }
    }
    if (typeof obj !== 'object' || Array.isArray(obj)) return null;
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
        if (!isValidSize(k)) continue;
        const n = Math.max(0, Math.floor(Number(v) || 0));
        out[String(k)] = n;
    }
    return Object.keys(out).length ? out : null;
};

export default RING_SIZES;