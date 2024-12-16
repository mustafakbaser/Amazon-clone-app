'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddressForm } from './forms/address-form';
import { PaymentForm } from './forms/payment-form';
import { useAuthStore } from '@/lib/store/auth-store';
import { useToast } from '@/hooks/use-toast';
import { OrderAddress } from '@/lib/types/order';

interface CheckoutFormProps {
  onComplete: (shippingAddress: OrderAddress, paymentMethod: string) => void;
}

export function CheckoutForm({ onComplete }: CheckoutFormProps) {
  const [activeTab, setActiveTab] = useState('address');
  const [shippingAddress, setShippingAddress] = useState<OrderAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);

  const handleAddressComplete = (address: OrderAddress) => {
    setShippingAddress(address);
    setActiveTab('payment');
  };

  const handlePaymentComplete = (method: string) => {
    setPaymentMethod(method);
    setActiveTab('review');
  };

  const handleOrderSubmit = () => {
    if (!shippingAddress || !paymentMethod) {
      toast({
        title: 'Hata',
        description: 'Lütfen tüm bilgileri doldurun',
        variant: 'destructive',
      });
      return;
    }

    onComplete(shippingAddress, paymentMethod);
  };

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="address">Teslimat Adresi</TabsTrigger>
          <TabsTrigger value="payment" disabled={!shippingAddress}>
            Ödeme
          </TabsTrigger>
          <TabsTrigger
            value="review"
            disabled={!shippingAddress || !paymentMethod}
          >
            İnceleme
          </TabsTrigger>
        </TabsList>

        <TabsContent value="address">
          <AddressForm
            onComplete={handleAddressComplete}
            defaultAddress={user?.addresses.find((a) => a.isDefault)}
          />
        </TabsContent>

        <TabsContent value="payment">
          <PaymentForm onComplete={handlePaymentComplete} />
        </TabsContent>

        <TabsContent value="review">
          <div className="space-y-6">
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Teslimat Adresi</h3>
              {shippingAddress && (
                <div className="text-sm text-muted-foreground">
                  <p>{shippingAddress.fullName}</p>
                  <p>{shippingAddress.address}</p>
                  <p>
                    {shippingAddress.district} / {shippingAddress.city}
                  </p>
                  <p>{shippingAddress.phone}</p>
                </div>
              )}
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Ödeme Yöntemi</h3>
              <p className="text-sm text-muted-foreground">
                {paymentMethod === 'credit-card'
                  ? 'Kredi Kartı'
                  : 'Kapıda Ödeme'}
              </p>
            </div>

            <Button
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={handleOrderSubmit}
            >
              Siparişi Onayla
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}