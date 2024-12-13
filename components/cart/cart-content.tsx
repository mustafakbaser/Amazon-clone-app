"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export function CartContent() {
  const { items, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">Sepetiniz boş</h2>
        <p className="text-gray-600 mb-8">Alışverişe başlamak için ürünleri keşfedin.</p>
        <Link href="/">
          <Button>Alışverişe Başla</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start space-x-4 border rounded-lg p-4"
        >
          <Link href={`/product/${item.id}`} className="shrink-0">
            <div className="relative w-32 h-32">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <div className="flex-grow space-y-2">
            <Link href={`/product/${item.id}`}>
              <h3 className="font-semibold hover:text-yellow-600">{item.title}</h3>
            </Link>
            <p className="text-green-700 text-sm">Stokta var</p>
            <div className="flex items-center space-x-4">
              <select
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                className="border rounded p-1"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-gray-500 hover:text-red-600 flex items-center space-x-1"
              >
                <Trash2 className="w-4 h-4" />
                <span>Kaldır</span>
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}