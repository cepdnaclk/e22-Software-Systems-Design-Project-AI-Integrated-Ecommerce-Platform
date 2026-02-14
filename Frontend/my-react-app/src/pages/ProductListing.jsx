import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ READ CATEGORY FROM URL
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category"); // e.g. electronics

  useEffect(() => {
    loadProducts();
  }, [search, sort, page, category]); // ✅ category added

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchProducts({
        search,
        sort,
        page,
        limit: 8,
        category // ✅ send category to backend
      });

      setProducts(data?.products || []);
    } catch (err) {
      console.error("Load products error:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Browse Products
        {category && (
          <span className="text-gray-500 text-lg ml-2">
            ({category})
          </span>
        )}
      </h2>

      {/* Search & Sort */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-1/2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="latest">Latest</option>
          <option value="price_asc">Price Low → High</option>
          <option value="price_desc">Price High → Low</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      {/* Loading */}
      {loading && <p>Loading products...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Product Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          className="px-4 py-2 border rounded"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="py-2">Page {page}</span>

        <button
          className="px-4 py-2 border rounded"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
