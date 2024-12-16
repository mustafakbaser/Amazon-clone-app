'use client';

import { useAuthStore } from '@/lib/store/auth-store';
import { useOrderStore } from '@/lib/store/order-store';
import { formatPrice } from '@/lib/utils';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import Image from 'next/image';

const orderStatusMap = {
  pending: 'Beklemede',
  processing: 'İşleniyor',
  shipped: 'Kargoya Verildi',
  delivered: 'Teslim Edildi',
  cancelled: 'İptal Edildi',
};

const orderStatusColorMap = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export function AccountOrders() {
  const user = useAuthStore((state) => state.user);
  const getOrdersByUserId = useOrderStore((state) => state.getOrdersByUserId);

  if (!user) return null;

  const orders = getOrdersByUserId(user.id);

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground">
          Henüz siparişiniz bulunmuyor
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Siparişleriniz burada listelenecek
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Sipariş tarihi:{' '}
                {format(new Date(order.createdAt), 'dd MMMM yyyy', {
                  locale: tr,
                })}
              </p>
              <p className="text-sm text-muted-foreground">
                Sipariş no: {order.id}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                orderStatusColorMap[order.status]
              }`}
            >
              {orderStatusMap[order.status]}
            </span>
          </div>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 py-2 border-t"
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} adet
                  </p>
                  <p className="text-sm font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between">
              <span className="font-medium">Toplam Tutar</span>
              <span className="font-medium">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}