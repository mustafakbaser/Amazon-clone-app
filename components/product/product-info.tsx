"use client";

import { useState } from "react";
import { Product } from "@/lib/constants/products";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/lib/store/cart-store";
import { Star, Truck, Shield } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Ürün sepete eklendi",
      description: `${product.title} sepetinize eklendi.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-blue-600 link">2.458 değerlendirme</span>
        </div>
      </div>

      <div className="border-t border-b py-4">
        <div className="text-3xl font-bold mb-2">
          {formatPrice(product.price)}
        </div>
        <div className="text-sm text-gray-500">
          Tüm fiyatlara KDV dahildir
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm">
          <Truck className="w-5 h-5 text-gray-600" />
          <span>
            <span className="font-bold text-green-700">Yarın teslim</span> sipariş için son{" "}
            <span className="font-bold">2 saat 15 dakika</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Shield className="w-5 h-5 text-gray-600" />
          <span>2 yıl Amazon garantisi</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded p-2"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <Button 
            size="lg" 
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
            onClick={handleAddToCart}
          >
            Sepete Ekle
          </Button>
        </div>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="w-full"
        >
          Hemen Al
        </Button>
      </div>
    </div>
  );
}