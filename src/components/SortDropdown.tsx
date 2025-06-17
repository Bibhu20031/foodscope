import React from "react";

import { useProductContext } from "../context/Product.Context";

const SortDropdown: React.FC = () => {
  const { sortOption, setSortOption } = useProductContext();

  return (
    <select
      aria-label="Sort by"
      className="p-2 mr-2 rounded-md border"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="">Sort by</option>
      <option value="name-asc">Name (A–Z)</option>
      <option value="name-desc">Name (Z–A)</option>
      <option value="grade-asc">Nutrition Grade (ascending)</option>
      <option value="grade-desc">Nutrition Grade (descending)</option>
    </select>
  );
};

export default SortDropdown;