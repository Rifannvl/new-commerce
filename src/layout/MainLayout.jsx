import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="flex-grow min-h-screen">{children}</div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
