'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import { useMounted } from '@/hooks/use-mounted';
import { AccountOrders } from '@/components/account/account-orders';

export default function OrdersPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const mounted = useMounted();

  useEffect(() => {
    if (mounted && !user) {
      router.push('/auth/login?redirect=/account/orders');
    }
  }, [mounted, user, router]);

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