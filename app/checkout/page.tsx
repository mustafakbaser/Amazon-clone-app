'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import { useCartStore } from '@/lib/store/cart-store';
import { useOrderStore } from '@/lib/store/order-store';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { CheckoutSummary } from '@/components/checkout/checkout-summary';
import { OrderAddress } from '@/lib/types/order';

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { items, getTotalPrice, clearCart } = useCartStore();
  const createOrder = useOrderStore((state) => state.createOrder);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login?redirect=/checkout');
    } else if (items.length === 0) {
      router.push('/cart');
    }
  }, [user, items.length, router]);

  const handleCheckoutComplete = async (shippingAddress: OrderAddress, paymentMethod: string) => {
    if (!user) return;

    try {
      const order = createOrder({
        userId: user.id,
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalAmount: getTotalPrice(),
        shippingAddress,
        paymentMethod,
      });

      clearCart();
      router.push(`/checkout/success?orderId=${order.id}`);
    } catch (error) {
      console.error('Sipariş oluşturulurken bir hata oluştu:', error);
    }
  };

  if (!user || items.length === 0) {
    return null;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ödeme</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm onComplete={handleCheckoutComplete} />
        </div>
        <div>
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}