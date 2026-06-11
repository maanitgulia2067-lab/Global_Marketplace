"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load products");
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || "Unable to load products.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Search failed");

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        throw new Error("Invalid search response format");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Failed to search products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Product Catalog
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            All Products
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
            A seamless shopping experience, powered by high-performance architecture.
          </p>

          <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search products..." className="border border-slate-300 bg-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
          <button onClick={handleSearch} className="ml-2 rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">Search</button>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            Loading products...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-700 shadow-sm">
            {error}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product._id ?? product.id ?? product.title}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="aspect-[4/3] bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {product.category}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900">
                    {product.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-900">
                      ${product.price?.toFixed(2)}
                    </span>
                    <Link
                      href={`/product/${product._id ?? product.id}`}
                      className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
