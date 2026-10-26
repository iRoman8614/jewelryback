import React, { useEffect, useState, useCallback } from 'react';
import { Box, H3, H5, Text, Button, Label, Table, TableHead, TableRow, TableCell, TableBody } from '@adminjs/design-system';
import { ApiClient, useNotice } from 'adminjs';

// Действие «Возврат» на заказе: оплаты/возвраты по заказу и форма возврата.
// Все расчёты и проверки — на сервере (paymentService.createRefund);
// здесь только выбор позиций. Кнопка блокируется на время запроса, а сервер
// дополнительно не даст вернуть одну и ту же сумму/позицию дважды.

const api = new ApiClient();

const STATUS_RU = {
    creating: 'отправляется', pending: 'в обработке', succeeded: 'успешно', canceled: 'отменён',
    waiting_for_capture: 'ждёт подтверждения', failed: 'ошибка создания',
};
const money = (v) => `${Number(v || 0).toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ₽`;
const fmtDate = (d) => (d ? new Date(d).toLocaleString('ru-RU') : '');

const RefundAction = (props) => {
    const { record, resource, action } = props;
    const sendNotice = useNotice();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [selected, setSelected] = useState({});
    const [delivery, setDelivery] = useState(false);
    const [restock, setRestock] = useState(true);
    const [reason, setReason] = useState('');

    const call = useCallback(async (data) => {
        // POST шлём как multipart/form-data (как стандартные формы AdminJS):
        // JSON-тело перехватывает express.json() сервера, и роутер AdminJS
        // (formidable) его уже не получит.
        let form = null;
        if (data) {
            form = new FormData();
            Object.entries(data).forEach(([k, v]) => form.append(k, v == null ? '' : String(v)));
        }
        const res = await api.recordAction({
            resourceId: resource.id,
            recordId: record.id,
            actionName: action.name,
            ...(form ? { data: form } : {}),
        });
        return res.data;
    }, [resource.id, record.id, action.name]);

    const load = useCallback(async (data) => {
        setLoading(true);
        try {
            const d = await call(data);
            if (d.notice) sendNotice(d.notice);
            if (d.refundInfo) setInfo(d.refundInfo);
            setSelected({});
            setDelivery(false);
        } catch (e) {
            sendNotice({ message: `Ошибка: ${e.message}`, type: 'error' });
        } finally {
            setLoading(false);
        }
    }, [call, sendNotice]);

    useEffect(() => { load(); }, [load]);

    if (loading && !info) return <Box p="xl"><Text>Загрузка…</Text></Box>;
    if (!info) return <Box p="xl"><Text>Нет данных.</Text></Box>;

    const refundable = info.items.filter((i) => i.refundableQuantity > 0);
    const selectedSum = info.items
        .filter((i) => selected[i.id])
        .reduce((s, i) => s + Number(i.price) * i.refundableQuantity, 0)
        + (delivery ? Number(info.deliveryCost) : 0);

    const submit = async (full) => {
        const sum = full ? Number(info.remainingAmount) : selectedSum;
        const text = full
            ? `Вернуть ВСЮ оставшуюся сумму ${money(sum)} покупателю?`
            : `Вернуть ${money(sum)} за выбранные позиции?`;
        if (!window.confirm(text)) return;
        setBusy(true);
        try {
            await load({
                op: 'refund',
                full: full ? 'true' : 'false',
                itemIds: Object.keys(selected).filter((k) => selected[k]).join(','),
                includeDelivery: delivery ? 'true' : 'false',
                restock: restock ? 'true' : 'false',
                reason,
            });
        } finally {
            setBusy(false);
        }
    };

    const sync = async () => {
        setBusy(true);
        try { await load({ op: 'sync' }); } finally { setBusy(false); }
    };

    return (
        <Box variant="white" p="xl">
            <H3>Оплата и возвраты — заказ №{info.orderId}</H3>
            <Text mb="lg">
                Статус заказа: <b>{info.status}</b> · оплата: <b>{info.paymentStatus || '—'}</b> ·
                оплачено: <b>{money(info.paidAmount)}</b> · возвращено: <b>{money(info.refundedAmount)}</b> ·
                доступно к возврату: <b>{money(info.remainingAmount)}</b>
            </Text>

            <H5>Платежи</H5>
            <Table mb="lg">
                <TableHead><TableRow>
                    <TableCell>#</TableCell><TableCell>ID ЮKassa</TableCell><TableCell>Способ</TableCell>
                    <TableCell>Сумма</TableCell><TableCell>Статус</TableCell><TableCell>Возвращено</TableCell><TableCell>Создан</TableCell>
                </TableRow></TableHead>
                <TableBody>
                    {info.payments.map((p) => (
                        <TableRow key={p.id}>
                            <TableCell>{p.attempt}{p.isPrimary ? ' ✓' : ''}{p.isDuplicate ? ' (лишний)' : ''}</TableCell>
                            <TableCell>{p.externalId || '—'}</TableCell>
                            <TableCell>{p.method}</TableCell>
                            <TableCell>{money(p.amount)}</TableCell>
                            <TableCell>{STATUS_RU[p.status] || p.status}</TableCell>
                            <TableCell>{money(p.refundedAmount)}</TableCell>
                            <TableCell>{fmtDate(p.createdAt)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {info.refunds.length > 0 && (
                <>
                    <H5>Возвраты</H5>
                    <Table mb="lg">
                        <TableHead><TableRow>
                            <TableCell>ID ЮKassa</TableCell><TableCell>Сумма</TableCell><TableCell>Статус</TableCell>
                            <TableCell>Тип</TableCell><TableCell>Кто</TableCell><TableCell>Причина / ошибка</TableCell><TableCell>Дата</TableCell>
                        </TableRow></TableHead>
                        <TableBody>
                            {info.refunds.map((r) => (
                                <TableRow key={r.id}>
                                    <TableCell>{r.externalId || '—'}</TableCell>
                                    <TableCell>{money(r.amount)}</TableCell>
                                    <TableCell>{STATUS_RU[r.status] || r.status}</TableCell>
                                    <TableCell>{r.kind === 'order' ? 'по заказу' : 'автовозврат'}</TableCell>
                                    <TableCell>{r.adminEmail || 'система'}</TableCell>
                                    <TableCell>{r.lastError || r.reason || ''}</TableCell>
                                    <TableCell>{fmtDate(r.createdAt)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}

            <Box mb="lg"><Button type="button" variant="outlined" size="sm" disabled={busy} onClick={sync}>Обновить статусы из ЮKassa</Button></Box>

            {info.canRefund ? (
                <Box style={{ borderTop: '1px solid #ddd', paddingTop: 16 }}>
                    <H5>Новый возврат</H5>
                    {refundable.map((i) => (
                        <Box key={i.id} mb="sm">
                            <label style={{ cursor: 'pointer' }}>
                                <input type="checkbox" checked={Boolean(selected[i.id])}
                                    onChange={(e) => setSelected({ ...selected, [i.id]: e.target.checked })} />{' '}
                                {i.productName}{i.size ? `, размер ${i.size}` : ''} × {i.refundableQuantity} — {money(Number(i.price) * i.refundableQuantity)}
                            </label>
                        </Box>
                    ))}
                    {info.deliveryRefundable && (
                        <Box mb="sm">
                            <label style={{ cursor: 'pointer' }}>
                                <input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} />{' '}
                                Доставка — {money(info.deliveryCost)}
                            </label>
                        </Box>
                    )}
                    <Box mb="sm" mt="md">
                        <label style={{ cursor: 'pointer' }}>
                            <input type="checkbox" checked={restock} onChange={(e) => setRestock(e.target.checked)} />{' '}
                            Вернуть возвращаемые позиции на склад (снова в продаже)
                        </label>
                    </Box>
                    <Box mb="lg">
                        <Label>Причина (видна в истории заказа и в ЮKassa)</Label>
                        <input type="text" value={reason} maxLength={200} onChange={(e) => setReason(e.target.value)}
                            style={{ width: '100%', maxWidth: 520, padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
                    </Box>
                    <Box display="flex" style={{ gap: 12 }}>
                        <Button type="button" variant="danger" disabled={busy || selectedSum <= 0} onClick={() => submit(false)}>
                            Вернуть выбранное ({money(selectedSum)})
                        </Button>
                        <Button type="button" variant="danger" disabled={busy} onClick={() => submit(true)}>
                            Вернуть всё ({money(info.remainingAmount)})
                        </Button>
                    </Box>
                    {busy && <Text mt="md">Отправляем запрос в ЮKassa…</Text>}
                </Box>
            ) : (
                <Text>Возвращать нечего: заказ не оплачен онлайн или сумма уже полностью возвращена.</Text>
            )}
        </Box>
    );
};

export default RefundAction;
