import React, { useState, useEffect } from "react";

export default function BentoHero() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=3&skip=6")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* Featured Products Section */}
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        <div className="md:col-span-4 md:row-span-2">
          {/* Product 1 */}
          <a
            className="relative block aspect-square h-full w-full"
            href={`/product/${products[0]?.id}`}
          >
            <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
              <img
                alt={products[0]?.title}
                className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                src={products[0]?.images[0]}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 lg:px-20 lg:pb-[35%]">
                <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                  <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                    {products[0]?.title}
                  </h3>
                  <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                    ${products[0]?.price}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="md:col-span-2 md:row-span-1">
          {/* Product 2 */}
          <a
            className="relative block aspect-square h-full w-full"
            href={`/product/${products[1]?.id}`}
          >
            <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
              <img
                alt={products[1]?.title}
                className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                src={products[1]?.images[1]}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4">
                <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                  <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                    {products[1]?.title}
                  </h3>
                  <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                    ${products[1]?.price}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="md:col-span-2 md:row-span-1">
          {/* Product 3 */}
          <a
            className="relative block aspect-square h-full w-full"
            href={`/product/${products[2]?.id}`}
          >
            <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
              <img
                alt={products[2]?.title}
                className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                src={products[2]?.images[0]}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4">
                <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                  <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                    {products[2]?.title}
                  </h3>
                  <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                    ${products[2]?.price}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
