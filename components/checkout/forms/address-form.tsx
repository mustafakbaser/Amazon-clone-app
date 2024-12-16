'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Address } from '@/lib/types/auth';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Ad Soyad en az 2 karakter olmalıdır'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  address: z.string().min(10, 'Adres en az 10 karakter olmalıdır'),
  city: z.string().min(2, 'Şehir seçiniz'),
  district: z.string().min(2, 'İlçe seçiniz'),
  zipCode: z.string().min(5, 'Geçerli bir posta kodu giriniz'),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onComplete: (address: AddressFormValues) => void;
  defaultAddress?: Address;
}

export function AddressForm({ onComplete, defaultAddress }: AddressFormProps) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultAddress ? {
      fullName: defaultAddress.fullName,
      phone: defaultAddress.phone,
      address: defaultAddress.address,
      city: defaultAddress.city,
      district: defaultAddress.district,
      zipCode: defaultAddress.zipCode,
    } : {
      fullName: '',
      phone: '',
      address: '',
      city: '',
      district: '',
      zipCode: '',
    },
  });

  function onSubmit(data: AddressFormValues) {
    onComplete(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ad Soyad</FormLabel>
              <FormControl>
                <Input placeholder="Ad Soyad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <FormControl>
                <Input placeholder="5XX XXX XX XX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres</FormLabel>
              <FormControl>
                <Input placeholder="Adres" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şehir</FormLabel>
                <FormControl>
                  <Input placeholder="Şehir" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İlçe</FormLabel>
                <FormControl>
                  <Input placeholder="İlçe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Posta Kodu</FormLabel>
              <FormControl>
                <Input placeholder="34XXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
        >
          Devam Et
        </Button>
      </form>
    </Form>
  );
}