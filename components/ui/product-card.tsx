"use client";

import { Product } from "@/lib/constants/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
              {product.price.toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY'
              })}
            </span>
            <Button onClick={(e) => {
              e.preventDefault();
              // Sepete ekleme işlemi burada yapılacak
            }}>
              Sepete Ekle
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}