import React from "react";
import { useCart } from "../components/context/CardContext"; // Pastikan nama konteks benar
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import Header from "./Header";
import Footer from "./Footer";

export default function Cart() {
  const { cart, removeFromCart, calculateTotal } = useCart(); // Destructure state dari CartContext
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman lain

  // Fungsi untuk mengarahkan pengguna ke halaman checkout
  const handleBuyNow = () => {
    navigate("/checkout"); // Arahkan ke halaman checkout
  };

  return (
    <div className="bg-neutral-900 min-h-screen">
      <Header />
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>

        {/* Display Cart Items */}
        {cart.length === 0 ? (
          <p className="text-white">Your cart is empty</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 mb-6 rounded-lg flex flex-col sm:flex-row items-center"
              >
                {/* Left: Product Image */}
                <div className="w-1/3">
                  <img
                    src={item.thumbnail} // Gambar utama diambil dari thumbnail produk
                    alt={item.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>

                {/* Right: Product Details */}
                <div className="flex-1 ml-6">
                  <h2 className="text-white text-2xl">{item.title}</h2>
                  <p className="text-gray-400">
                    {item.selectedColor} / {item.selectedSize}
                  </p>
                  <p className="text-gray-200">
                    ${item.price} x {item.quantity} = $
                    {item.price * item.quantity}
                  </p>

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      removeFromCart(
                        item.id,
                        item.selectedColor,
                        item.selectedSize
                      )
                    }
                    className="mt-4 bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Display Total Price */}
            <div className="mt-6 text-white">
              <h3 className="text-2xl">
                Total: ${calculateTotal().toFixed(2)}
              </h3>
            </div>

            {/* Buy Now Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleBuyNow}
                className="w-full sm:w-auto py-3 px-6 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
