'use client';

import Link from "next/link";
import { MapPin, Menu } from "lucide-react";
import { SearchBar } from "./search-bar";
import { UserMenu } from "./user-menu";
import { CartButton } from "./cart-button";
import { OrdersButton } from "./orders-button";

export default function Header() {
  return (
    <header className="bg-[#131921] text-white">
      {/* Top Header */}
      <div className="flex items-center p-2 flex-grow">
        <Link href="/" className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <span className="text-2xl font-bold text-white">amazon.com.tr</span>
        </Link>

        {/* Delivery Address */}
        <div className="hidden sm:flex items-center mx-6 text-white whitespace-nowrap">
          <MapPin className="h-4 w-4" />
          <div className="ml-1">
            <p className="text-xs text-gray-300">Teslimat adresi</p>
            <p className="text-sm font-bold">Türkiye</p>
          </div>
        </div>

        {/* Search */}
        <SearchBar />

        {/* Right */}
        <div className="flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <UserMenu />
          <OrdersButton />
          <CartButton />
        </div>
      </div>

      {/* Bottom Header */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-[#232F3E] text-white text-sm">
        <p className="flex items-center">
          <Menu className="h-6 w-6 mr-1" />
          Tüm Kategoriler
        </p>
        <p className="link">Çok Satanlar</p>
        <p className="link">Prime</p>
        <p className="link">Yeni Çıkanlar</p>
        <p className="link">Fırsat Ürünleri</p>
      </div>
    </header>
  );
}