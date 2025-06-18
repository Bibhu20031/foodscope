import type {Product} from '../context/Product.Context'

export function sortProducts(products: Product[], sortOption: string): Product[] {
  if (!Array.isArray(products)) return [];

  const safeString = (value: string | undefined | null): string =>
    typeof value === "string" ? value : "";

  if (sortOption === "name-asc") {
    return [...products].sort((a, b) =>
      safeString(a.product_name).localeCompare(safeString(b.product_name))
    );
  } else if (sortOption === "name-desc") {
    return [...products].sort((a, b) =>
      safeString(b.product_name).localeCompare(safeString(a.product_name))
    );
  } else if (sortOption === "grade-asc") {
    return [...products].sort((a, b) =>
      safeString(a.nutriscore_grade).localeCompare(safeString(b.nutriscore_grade))
    );
  } else if (sortOption === "grade-desc") {
    return [...products].sort((a, b) =>
      safeString(b.nutriscore_grade).localeCompare(safeString(a.nutriscore_grade))
    );
  }

  return products;
}
