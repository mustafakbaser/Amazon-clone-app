"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function CartSummary() {
  const router = useRouter();
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);
  const { items, getTotalPrice, getTotalItems } = useCartStore();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shippingFee = totalPrice > 150 ? 0 : 29.99;

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Giriş Yapın",
        description: "Alışverişi tamamlamak için giriş yapmanız gerekiyor.",
        variant: "destructive",
      });
      router.push("/auth/login?redirect=/checkout");
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Sepetiniz Boş",
        description: "Alışverişe devam etmek için sepetinize ürün ekleyin.",
        variant: "destructive",
      });
      return;
    }

    router.push("/checkout");
  };

  if (items.length === 0) return null;

  return (
    <div className="border rounded-lg p-6 space-y-4 sticky top-20">
      <div className="space-y-2">
        <h2 className="font-semibold text-lg">Sipariş Özeti</h2>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Ürünler ({totalItems} adet)</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Kargo</span>
            <span>{shippingFee === 0 ? "Ücretsiz" : formatPrice(shippingFee)}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-bold">
          <span>Toplam</span>
          <span>{formatPrice(totalPrice + shippingFee)}</span>
        </div>
        {shippingFee > 0 && (
          <p className="text-xs text-gray-600 mt-2">
            150 TL üzeri alışverişlerinizde kargo ücretsiz!
          </p>
        )}
      </div>

      <Button 
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
        onClick={handleCheckout}
      >
        Alışverişi Tamamla
      </Button>
    </div>
  );
}