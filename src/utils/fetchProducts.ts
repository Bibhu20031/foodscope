import type { Product } from "../context/Product.Context";

export async function fetchProducts(
  query: string,
  category: string | '' 
): Promise<Product[]> {
  try {
    let url = '';
    if (category) {
      url = `https://world.openfoodfacts.org/category/${category}.json`;
    } else if (query) {
      url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&json=true`;
    } else {
      // fallback if neither
      url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=food&json=true`;
    }

    const res = await fetch(url);
    const data = await res.json();

    return data.products as Product[];
  } catch (error) {
    console.error(error);
    return []; 
  }
}
