import React, { useState, useEffect, useRef } from "react";

export default function SliderProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const lastScrollTime = useRef(0); // Menyimpan waktu scroll terakhir
  const scrollInterval = useRef(0); // Interval waktu scroll
  const maxScrollDistance = useRef(0); // Jarak maksimum yang akan digulirkan dalam satu langkah

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const smoothScroll = () => {
    if (sliderRef.current) {
      const scrollWidth = sliderRef.current.scrollWidth;
      const clientWidth = sliderRef.current.clientWidth;
      const scrollLeft = sliderRef.current.scrollLeft;

      // Cek jika sudah sampai di ujung kanan
      if (scrollLeft + clientWidth >= scrollWidth) {
        sliderRef.current.scrollLeft = 0; // Kembali ke kiri
      } else {
        // Gerakkan secara pelan dan halus
        sliderRef.current.scrollLeft += 1; // Pindahkan sedikit demi sedikit
      }
    }

    requestAnimationFrame(smoothScroll); // Memanggil animation frame terus-menerus
  };

  useEffect(() => {
    maxScrollDistance.current = 1; // Mengatur jarak scroll setiap frame
    requestAnimationFrame(smoothScroll); // Mulai animasi scroll yang halus

    return () => {
      cancelAnimationFrame(scrollInterval.current); // Hapus animasi saat komponen unmount
    };
  }, []);

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-semibold text-center mb-8 text-white">
        Featured Products
      </h2>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
        </div>
      ) : (
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200"
        >
          <div className="flex space-x-6">
            {products.map((product) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                className="relative h-64 w-96"
              >
                <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
                  <img
                    alt={product.title}
                    className="relative h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                    src={product.images[0]}
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4">
                    <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                      <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                        {product.title}
                      </h3>
                      <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
