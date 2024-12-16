'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";

export function CartButton() {
  const [mounted, setMounted] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" className="relative flex items-center">
      {mounted && totalItems > 0 && (
        <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
          {totalItems}
        </span>
      )}
      <ShoppingCart className="h-8 w-8" />
      <p className="hidden md:inline font-extrabold md:text-sm mt-2">Sepet</p>
    </Link>
  );
}