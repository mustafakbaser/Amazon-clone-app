'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import { AccountOrders } from '@/components/account/account-orders';

export default function OrdersPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login?redirect=/account/orders');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Siparişlerim</h1>
      <AccountOrders />
    </div>
  );
}