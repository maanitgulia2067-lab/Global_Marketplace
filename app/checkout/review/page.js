"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearCart, clearShippingInfo, cartTotal, readCartItems, readShippingInfo } from "@/app/lib/cart";

export default function CheckoutReviewPage() {
  const [shipping, setShipping] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setShipping(readShippingInfo());
    setCartItems(readCartItems());
  }, []);

  const handlePlaceOrder = async () => {
    if (!shipping || cartItems.length === 0) {
      setStatus({ loading: false, error: "Missing shipping information or cart items.", success: "" });
      return;
    }

    setStatus({ loading: true, error: "", success: "" });

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shipping, items: cartItems }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to place order.");
      }

      clearCart();
      clearShippingInfo();
      setOrderId(data.orderId);
      setOrderPlaced(true);
      setStatus({ loading: false, error: "", success: `Order placed successfully.` });
    } catch (error) {
      setStatus({ loading: false, error: error.message || "Unable to place order.", success: "" });
    }
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-slate-100 text-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Order confirm</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Thank you for your order!
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Your order has been placed successfully. Order ID: <span className="font-semibold text-slate-900">{orderId}</span>.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!shipping || cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-slate-100 text-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Checkout review</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Review step unavailable
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Please complete your shipping details and add items to your cart first.
            </p>
            <button
              onClick={() => router.push("/checkout")}
              className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Return to checkout
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Checkout review</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Confirm your order
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Review your shipping details and cart items before placing the order.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <section className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-900">Shipping details</h2>
                <div className="mt-4 space-y-3 text-slate-700">
                  {Object.entries(shipping).map(([key, value]) => (
                    <p key={key} className="text-sm leading-6">
                      <span className="font-semibold text-slate-900 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span> {value || "-"}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-900">Cart items</h2>
                <div className="mt-4 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-4">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="h-16 w-16 rounded-3xl object-cover" />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-200 text-slate-500">No image</div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Order total</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">${cartTotal(cartItems).toFixed(2)}</p>
              </div>
              {status.error ? (
                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                  {status.error}
                </div>
              ) : null}
              <button
                onClick={handlePlaceOrder}
                disabled={status.loading}
                className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {status.loading ? "Placing order..." : "Place order"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/checkout")}
                className="w-full rounded-full border border-slate-900 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Edit shipping information
              </button>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
