import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus } from '@/lib/types/order';
import { generateId } from '@/lib/utils';

interface OrderStore {
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrdersByUserId: (userId: string) => Order[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      
      createOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: generateId(),
          status: 'pending',
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [...state.orders, newOrder],
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },

      getOrdersByUserId: (userId) => {
        return get().orders.filter((order) => order.userId === userId);
      },
    }),
    {
      name: 'order-storage',
    }
  )
);