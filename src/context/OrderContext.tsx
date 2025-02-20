import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderItem, Order } from '../types';

interface OrderContextType {
  orders: Order[];
  addOrder: (items: OrderItem[]) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updatePaymentStatus: (orderId: string, paymentStatus: Order['paymentStatus']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('restaurant_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('restaurant_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const interval = setInterval(() => {
      const savedOrders = localStorage.getItem('restaurant_orders');
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        if (JSON.stringify(parsedOrders) !== JSON.stringify(orders)) {
          setOrders(parsedOrders);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [orders]);

  const addOrder = (items: OrderItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: Date.now().toString(),
      items,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      timestamp: new Date(),
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const updatePaymentStatus = (orderId: string, paymentStatus: Order['paymentStatus']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, paymentStatus } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, updatePaymentStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}