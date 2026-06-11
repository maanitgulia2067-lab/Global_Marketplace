export const metadata = {
  title: "About | Global Marketplace",
  description: "Learn about our global marketplace connecting buyers and sellers around the world.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Hero Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="p-10 flex flex-col justify-center">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">About Our Mission</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  A global marketplace for everyone
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Our marketplace connects millions of buyers and sellers across 150+ countries. We empower entrepreneurs, artisans, and small businesses to reach customers worldwide, breaking down barriers to international commerce.
                </p>
              </div>
              <div className="aspect-video bg-slate-200 overflow-hidden rounded-3xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                  alt="Global marketplace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <p className="text-4xl font-semibold text-slate-900">2.5M+</p>
              <p className="mt-2 text-slate-600">Active Sellers</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <p className="text-4xl font-semibold text-slate-900">15M+</p>
              <p className="mt-2 text-slate-600">Active Buyers</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <p className="text-4xl font-semibold text-slate-900">50M+</p>
              <p className="mt-2 text-slate-600">Products Listed</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <p className="text-4xl font-semibold text-slate-900">150+</p>
              <p className="mt-2 text-slate-600">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Why Choose Us</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Our core values</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80"
                alt="Trust and safety"
                className="w-full h-40 object-cover rounded-3xl"
              />
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Trust & Safety</h3>
              <p className="mt-3 text-slate-600">
                Every transaction is protected with buyer and seller guarantees. We verify sellers and monitor for fraud 24/7.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80"
                alt="Global reach"
                className="w-full h-40 object-cover rounded-3xl"
              />
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Global Reach</h3>
              <p className="mt-3 text-slate-600">
                Sell to customers worldwide and access products from international sellers. We handle cross-border logistics.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80"
                alt="Affordable pricing"
                className="w-full h-40 object-cover rounded-3xl"
              />
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Competitive Pricing</h3>
              <p className="mt-3 text-slate-600">
                Lower fees for sellers. We charge only 5% commission, making it easy to grow your business profitably.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Our Team</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Meet the people behind Global Marketplace</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                alt="Maanit Gulia"
                className="w-32 h-32 mx-auto rounded-full object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Maanit Gulia</h3>
              <p className="text-sm text-slate-500">Founder & CEO</p>
              <p className="mt-3 text-slate-600">
                Tech visionary with a passion for building scalable platforms.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Get Started</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Join millions of sellers and buyers</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Start selling your products worldwide or discover unique items from sellers everywhere.
            </p>
            <div className="mt-8 flex gap-4 flex-col sm:flex-row sm:justify-center">
              <button className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                Start Selling
              </button>
              <button className="rounded-full border border-slate-900 bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-300">
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
