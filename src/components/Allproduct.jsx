import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useCart } from "./context/CardContext"; // pastikan path context-nya benar
import { useLocation } from "react-router-dom";

export default function Allproduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Mengakses fungsi addToCart dari CartContext
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search"); // Mendapatkan query pencarian dari URL

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
        setLoading(false); // Set loading ke false setelah data diambil
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Efek untuk memperbarui query dan hasil filter berdasarkan query di URL
  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
      filterProducts(searchQuery, selectedCategory);
    } else {
      setQuery("");
      filterProducts("", selectedCategory); // Reset filter jika tidak ada query
    }
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    filterProducts(value, selectedCategory); // Update filter produk dengan query terbaru
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(query, category); // Filter produk berdasarkan kategori yang dipilih
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

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="border p-4 rounded-md text-white group animate-pulse">
      <div className="bg-gray-700 h-48 w-full mb-4"></div>
      <div className="h-4 bg-gray-700 w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 w-1/2"></div>
    </div>
  );

  return (
    <div className="bg-neutral-900">
      <Header query={query} onSearch={handleSearch} />
      <div className="flex flex-col md:flex-row">
        {/* Filter Kategori untuk Mobile */}
        <div className="bg-neutral-800 p-4 md:w-1/4">
          <h3 className="font-semibold text-lg text-white">
            Filter by Category
          </h3>
          <div className="mt-4 space-y-2">
            <button
              onClick={() => handleCategoryChange("")}
              className={`block w-full text-left p-2 rounded ${
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
                className={`block w-full text-left p-2 rounded ${
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

        {/* Produk */}
        <div className="flex-1 p-4 bg-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {loading ? (
              // Jika sedang loading, tampilkan skeleton loader
              Array(6)
                .fill()
                .map((_, index) => <SkeletonLoader key={index} />)
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-md text-white group hover:scale-100 transition duration-300 ease-in-out"
                >
                  <h2 className="text-sm sm:text-lg">{product.title}</h2>
                  <div className="relative bg-black py-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-48 object-contain mx-auto group-hover:scale-110 transition duration-300 ease-in-out"
                    />
                  </div>
                  <div className="flex w-full justify-between py-2 mt-3 text-sm">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-blue-500 block w-full mb-2 sm:mb-0"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="text-blue-500 block w-full"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">
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
