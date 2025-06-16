import { useEffect } from 'react'
import { useProductContext } from '../context/Product.Context'
import { fetchProducts } from '../utils/fetchProducts';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import SortDropdown from '../components/SortDropdown';
import ProductList from '../components/ProductList';
const Home = () => {
  const { products, setProducts } = useProductContext();

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetchProducts('');
        setProducts(res);
      } catch (error) {
        console.error(error);
      }
    }
    loadProducts();
  }, [setProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 tracking-tight lg:text-5xl">
        FoodScope - Food Product Explorer
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Flex container for search, filter, and sort, with responsive stacking */}
        <div className="w-full sm:w-auto flex-grow">
          {/* SearchBar takes full width on small screens, then grows */}
          <SearchBar />
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          {/* Dropdowns side-by-side, full width on small screens */}
          <FilterDropdown />
          <SortDropdown />
        </div>
      </div>

      <ProductList products={products} />
    </div>
  );
};

export default Home;