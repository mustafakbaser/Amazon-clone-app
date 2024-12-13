"use client";

import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CheckoutSummary() {
  const { items, getTotalPrice, getTotalItems } = useCartStore();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shippingFee = totalPrice > 150 ? 0 : 29.99;

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

      <div className="space-y-4 border-t pt-4">
        <h3 className="font-semibold">Ürünler</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.title} (x{item.quantity})</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}