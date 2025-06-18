import React, { useEffect, useMemo } from "react";

import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import SortDropdown from "../components/SortDropdown";

import { useProductContext } from "../context/Product.Context";
import { fetchProducts } from "../utils/fetchProducts";
import { sortProducts } from "../utils/sortProducts";

const HomePage: React.FC = () => {
  const {
    products,
    setProducts,
    searchTerm,
    filterCategory,
    sortOption,
  } = useProductContext();

  const sortedProducts = useMemo(() => {
    return sortProducts(products, sortOption);
  }, [products, sortOption]);

useEffect(() => {
  (async () => {
    try {
      const res = await fetchProducts(searchTerm, filterCategory);
      setProducts(res);
    } catch (error) {
      console.error(error);
    }
  })();
}, [searchTerm, filterCategory]);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Food Product Explorer</h1>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <SearchBar />
        <FilterDropdown />
        <SortDropdown />
      </div>
      <ProductList products={sortedProducts} />
    </div>
  );
};

export default HomePage;
