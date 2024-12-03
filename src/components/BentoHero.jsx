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

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="relative block aspect-square h-full w-full animate-pulse bg-gray-300 rounded-lg">
      <div className="bg-gray-400 h-full w-full rounded-lg"></div>
      <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4">
        <div className="flex items-center rounded-full bg-gray-500/70 p-1 text-xs font-semibold text-white">
          <div className="h-4 w-24 bg-gray-500 rounded mb-2"></div>
          <div className="flex-none rounded-full bg-gray-500 p-2 w-12 h-6 ml-2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Featured Products Section */}
      <section className="mx-auto my-2 grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        <div className="md:col-span-4 md:row-span-2">
          {/* Product 1 */}
          {loading ? (
            <SkeletonLoader />
          ) : (
            <a
              className="relative block aspect-square h-full w-full"
              href={`/product/${products[0]?.id}`}
            >
              <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
                <img
                  alt={products[0]?.title}
                  className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                  src={products[0]?.images[2]}
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
          )}
        </div>

        <div className="md:col-span-2 md:row-span-1">
          {/* Product 2 */}
          {loading ? (
            <SkeletonLoader />
          ) : (
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
          )}
        </div>

        <div className="md:col-span-2 md:row-span-1">
          {/* Product 3 */}
          {loading ? (
            <SkeletonLoader />
          ) : (
            <a
              className="relative block aspect-square h-full w-full"
              href={`/product/${products[2]?.id}`}
            >
              <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
                <img
                  alt={products[2]?.title}
                  className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                  src={products[2]?.images[1]}
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
          )}
        </div>
      </section>
    </div>
  );
}
