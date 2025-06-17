import React from "react";

import { useProductContext } from "../context/Product.Context";

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useProductContext();

  return (
    <input
      className="p-2 mr-2 rounded-md border"
      aria-label="Search products by name"
      type="text"
      placeholder="Search products by name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;