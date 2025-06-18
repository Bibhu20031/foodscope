import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../context/Product.Context";

const ProductDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Failed to fetch product detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (code) fetchProduct();
  }, [code]);

  if (loading) return <div className="p-6 text-center text-gray-600 text-lg">Loading product details...</div>;
  if (!product) return <div className="p-6 text-center text-red-500 text-lg">Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline text-sm">← Back to Home</Link>

      <div className="mt-6 bg-white rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center items-center">
          <img
            src={product.image_front_small_url || "/placeholder.png"}
            alt={product.product_name}
            className="rounded-xl w-full max-w-xs object-contain border border-gray-200"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.product_name || "Unnamed Product"}</h1>
            <p className="text-sm text-gray-600 mb-4">{product.categories_tags?.join(", ") || "No categories"}</p>

            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Ingredients:</span> {product.ingredients_text || "Not available"}</p>
              <p><span className="font-medium">Labels:</span> {product.labels_tag?.join(", ") || "None"}</p>
              <p><span className="font-medium">Nutriscore:</span> {product.nutriscore_grade?.toUpperCase() || "N/A"}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Nutritional Info (per 100g)</h2>
            <ul className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
              <li>⚡ Energy: {product.nutriments?.energy_kcal || "N/A"} kcal</li>
              <li>🥩 Protein: {product.nutriments?.proteins_g || "N/A"} g</li>
              <li>🍞 Carbs: {product.nutriments?.carbohydrate_g || "N/A"} g</li>
              <li>🥑 Fat: {product.nutriments?.fat_g || "N/A"} g</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
