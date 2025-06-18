import type { Product } from "../context/Product.Context";

export async function fetchProducts(
  query: string,
  category?: string
): Promise<Product[]> {
  try {
    const searchParams = new URLSearchParams({
      json: "true",
      search_terms: query,
      page_size: "50",
    });

    if (category) {
      searchParams.append("categories_tags", category);
    }

    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?${searchParams.toString()}`
    );

    const data = await res.json();
    return data.products as Product[];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
