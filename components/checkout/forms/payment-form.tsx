"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Geçerli bir kart numarası giriniz"),
  cardHolder: z.string().min(2, "Kart üzerindeki ismi giriniz"),
  expiryDate: z.string().min(5, "Geçerli bir son kullanma tarihi giriniz"),
  cvv: z.string().min(3, "Geçerli bir CVV giriniz"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onComplete: () => void;
}

export function PaymentForm({ onComplete }: PaymentFormProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    },
  });

  function onSubmit(data: PaymentFormValues) {
    // Ödeme bilgilerini kaydet
    onComplete();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kart Numarası</FormLabel>
              <FormControl>
                <Input 
                  placeholder="XXXX XXXX XXXX XXXX" 
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
                    field.onChange(formatted);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kart Üzerindeki İsim</FormLabel>
              <FormControl>
                <Input placeholder="Ad Soyad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Son Kullanma Tarihi</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="AA/YY" 
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                      const formatted = value.length > 2 
                        ? `${value.slice(0, 2)}/${value.slice(2)}` 
                        : value;
                      field.onChange(formatted);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="XXX" 
                    {...field}
                    maxLength={3}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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