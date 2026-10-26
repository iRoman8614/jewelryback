import React, { useState } from 'react';
import { Label, Box, Text } from '@adminjs/design-system';

// Фиксированная сетка размеров 15..23 шаг 0.5 (копия src/config/sizes.js —
// компонент бандлится в браузер, импорт серверного конфига сюда не тянем).
const RING_SIZES = (() => {
    const list = [];
    for (let v = 15; v <= 23 + 1e-9; v += 0.5) list.push(String(Number(v.toFixed(1))));
    return list;
})();

// Имя параметра-посредника. Колонку `sizes` (JSON) AdminJS НЕ трогает:
// его адаптер делает flat.unflatten и превращает { "15": 1, "16.5": 2 } в массив.
// Поэтому сервер (after-хук show/edit в admin.js) кладёт сюда JSON-СТРОКУ,
// компонент её читает и отдаёт обратно строкой, а before/after-хуки сами пишут в БД.
const PARAM = 'sizesJson';

const parseSizes = (raw) => {
    if (raw == null) return {};
    if (typeof raw === 'object' && !Array.isArray(raw)) return raw;
    if (typeof raw === 'string' && raw.trim()) {
        try {
            const obj = JSON.parse(raw);
            if (obj && typeof obj === 'object' && !Array.isArray(obj)) return obj;
        } catch { /* ignore */ }
    }
    return {};
};

// ---------- Режим просмотра (show / list) — только текст ----------
const SizeStockView = ({ initial, label, where }) => {
    const filled = RING_SIZES.filter((s) => initial[s] != null && initial[s] !== '');
    const text = filled.length
        ? filled.map((s) => `${s}: ${initial[s]}`).join(', ')
        : 'Безразмерный товар';
    if (where === 'list') return <span>{text}</span>;
    return (
        <Box marginBottom="xl">
            <Label>{label}</Label>
            <Text>{text}</Text>
        </Box>
    );
};

// ---------- Режим редактирования ----------
const SizeStockEdit = ({ initial, label, onChange }) => {
    // Локальное состояние: размер -> строка количества ('' = размер не продаётся).
    const [values, setValues] = useState(() => {
        const map = {};
        for (const s of RING_SIZES) {
            const v = initial[s];
            map[s] = (v === 0 || v) ? String(v) : '';
        }
        return map;
    });

    const pushChange = (next) => {
        // Собираем только заполненные размеры (включая явный 0).
        const obj = {};
        for (const s of RING_SIZES) {
            const raw = next[s];
            if (raw === '' || raw == null) continue;
            obj[s] = Math.max(0, Math.floor(Number(raw) || 0));
        }
        // Пустая строка → безразмерный товар (сервер запишет NULL).
        onChange(PARAM, Object.keys(obj).length ? JSON.stringify(obj) : '');
    };

    const handleChange = (size, raw) => {
        const next = { ...values, [size]: String(raw).replace(/[^\d]/g, '') };
        setValues(next);
        pushChange(next);
    };

    const filledCount = Object.values(values).filter((v) => v !== '').length;

    return (
        <Box marginBottom="lg">
            <Label>{label}</Label>
            <Text variant="sm" style={{ color: '#888', marginBottom: 10 }}>
                Заполните количество только для нужных размеров. Пустая ячейка — размер не продаётся.
                0 — размер есть в линейке, но временно нет в наличии. Если не заполнить ни одного —
                товар считается безразмерным (работает общий Stock Quantity). Для размерного товара
                Stock Quantity пересчитывается автоматически как сумма по размерам.
            </Text>
            <Box
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
                    gap: '10px',
                    maxWidth: '640px',
                }}
            >
                {RING_SIZES.map((size) => (
                    <Box
                        key={size}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: '1px solid #e0e0e0',
                            borderRadius: 6,
                            padding: '6px 8px',
                        }}
                    >
                        <Text style={{ fontWeight: 600, marginBottom: 4 }}>{size}</Text>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            inputMode="numeric"
                            value={values[size]}
                            placeholder="—"
                            onChange={(e) => handleChange(size, e.target.value)}
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                padding: '6px 4px',
                                border: '1px solid #ccc',
                                borderRadius: 4,
                            }}
                        />
                    </Box>
                ))}
            </Box>
            <Text variant="sm" style={{ color: '#888', marginTop: 8 }}>
                {filledCount > 0
                    ? `Заполнено размеров: ${filledCount} (товар размерный).`
                    : 'Размеры не заданы — товар безразмерный.'}
            </Text>
        </Box>
    );
};

const SizeStockInput = (props) => {
    const { record, onChange, where } = props;
    const initial = parseSizes(record?.params?.[PARAM]);
    // AdminJS игнорирует options.label, поэтому подпись задаём здесь.
    const label = 'Размеры (остаток по каждому)';
    if (where === 'show' || where === 'list') {
        return <SizeStockView initial={initial} label={label} where={where} />;
    }
    return <SizeStockEdit initial={initial} label={label} onChange={onChange} />;
};

export default SizeStockInput;