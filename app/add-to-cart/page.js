"use client";

import { useEffect, useState } from "react";
import { clearCart, cartTotal, readCartItems, removeCartItem, updateCartItemQuantity } from "@/app/lib/cart";

export default function AddToCartPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readCartItems());
  }, []);

  const handleRemove = (id) => {
    setItems(removeCartItem(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setItems(updateCartItemQuantity(id, newQuantity));
  };

  const handleClear = () => {
    setItems(clearCart());
  };

  const total = cartTotal(items);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Shopping Cart</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Your items ready for checkout
          </h1>

          {items.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-600">
              Your cart is empty. Visit a product page and add something to your cart.
            </div>
          ) : (
            <div className="mt-10 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="h-20 w-20 rounded-3xl object-cover" />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-200 text-slate-500">No image</div>
                      )}
                      <div>
                        <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            −
                          </button>
                          <span className="min-w-[2rem] text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="mt-3 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Cart total</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">${total.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={handleClear}
                    className="rounded-full border border-slate-900 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    Clear cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
