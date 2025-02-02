import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useCart } from "./context/CardContext"; // Import useCart
import SliderProducts from "./SliderProducts";

// Skeleton loader for the product details page
const SkeletonLoader = () => (
  <div className="animate-pulse bg-neutral-900 min-h-screen">
    <div className="flex justify-between items-center h-16 px-6">
      {/* Logo Skeleton */}
      <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
      {/* Navigation items skeleton */}
      <div className="flex space-x-4">
        <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
      </div>
    </div>
    {/* Image Skeleton */}
    <div className="w-full h-64 bg-neutral-600 rounded-lg mb-6"></div>
    {/* Title Skeleton */}
    <div className="w-2/3 h-8 bg-neutral-600 rounded-lg mb-4"></div>
    {/* Description Skeleton */}
    <div className="w-full h-6 bg-neutral-600 rounded-lg mb-4"></div>
    {/* Price Skeleton */}
    <div className="w-32 h-10 bg-neutral-600 rounded-lg mb-4"></div>
    {/* Quantity Skeleton */}
    <div className="w-40 h-10 bg-neutral-600 rounded-lg mb-4"></div>
    {/* Button Skeleton */}
    <div className="w-full h-12 bg-blue-300 rounded-lg"></div>
  </div>
);

export default function DetailProducts() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null); // Product state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedColor, setSelectedColor] = useState(""); // Color selection
  const [selectedSize, setSelectedSize] = useState(""); // Size selection
  const [quantity, setQuantity] = useState(1); // Quantity selection
  const { addToCart } = useCart(); // Destructure addToCart from CartContext

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching product data");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <SkeletonLoader />;
  if (error) return <p>{error}</p>;

  const handleAddToCart = () => {
    addToCart(product, quantity); // Add to cart using context
    alert(`Added ${quantity} of ${product.title} to the cart.`);
  };

  return (
    <div className="bg-neutral-900 min-h-screen">
      <Header />
      <div className="container mx-auto py-4 px-6">
        <div className="container mx-auto py-12 px-6 bg-black rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Product Image Gallery */}
            <div className="space-y-6">
              <div className="flex justify-center items-center">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-auto max-w-lg object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Right: Product Information */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">
                {product.title}
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                {product.description}
              </p>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl text-white rounded-full bg-blue-800 px-4 py-2">
                  $ {product.price} USD
                </span>
              </div>

              {/* Quantity Selection */}
              <div className="flex items-center space-x-4 mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-white text-sm font-medium"
                >
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-blue-600 text-gray-100 rounded-md hover:bg-blue-800 focus:outline-none"
                  >
                    -
                  </button>
                  <span className="text-xl font-medium text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-blue-600 text-gray-100 rounded-md hover:bg-blue-800 focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <SliderProducts />
      <Footer />
    </div>
  );
}
