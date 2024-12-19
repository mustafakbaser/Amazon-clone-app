import { notFound } from "next/navigation";
import { products } from "@/lib/constants/products";
import { getCategories, getProductsByCategory } from "@/lib/catalog";
import { ProductCard } from "@/components/ui/product-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getCategories(products).map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategories(products).find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(products, category.slug);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      <Breadcrumb
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: category.name, href: `/category/${category.slug}` },
        ]}
      />

      <h1 className="text-2xl font-bold mt-6">{category.name}</h1>
      <p className="text-muted-foreground mb-6">{category.count} ürün</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
