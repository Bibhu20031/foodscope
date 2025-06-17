import React from "react";

import { useProductContext } from "../context/Product.Context";

const FilterDropdown: React.FC = () => {
  const { filterCategory, setFilterCategory } = useProductContext();

  return (
    <select
      aria-label="Filter by category"
      className="p-2 mr-2 rounded-md border text-amber-300 bg-blue-500"
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      <option value="beverages">Beverages</option>
      <option value="dairy-products">Dairy</option>
      <option value="snacks">Snacks</option>
    </select>
  );
};

export default FilterDropdown;