import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../context/Product.Context";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const placeholderImage = `https://placehold.co/400x300/e2e8f0/64748b?text=No+Image`;

  return (
    <Link
      to={`/product/${product.code}`}
      className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-lg">
        <img
          src={product.image_front_small_url || placeholderImage}
          alt={product.product_name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = placeholderImage;
            e.currentTarget.alt = "Image not available";
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold leading-none tracking-tight mb-2 line-clamp-2">
          {product.product_name}
        </h2>
        <p className="text-sm text-muted-foreground mb-3 flex-grow line-clamp-3">
          Ingredients: {product.ingredients_text?.substring(0, 150) || "No ingredients listed"}...
        </p>
        {product.nutriscore_grade && (
          <p className="text-md font-medium text-right mt-auto">
            Nutriscore Grade:{" "}
            <span
              className={`inline-block px-2 py-1 rounded-md text-white font-bold
                ${
                  product.nutriscore_grade.toLowerCase() === "a" ? "bg-green-600" :
                  product.nutriscore_grade.toLowerCase() === "b" ? "bg-lime-600" :
                  product.nutriscore_grade.toLowerCase() === "c" ? "bg-yellow-500" :
                  product.nutriscore_grade.toLowerCase() === "d" ? "bg-orange-500" :
                  product.nutriscore_grade.toLowerCase() === "e" ? "bg-red-600" :
                  "bg-gray-500"
                }
              `}
            >
              {product.nutriscore_grade.toUpperCase()}
            </span>
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
