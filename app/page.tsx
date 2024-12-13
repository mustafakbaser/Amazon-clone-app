import { ProductCard } from "@/components/ui/product-card";
import { HeroBanner } from "@/components/layout/hero-banner";
import { products } from "@/lib/constants/products";

export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <HeroBanner />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 -mt-20 relative z-30">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}