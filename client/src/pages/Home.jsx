import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../utils/api'
import ProductCard from '../components/ProductCard'
import Carousel from '../components/Carousel'

const categories = [
  { key: 'fashion', label: 'Fashion' },
  { key: 'electronics', label: 'Electronics' },
  { key: 'groceries', label: 'Groceries' },
  { key: 'home', label: 'Home' },
  { key: 'books', label: 'Books' },
  { key: 'sports', label: 'Sports' },
  { key: 'beauty', label: 'Beauty' }
]

export default function Home(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchProducts()
      .then(data => { if (mounted) setProducts(data) })
      .catch(err => { if (mounted) setError(err.message || 'Failed to load') })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  const featured = products.slice(0,6)

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center bg-slate-100 p-8 rounded-xl">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Shopverse — Discover Something New</h1>
          <p className="text-lg text-slate-600">Shop across Fashion, Electronics, Groceries, Home, Books and more.</p>
          <a href="#categories">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors transform hover:scale-105">
              Shop Now
            </button>
          </a>
        </div>
        <div className="h-64 md:h-80 bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = '/images/hero.svg' }}
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h3 className="text-3xl font-bold mb-6 text-slate-800">Featured Products</h3>
        {loading && <p>Loading featured…</p>}
        {!loading && <Carousel items={featured} />}
      </section>

      {/* Categories Section */}
      <section id="categories" className="pt-8">
        <h3 className="text-3xl font-bold mb-6 text-slate-800">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map(c => (
            <a key={c.key} href={`/category/${c.key}`} className="block group">
              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center transition-transform transform hover:-translate-y-1 hover:shadow-lg">
                <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={`/images/categories/${c.key}.jpg`}
                    alt={c.label}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.fallback) {
                        e.currentTarget.dataset.fallback = '1'
                        e.currentTarget.src = `/images/categories/${c.key}.svg`
                      }
                    }}
                  />
                </div>
                <div className="font-semibold text-slate-700">{c.label}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* All Products Section */}
      <section className="pt-8">
        <h3 className="text-3xl font-bold mb-6 text-slate-800">All Products</h3>
        {error && <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <ProductCard key={p._id || p.id || p.name} product={p} />
            ))}
          </div>
        )}
      </section>

  {/* Payment methods removed from homepage per request */}
    </div>
  )
}
