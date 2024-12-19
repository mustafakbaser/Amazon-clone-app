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
