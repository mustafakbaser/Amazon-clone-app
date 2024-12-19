"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/constants/products";
import { filterProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const results = filterProducts(products, query);

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-2">
          “{query}” için sonuç bulunamadı
        </h1>
        <p className="text-muted-foreground mb-8">
          Yazımı kontrol edin veya daha genel bir arama terimi deneyin.
        </p>
        <Button asChild>
          <Link href="/">Ana Sayfaya Dön</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl mb-6">
        {query ? (
          <>
            “<span className="font-bold">{query}</span>” için {results.length} sonuç
          </>
        ) : (
          "Tüm ürünler"
        )}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
