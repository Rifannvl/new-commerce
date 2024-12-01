import React, { createContext, useContext, useState } from "react";

// Membuat Context
const CartContext = createContext();

// CartProvider untuk membungkus komponen aplikasi dan menyediakan context cart
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fungsi untuk menambahkan produk ke cart
  const addToCart = (product, quantity, selectedColor, selectedSize) => {
    const newItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity,
      selectedColor,
      selectedSize,
    };

    // Cek apakah item sudah ada di cart
    const existingItem = cart.find(
      (item) =>
        item.id === newItem.id &&
        item.selectedColor === newItem.selectedColor &&
        item.selectedSize === newItem.selectedSize
    );

    if (existingItem) {
      // Jika ada, update quantity produk yang sudah ada
      setCart(
        cart.map((item) =>
          item.id === newItem.id &&
          item.selectedColor === newItem.selectedColor &&
          item.selectedSize === newItem.selectedSize
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      );
    } else {
      // Jika tidak ada, tambahkan item baru ke cart
      setCart([...cart, newItem]);
    }
  };

  // Fungsi untuk menghapus item dari cart
  const removeFromCart = (id, selectedColor, selectedSize) => {
    setCart(
      cart.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  // Fungsi untuk menghitung total harga
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook untuk menggunakan CartContext
export const useCart = () => useContext(CartContext);
