import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useCart } from ".//context/CardContext"; // Menggunakan CartContext

export default function Allproduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { addToCart } = useCart(); // Mengakses fungsi addToCart dari CartContext

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        const uniqueCategories = [
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    filterProducts(value, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(query, category);
  };

  const filterProducts = (query, category) => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) &&
        (category ? product.category === category : true)
    );
    setFilteredProducts(filtered);
  };

  // Fungsi untuk menangani logika Add to Cart
  const handleAddToCart = (
    productId,
    quantity = 1,
    selectedColor = "",
    selectedSize = ""
  ) => {
    const product = products.find((product) => product.id === productId);

    if (product) {
      addToCart(product, quantity, selectedColor, selectedSize); // Menambahkan produk ke cart melalui context
      alert(`${product.title} has been added to your cart!`);
    }
  };

  return (
    <div className="bg-neutral-900">
      <Header query={query} onSearch={handleSearch} />
      <div className="flex">
        <div className="w-1/4 bg-neutral-800 p-4">
          <h3 className="font-semibold text-lg text-white">
            Filter by Category
          </h3>
          <div className="mt-4">
            <button
              onClick={() => handleCategoryChange("")}
              className={`block w-full text-left p-2 mb-2 rounded ${
                !selectedCategory
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-black"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`block w-full text-left p-2 mb-2 rounded ${
                  selectedCategory === category
                    ? "bg-neutral-900 text-white"
                    : "bg-white text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 bg-black">
          <div className="grid grid-cols-3 gap-4 mt-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-md text-white group hover:scale-100 transition duration-300 ease-in-out"
                >
                  <h2>{product.title}</h2>
                  <div className="relative bg-black py-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-64 object-contain mx-auto group-hover:scale-110 transition duration-300 ease-in-out"
                    />
                  </div>
                  <div className="flex w-full justify-between py-2">
                    <Link to={`/product/${product.id}`} className="mr-2">
                      Details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product.id)} // Menambahkan produk ke cart
                      className="text-blue-500"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-4 text-center text-gray-500">
                No products found
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
