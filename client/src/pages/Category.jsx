import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../utils/api'
import ProductCard from '../components/ProductCard'

export default function Category(){
  const { name } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchProducts(name)
      .then(data => { if (mounted) setProducts(data) })
      .catch(err => { if (mounted) setError(err.message || 'Failed to load') })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [name])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 capitalize text-slate-800">
        {name || 'Category'}
      </h2>

      {loading && <p>Loading products…</p>}
      {error && <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}

      {!loading && !error && (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(p => (
                <ProductCard key={p._id || p.id || p.name} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
