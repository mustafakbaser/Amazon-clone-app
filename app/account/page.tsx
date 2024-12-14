'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountInfo } from '@/components/account/account-info';
import { AccountAddresses } from '@/components/account/account-addresses';
import { AccountOrders } from '@/components/account/account-orders';

export default function AccountPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Hesabım</h1>
        <Button variant="outline" onClick={() => {
          logout();
          router.push('/');
        }}>
          Çıkış Yap
        </Button>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Hesap Bilgileri</TabsTrigger>
          <TabsTrigger value="addresses">Adreslerim</TabsTrigger>
          <TabsTrigger value="orders">Siparişlerim</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <AccountInfo user={user} />
        </TabsContent>

        <TabsContent value="addresses">
          <AccountAddresses />
        </TabsContent>

        <TabsContent value="orders">
          <AccountOrders />
        </TabsContent>
      </Tabs>
    </div>
  );
}