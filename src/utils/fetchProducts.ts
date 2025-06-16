import type { Product } from "../context/Product.Context.tsx";

export async function fetchProducts(query:string) : Promise<Product[]> {
    try{
        const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&json=true`);
        const data =await res.json();
        return data.products as Product[];
    } catch(error){
        console.error(error);
        return [];
    }
}