"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link href="/" className="text-xl font-semibold text-slate-900">
            Global Marketplace
          </Link>
          <p className="text-xs text-slate-500">
            A world market for buyers around the globe.
          </p>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link href="/" className="transition hover:text-slate-900">
            Home
          </Link>
          <Link href="/about" className="transition hover:text-slate-900">
            About
          </Link>
          <Link href="/add-to-cart" className="transition hover:text-slate-900">
            Cart
          </Link>
          <Link
            href="/checkout"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Checkout
          </Link>

          <div className="ml-2 flex items-center border-l border-slate-200 pl-4">
            {status === "loading" ? (
              <span className="text-xs text-slate-400">Loading...</span>
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-800">
                  Hi, {session.user.name?.split(" ")[0] || "User"}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
