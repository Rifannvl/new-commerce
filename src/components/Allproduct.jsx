import React, { useState, useEffect } from "react";
import Header from "./Header"; // Pastikan mengimpor Header dengan benar
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function Allproduct() {
  const [products, setProducts] = useState([]); // State untuk semua produk
  const [filteredProducts, setFilteredProducts] = useState([]); // State untuk produk yang difilter
  const [query, setQuery] = useState(""); // State untuk query pencarian
  const [categories, setCategories] = useState([]); // State untuk kategori produk
  const [selectedCategory, setSelectedCategory] = useState(""); // State untuk kategori yang dipilih

  // Mengambil data produk dan kategori dari API
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products); // Set produk awal ke filteredProducts

        // Menentukan kategori unik dari produk
        const uniqueCategories = [
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories); // Set kategori yang ditemukan
      })
      .catch((err) => console.log(err));
  }, []); // Menjalankan sekali ketika komponen pertama kali dimuat

  // Fungsi untuk menangani perubahan pada input pencarian
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value); // Menyimpan query pencarian

    // Filter produk berdasarkan query pencarian dan kategori yang dipilih
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(value.toLowerCase()) &&
        (selectedCategory ? product.category === selectedCategory : true)
    );
    setFilteredProducts(filtered); // Set produk yang sudah difilter
  };

  // Fungsi untuk menangani perubahan kategori filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Set kategori yang dipilih

    // Filter produk berdasarkan kategori yang dipilih
    const filtered = products.filter(
      (product) =>
        (product.category === category || category === "") &&
        product.title.toLowerCase().includes(query.toLowerCase()) // Juga mempertimbangkan pencarian
    );
    setFilteredProducts(filtered); // Set produk yang sudah difilter
  };

  return (
    <div className="bg-neutral-900">
      <Header query={query} onSearch={handleSearch} />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-neutral-900 p-4">
          <h3 className="font-semibold text-lg text-white">
            Filter by Category
          </h3>
          <div className="mt-4">
            {/* Kategori Filter */}
            <button
              onClick={() => handleCategoryChange("")}
              className={`block w-full text-left p-2 mb-2 rounded  ${
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

        {/* Main Content */}
        <div className="flex-1 p-4 bg-black">
          {/* Tampilkan Produk yang sudah difilter */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-md text-white group  hover:scale-100 transition duration-300 ease-in-out"
                >
                  <h2>{product.title}</h2>
                  <div className="relative bg-black py-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-64 object-contain mx-auto group-hover:scale-110 transition duration-300 ease-in-out"
                    />
                  </div>
                  <div className="flex  w-full justify-between py-2 ">
                    <Link to={`/product/${product.id}`} className="mr-2">
                      Details
                    </Link>
                    <Link to={`/checkout/${product.id}`}>Buy Now</Link>
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
