// src/adminComponents/Dashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, H2, H3, Text, Table, TableHead, TableRow, TableCell, TableBody,
    Select, Button, Icon, Label
} from '@adminjs/design-system';
import axios from 'axios';

const ALL_POSSIBLE_STATUSES = [
    'Новый', 'Принят', 'Оплачен', 'В сборке', 'Передан в доставку',
    'Готов к самовывозу', 'Завершен', 'Отменен', 'Возврат'
];

const DEFAULT_IN_PROGRESS_STATUSES = ['Принят', 'Оплачен', 'В сборке', 'Передан в доставку', 'Готов к самовывозу'];

const NewOrdersWidget = ({ refreshInProgressOrdersTrigger }) => { // Принимаем триггер обновления
    const [newOrders, setNewOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNewOrders = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/orders/status/Новый?limit=5&sortBy=createdAt&sortDirection=DESC');
            setNewOrders(response.data.orders || []);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch new orders:", err);
            setError('Failed to load new orders.');
            setNewOrders([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNewOrders();
    }, [fetchNewOrders]);

    const handleChangeOrderStatus = async (orderId, newStatus, comment) => {
        try {
            await axios.put(`/api/orders/${orderId}/status`, { newStatus, adminComment: comment });
            // alert(`Статус заказа #${orderId} обновлен на "${newStatus}"`);
            fetchNewOrders();
            if (refreshInProgressOrdersTrigger) { // Вызываем триггер, если он есть
                refreshInProgressOrdersTrigger();
            }
        } catch (err) {
            console.error(`Failed to update status for order ${orderId} to ${newStatus}:`, err);
            alert(`Ошибка обновления статуса для заказа #${orderId}.`);
        }
    };

    if (loading) return <Text>Loading new orders...</Text>;
    if (error) return <Text color="danger">{error}</Text>;
    if (newOrders.length === 0) return <Text>No new orders found.</Text>;

    return (
        <Box variant="white" boxShadow="card" p="lg">
            <H3 mb="md">Новые Заказы</H3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Дата</TableCell>
                        <TableCell>Клиент</TableCell>
                        <TableCell>Сумма</TableCell>
                        <TableCell>Товары</TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {newOrders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <a href={`/admin/resources/orders/records/${order.id}/show`} target="_blank" rel="noopener noreferrer">
                                    #{order.id}
                                </a>
                            </TableCell>
                            <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                            <TableCell>{order.customerName}</TableCell>
                            <TableCell>{parseFloat(order.totalAmount).toFixed(2)} Р</TableCell>
                            <TableCell>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {(order.items || []).map(item => (
                                        <li key={item.id}>{item.productName} x {item.quantity}</li>
                                    ))}
                                </ul>
                            </TableCell>
                            <TableCell>
                                <Box display="flex" style={{ gap: '8px' }}>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => handleChangeOrderStatus(order.id, 'Принят', 'Order accepted from dashboard')}
                                    >
                                        <Icon icon="Check" /> В работу
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => {
                                            if (window.confirm(`Вы уверены, что хотите отменить заказ #${order.id}?`)) {
                                                handleChangeOrderStatus(order.id, 'Отменен', 'Order cancelled from dashboard');
                                            }
                                        }}
                                    >
                                        <Icon icon="Close" /> Отменить
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

const InProgressOrdersWidget = ({ refreshTrigger, onRefreshDone }) => {
    const [inProgressOrders, setInProgressOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFilterStatuses, setSelectedFilterStatuses] = useState(new Set(DEFAULT_IN_PROGRESS_STATUSES));
    const [orderStatusesForEdit, setOrderStatusesForEdit] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmModalData, setConfirmModalData] = useState({ orderId: null, newStatus: null });


    const fetchInProgressOrders = useCallback(async () => {
        const statusesToFetch = Array.from(selectedFilterStatuses);
        if (statusesToFetch.length === 0) {
            setInProgressOrders([]);
            setLoading(false);
            setError(null);
            return;
        }
        try {
            setLoading(true);
            const statusQuery = statusesToFetch.map(s => `status=${encodeURIComponent(s)}`).join('&');
            const response = await axios.get(`/api/orders/filter?${statusQuery}&limit=10&sortBy=updatedAt&sortDirection=ASC`);
            const fetchedOrders = response.data.orders || [];
            setInProgressOrders(fetchedOrders);
            const initialStatusesForEdit = {};
            fetchedOrders.forEach(order => {
                initialStatusesForEdit[order.id] = order.status;
            });
            setOrderStatusesForEdit(initialStatusesForEdit);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch in-progress orders:", err);
            setError('Failed to load in-progress orders.');
            setInProgressOrders([]);
        } finally {
            setLoading(false);
            if (onRefreshDone) onRefreshDone();
        }
    }, [selectedFilterStatuses, onRefreshDone]);

    useEffect(() => {
        fetchInProgressOrders();
    }, [fetchInProgressOrders, refreshTrigger]);

    const handleStatusFilterChange = (statusValue, isChecked) => {
        setSelectedFilterStatuses(prev => {
            const newSet = new Set(prev);
            if (isChecked) newSet.add(statusValue);
            else newSet.delete(statusValue);
            return newSet;
        });
    };

    const handleStatusEditChange = (orderId, newStatus) => {
        setOrderStatusesForEdit(prev => ({ ...prev, [orderId]: newStatus }));
    };

    const prepareToSaveStatus = (orderId) => {
        const newStatus = orderStatusesForEdit[orderId];
        if (!newStatus) {
            alert("Сначала выберите новый статус.");
            return;
        }
        setConfirmModalData({ orderId, newStatus });
        setShowConfirmModal(true);
    };

    const cancelStatusChange = () => {
        setShowConfirmModal(false);
        setConfirmModalData({ orderId: null, newStatus: null });
    };

    const confirmAndSaveStatus = async () => {
        const { orderId, newStatus } = confirmModalData;
        if (!orderId || !newStatus) return;
        setShowConfirmModal(false);
        try {
            await axios.put(`/api/orders/${orderId}/status`, { newStatus, adminComment: 'Status updated from dashboard' });
            fetchInProgressOrders();
        } catch (err) {
            console.error(`Failed to update status for order ${orderId}:`, err);
            alert(`Ошибка обновления статуса для заказа #${orderId}.`);
        } finally {
            setConfirmModalData({ orderId: null, newStatus: null });
        }
    };


    return (
        <>
            <Box variant="white" boxShadow="card" p="lg">
                <H3 mb="md">Заказы в Работе</H3>
                <Box mb="md">
                    <Label>Фильтр по статусам:</Label>
                    <Box display="flex" flexWrap="wrap" style={{ gap: '10px', marginTop: '8px' }}>
                        {DEFAULT_IN_PROGRESS_STATUSES.map(statusOption => (
                            <Box key={statusOption} display="flex" alignItems="center" mr="md">
                                <input
                                    type="checkbox"
                                    id={`filter-status-${statusOption.replace(/\s+/g, '-')}`}
                                    checked={selectedFilterStatuses.has(statusOption)}
                                    onChange={(e) => handleStatusFilterChange(statusOption, e.target.checked)}
                                    style={{ marginRight: '5px' }}
                                />
                                <Label htmlFor={`filter-status-${statusOption.replace(/\s+/g, '-')}`}>{statusOption}</Label>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {loading && <Text>Loading in-progress orders...</Text>}
                {!loading && error && <Text color="danger">{error}</Text>}
                {!loading && !error && selectedFilterStatuses.size === 0 && <Text>Выберите статусы для отображения заказов в работе.</Text>}
                {!loading && !error && selectedFilterStatuses.size > 0 && inProgressOrders.length === 0 && <Text>По выбранным статусам заказы не найдены.</Text>}

                {!loading && !error && inProgressOrders.length > 0 && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Клиент</TableCell>
                                <TableCell>Товары</TableCell>
                                <TableCell>Текущий Статус</TableCell>
                                <TableCell>Действие</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inProgressOrders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <a href={`/admin/resources/orders/records/${order.id}/show`} target="_blank" rel="noopener noreferrer">
                                            #{order.id}
                                        </a>
                                    </TableCell>
                                    <TableCell>{order.customerName}</TableCell>
                                    <TableCell>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {(order.items || []).map(item => (
                                                <li key={item.id}>{item.productName} x {item.quantity}</li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={{ value: orderStatusesForEdit[order.id] || order.status, label: orderStatusesForEdit[order.id] || order.status }}
                                            options={ALL_POSSIBLE_STATUSES.map(s => ({ value: s, label: s }))}
                                            onChange={(selected) => handleStatusEditChange(order.id, selected.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="primary" size="sm" onClick={() => prepareToSaveStatus(order.id)}>
                                            <Icon icon="Save" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Box>

            {showConfirmModal && confirmModalData.orderId && (
                <Box
                    style={{
                        position: 'fixed', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)', zIndex: 1050,
                        padding: '20px', background: 'white', borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)', textAlign: 'center',
                    }}
                    width={['90%', '400px']}
                >
                    <H3 mb="lg">Подтвердите действие</H3>
                    <Text mb="xl">
                        {`Изменить статус заказа #${confirmModalData.orderId} на "${confirmModalData.newStatus}"?`}
                    </Text>
                    <Box display="flex" justifyContent="center">
                        <Button variant="primary" onClick={confirmAndSaveStatus} mr="md">
                            Подтвердить
                        </Button>
                        <Button variant="text" onClick={cancelStatusChange}>
                            Отмена
                        </Button>
                    </Box>
                </Box>
            )}
            {showConfirmModal && (
                <Box
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040,
                    }}
                    onClick={cancelStatusChange}
                />
            )}
        </>
    );
};

// --- 1. НОВЫЙ ВИДЖЕТ-ИНСТРУКЦИЯ ---
const GuideWidget = () => {
    return (
        <Box variant="white" boxShadow="card" p="lg">
            <H3 mb="md">Гид по разделам</H3>
            <Box as="ul" style={{ listStyle: 'none', padding: 0 }}>
                <Box as="li" mb="md">
                    <Text display="flex" alignItems="center">
                        <Icon icon="Archive" mr="md" />
                        <Text><b>Catalog:</b> Управление категориями, коллекциями и товарами.</Text>
                    </Text>
                </Box>
                <Box as="li" mb="md">
                    <Text display="flex" alignItems="center">
                        <Icon icon="Settings" mr="md" />
                        <Text><b>Shop Settings:</b> Настройка способов доставки и оплаты.</Text>
                    </Text>
                </Box>
                <Box as="li" mb="md">
                    <Text display="flex" alignItems="center">
                        <Icon icon="Layout" mr="md" />
                        <Text><b>Content:</b> Редактирование контента на страницах сайта (главная, галереи и т.д.).</Text>
                    </Text>
                </Box>
                <Box as="li" mb="md">
                    <Text display="flex" alignItems="center">
                        <Icon icon="User" mr="md" />
                        <Text><b>Admin Users:</b> Управление учетными записями администраторов.</Text>
                    </Text>
                </Box>
                <Box as="li" mb="md">
                    <Text display="flex" alignItems="center">
                        <Icon icon="ShoppingCart" mr="md" />
                        <Text><b>Orders:</b> Просмотр всех заказов и их деталей.</Text>
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};


// --- 2. НОВЫЙ ВИДЖЕТ ДЛЯ ОЧИСТКИ ---
const CleanupWidget = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleCleanupClick = () => {
        if (!window.confirm('Вы уверены, что хотите удалить все неиспользуемые изображения? Это действие необратимо.')) {
            return;
        }

        setIsLoading(true);
        setMessage(null);

        axios.post('/api/cleanup/unused-images-test')
            .then(response => {
                setMessage({
                    type: 'success',
                    text: response.data.message,
                });
            })
            .catch(error => {
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || 'An error occurred during cleanup.',
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Box variant="white" boxShadow="card" p="lg">
            <H3>Обслуживание</H3>
            <Text mt="md" color="grey60">
                Нажмите кнопку ниже, чтобы просканировать папку "uploads" и удалить все изображения,
                которые больше не привязаны ни к одной записи в базе данных.
            </Text>

            {/* --- ИЗМЕНЕНИЕ ЗДЕСЬ: Используем компонент Text вместо MessageBox --- */}
            {message && (
                <Text
                    mt="lg"
                    p="md"
                    border="1px solid"
                    // В зависимости от типа сообщения меняем цвет рамки и текста
                    borderColor={message.type === 'success' ? 'success' : 'danger'}
                    color={message.type === 'success' ? 'success' : 'danger'}
                    borderRadius="default"
                    bg={message.type === 'success' ? 'lightSuccess' : 'lightDanger'}
                >
                    {message.text}
                </Text>
            )}
            {/* -------------------------------------------------------------------- */}

            <Button onClick={handleCleanupClick} disabled={isLoading} variant="danger" mt="md">
                {isLoading ? (<><Icon icon="Loader" spin /> Очистка...</>) : (<><Icon icon="Trash" /> Очистить неиспользуемые изображения</>)}
            </Button>
        </Box>
    );
};

const Dashboard = () => {
    const [refreshInProgressKey, setRefreshInProgressKey] = useState(0);

    const triggerInProgressRefresh = () => {
        setRefreshInProgressKey(prevKey => prevKey + 1);
    };

    return (
        <Box>
            <Box mb="xl" p="lg">
                <H2>Панель Управления Магазином</H2>
            </Box>
            <Box display="grid" gridTemplateColumns={{ _: "1fr" }} gridGap="lg" p="lg">
                <NewOrdersWidget refreshInProgressOrdersTrigger={triggerInProgressRefresh} />
                <InProgressOrdersWidget key={refreshInProgressKey} refreshTrigger={refreshInProgressKey} onRefreshDone={() => {}}/>
                <GuideWidget />
                <CleanupWidget />
            </Box>
        </Box>
    );
};

export default Dashboard;