import { notFound } from "next/navigation";
import { products } from "@/lib/constants/products";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: product.category, href: `/category/${product.category}` },
          { label: product.title, href: `/product/${product.id}` },
        ]} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}