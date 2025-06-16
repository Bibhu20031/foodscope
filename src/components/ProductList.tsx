// src/components/ProductList.tsx
import React from "react";

import ProductCard from "./ProductCard";

import type { Product } from "../context/Product.Context";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({
  products,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {/* Added responsive grid columns, increased gap, and added padding */}
      {products.map((item) => (
        <ProductCard key={item.code} product={item} />
      ))}
    </div>
  );
};

export default ProductList;