import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link href="/" className="text-xl font-semibold text-slate-900">
            IntellijCart
          </Link>
          <p className="text-xs text-slate-500">A world market for buyers around the globe.</p>
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
        </nav>
      </div>
    </header>
  );
}
