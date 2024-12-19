import { Product } from "@/lib/constants/products";

/**
 * Lowercases with Turkish casing rules and folds diacritics, so that
 * "IPHONE", "iPhone" and "ıphone" or "Süt" and "sut" compare equal.
 */
export function normalizeSearchText(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

/**
 * Returns the products whose title or category contains every word of the
 * query. An empty query returns the list unchanged.
 */
export function filterProducts(list: Product[], query: string): Product[] {
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return list;

  return list.filter((product) => {
    const haystack = normalizeSearchText(`${product.title} ${product.category}`);
    return terms.every((term) => haystack.includes(term));
  });
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

/** URL-safe category slug, e.g. "Elektronik" -> "elektronik", "Ev & Mutfak" -> "ev-mutfak". */
export function getCategorySlug(category: string): string {
  return normalizeSearchText(category)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Distinct categories in first-seen order, with their product counts. */
export function getCategories(list: Product[]): Category[] {
  const categories: Category[] = [];
  list.forEach((product) => {
    const slug = getCategorySlug(product.category);
    const existing = categories.find((category) => category.slug === slug);
    if (existing) {
      existing.count += 1;
    } else {
      categories.push({ name: product.category, slug, count: 1 });
    }
  });
  return categories;
}

export function getProductsByCategory(list: Product[], slug: string): Product[] {
  return list.filter((product) => getCategorySlug(product.category) === slug);
}
