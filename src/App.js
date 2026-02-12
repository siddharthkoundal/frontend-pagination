import { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

const PAGE_SIZE = 10;

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products/?limit=500");
    const json = await data.json();
    setProducts(json.products);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const startPageSize = currentPage * PAGE_SIZE;
  const endPageSize = startPageSize + PAGE_SIZE;

  console.log(currentPage);

  return (
    <div className="App">
      <h1 className="app-heading">Pagination</h1>
      <div>
        <h2 className="products-heading">Products</h2>
        <div className="pagination-container">
          {[
            ...Array(noOfPages)
              .keys()
              .map((pageNum) => (
                <span
                  className="page-number"
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum + 1}
                </span>
              )),
          ]}
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
