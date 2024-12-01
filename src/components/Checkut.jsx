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
            <h2 className="text-white text-2xl mb-4">Order Summary</h2>
            {cart.map((item, index) => (
              <div key={index} className="bg-gray-800 p-6 mb-4 rounded-lg">
                <h3 className="text-white">{item.title}</h3>
                <p className="text-gray-400">
                  {item.selectedColor} / {item.selectedSize}
                </p>
                <p className="text-gray-200">
                  ${item.price} x {item.quantity} = $
                  {item.price * item.quantity}
                </p>
              </div>
            ))}

            <div className="mt-4 text-white">
              <h3 className="text-2xl">
                Total: ${calculateTotal().toFixed(2)}
              </h3>
            </div>

            {/* Form untuk alamat pengiriman (opsional) */}
            <div className="mt-6">
              <h3 className="text-white text-xl mb-4">Shipping Address</h3>
              <form>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-2 mb-4 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full p-2 mb-4 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full p-2 mb-4 rounded-md"
                />
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
