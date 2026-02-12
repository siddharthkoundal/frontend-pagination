import { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

const PAGE_SIZE = 10;

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError(null);
      const data = await fetch("https://dummyjson.com/products/?limit=500");
      if (!data.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await data.json();
      setProducts(json.products);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error("Error fetching products:", err);
    }
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handlePreviousPageChange = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPageChange = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const startPageSize = currentPage * PAGE_SIZE;
  const endPageSize = startPageSize + PAGE_SIZE;

  if (error) {
    return (
      <div className="error" style={{ color: "red", margin: "2em" }}>
        {error}
      </div>
    );
  }
  if (!products.length) {
    return <div className="loading-products">Loading products...</div>;
  }
  return (
    <div className="App">
      <h1 className="app-heading">Pagination</h1>
      <div>
        <h2 className="products-heading">Products</h2>
        <div className="pagination-container">
          <button
            className="pagination-arrow"
            onClick={handlePreviousPageChange}
            disabled={currentPage === 0}
          >
            ⬅️
          </button>
          {[
            ...Array(noOfPages)
              .keys()
              .map((pageNum) => (
                <button
                  className="page-number"
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum + 1}
                </button>
              )),
          ]}
          <button
            className="pagination-arrow"
            onClick={handleNextPageChange}
            disabled={currentPage === noOfPages - 1}
          >
            ➡️
          </button>
        </div>
        <div className="products-container">
          {products.slice(startPageSize, endPageSize).map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              image={product.thumbnail}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
