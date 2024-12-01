import React from "react";
import { useCart } from "../components/context/CardContext"; // Gunakan CartContext untuk mendapatkan data cart

export default function Checkout() {
  const { cart, calculateTotal } = useCart(); // Ambil data cart dan total

  return (
    <div className="bg-neutral-900 min-h-screen">
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        {/* Tampilkan detail pesanan */}
        {cart.length === 0 ? (
          <p className="text-white">
            Your cart is empty. Please add some items.
          </p>
        ) : (
          <div>
            {/* Order Summary */}
            <h2 className="text-white text-2xl mb-4">Order Summary</h2>
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 border-b border-gray-700"
                >
                  <div className="flex items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="text-white text-lg">{item.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {item.selectedColor} / {item.selectedSize}
                      </p>
                      <p className="text-gray-200 text-sm">
                        ${item.price} x {item.quantity} = $
                        {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Total Price */}
              <div className="flex items-center justify-between py-4 mt-6 border-t border-gray-700">
                <h3 className="text-white text-2xl">Total</h3>
                <span className="text-white text-2xl">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Shipping Address Form */}
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h3 className="text-white text-xl mb-4">Shipping Address</h3>
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Complete Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
