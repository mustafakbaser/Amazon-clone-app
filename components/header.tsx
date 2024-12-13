"use client";

import { MapPin, Search, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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
        <div className="hidden sm:flex items-center h-10 flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded">
          <Input 
            type="text" 
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l focus-visible:ring-0 focus-visible:ring-offset-0" 
            placeholder="Amazon.com.tr'de Ara"
          />
          <Button variant="ghost" size="icon" className="h-full px-5 bg-yellow-400 hover:bg-yellow-500">
            <Search className="h-5 w-5 text-gray-800" />
          </Button>
        </div>

        {/* Right */}
        <div className="flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link">
            <p>Merhaba, Giriş yapın</p>
            <p className="font-extrabold md:text-sm">Hesap ve Listeler</p>
          </div>

          <div className="link">
            <p>İadeler</p>
            <p className="font-extrabold md:text-sm">ve Siparişler</p>
          </div>

          <Link href="/cart" className="relative flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              0
            </span>
            <ShoppingCart className="h-8 w-8" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">Sepet</p>
          </Link>
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