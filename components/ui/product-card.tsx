"use client";

import { Product } from "@/lib/constants/products";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "Ürün sepete eklendi",
      description: `${product.title} sepetinize eklendi.`,
    });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="aspect-square relative mb-4">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">
              {formatPrice(product.price)}
            </span>
            <Button onClick={handleAddToCart}>
              Sepete Ekle
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}