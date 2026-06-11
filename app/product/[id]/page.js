"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { addCartItem } from "@/app/lib/cart";

export const dynamic = "force-dynamic";

export default function ProductPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) {
          throw new Error(`Product not found (${res.status})`);
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || "Unable to load product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = addCartItem(product);
    setMessage(`${product.title} added to cart (${cart.length} item${cart.length === 1 ? "" : "s"}).`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            Loading product details...
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-100 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-700 shadow-sm">
            {error || "Product not found."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <img src={product.image} alt={product.title} className="w-full rounded-3xl object-cover" />
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{product.category}</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-900">{product.title}</h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">{product.description}</p>
            </div>
          </div>

          <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Price</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">${product.price?.toFixed(2)}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Add to Cart
            </button>
            <button
              onClick={() => router.push("/add-to-cart")}
              className="w-full rounded-full border border-slate-900 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Go to Cart
            </button>
            {message ? <p className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">{message}</p> : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
