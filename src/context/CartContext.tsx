import React, { createContext, useContext, useState } from 'react';
import { useOrders } from './OrderContext';
import { MenuItem } from '../types';

interface CartItem extends MenuItem {
  quantity: number;
  tableNumber: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem & { tableNumber: number }) => void;
  removeFromCart: (itemName: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { addOrder } = useOrders();

  const addToCart = (item: MenuItem & { tableNumber: number }) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.name === item.name);
      if (existingItem) {
        return currentItems.map(i =>
          i.name === item.name
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemName: string) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.name === itemName);
      if (existingItem && existingItem.quantity === 1) {
        return currentItems.filter(i => i.name !== itemName);
      }
      return currentItems.map(i =>
        i.name === itemName ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}