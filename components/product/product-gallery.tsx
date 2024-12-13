"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/constants/products";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  
  // Normalde buraya ürünün tüm fotoğrafları gelecek
  const images = [product.image];

  return (
    <div className="sticky top-20">
      <div className="aspect-square relative mb-4">
        <Image
          src={selectedImage}
          alt={product.title}
          fill
          className="object-contain"
          priority
        />
      </div>
      
      <div className="grid grid-cols-6 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square relative cursor-pointer border-2 rounded",
              selectedImage === image ? "border-yellow-400" : "border-transparent"
            )}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`${product.title} - ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}