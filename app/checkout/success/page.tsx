'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useOrderStore } from '@/lib/store/order-store';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const orders = useOrderStore((state) => state.orders);
  const order = orders.find((o) => o.id === orderId);

  useEffect(() => {
    if (!orderId || !order) {
      router.push('/');
    }
  }, [orderId, order, router]);

  if (!order) {
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="flex items-center justify-center text-green-600 mb-8">
        <CheckCircle2 className="w-12 h-12 mr-2" />
        <h1 className="text-2xl font-bold">Siparişiniz Alındı</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-muted-foreground">
            Sipariş numarası: <span className="font-medium">{order.id}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Sipariş tarihi:{' '}
            {new Date(order.createdAt).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold">Teslimat Adresi</h2>
          <div className="text-sm text-muted-foreground">
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.district} / {order.shippingAddress.city}
            </p>
            <p>{order.shippingAddress.phone}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-semibold mb-4">Sipariş Detayları</h2>
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
      </div>

      <div className="flex justify-center space-x-4">
        <Button asChild>
          <Link href="/account/orders">Siparişlerim</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Alışverişe Devam Et</Link>
        </Button>
      </div>
    </div>
  );
}