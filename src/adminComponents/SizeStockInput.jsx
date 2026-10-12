import React, { useState } from 'react';
import { Label, Box, Text } from '@adminjs/design-system';

// Фиксированная сетка размеров 15..23 шаг 0.5 (копия src/config/sizes.js —
// компонент бандлится в браузер, импорт серверного конфига сюда не тянем).
const RING_SIZES = (() => {
    const list = [];
    for (let v = 15; v <= 23 + 1e-9; v += 0.5) list.push(String(Number(v.toFixed(1))));
    return list;
})();

// Читает текущее значение sizes из record (строка JSON, объект или flatten-ключи).
const readInitial = (record, path) => {
    const params = record?.params || {};
    const direct = params[path];
    if (direct != null) {
        if (typeof direct === 'object') return { ...direct };
        if (typeof direct === 'string' && direct.trim()) {
            try { return JSON.parse(direct); } catch { /* ignore */ }
        }
    }
    // AdminJS мог разложить JSON по ключам "sizes.15" и т.п.
    const out = {};
    for (const [k, v] of Object.entries(params)) {
        if (k.startsWith(`${path}.`)) {
            const size = k.slice(path.length + 1);
            if (RING_SIZES.includes(size) && v !== '' && v != null) out[size] = v;
        }
    }
    return out;
};

const SizeStockInput = (props) => {
    const { property, record, onChange } = props;
    const path = property.path;

    // Локальное состояние: размер -> строка количества ('' = размер не продаётся).
    const [values, setValues] = useState(() => {
        const init = readInitial(record, path);
        const map = {};
        for (const s of RING_SIZES) {
            const v = init?.[s];
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
            const n = Math.max(0, Math.floor(Number(raw) || 0));
            obj[s] = n;
        }
        // Пусто → null (БЕЗРАЗМЕРНЫЙ товар, работает общий Stock Quantity).
        const payload = Object.keys(obj).length ? JSON.stringify(obj) : '';
        onChange(path, payload);
    };

    const handleChange = (size, raw) => {
        const next = { ...values, [size]: raw.replace(/[^\d]/g, '') };
        setValues(next);
        pushChange(next);
    };

    const filledCount = Object.values(values).filter((v) => v !== '').length;

    return (
        <Box marginBottom="lg">
            <Label>{property.label || 'Размеры (остаток по каждому)'}</Label>
            <Text variant="sm" style={{ color: '#888', marginBottom: 10 }}>
                Заполните количество только для нужных размеров. Пустая ячейка — размер не продаётся.
                0 — размер есть в линейке, но временно нет в наличии. Если не заполнить ни одного —
                товар считается безразмерным (работает общий Stock Quantity).
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

export default SizeStockInput;