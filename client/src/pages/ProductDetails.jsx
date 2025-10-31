import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../utils/api'
import { formatINR } from '../utils/currency'
import Carousel from '../components/Carousel'

export default function ProductDetails(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getProduct(id).then(data=>{ if(mounted) setProduct(data) }).catch(e=>{ if(mounted) setError('Failed to load') }).finally(()=>{ if(mounted) setLoading(false) })
    return ()=> mounted=false
  },[id])

  if (loading) return <p>Loading…</p>
  if (error) return <p style={{color:'red'}}>{error}</p>
  if (!product) return <p>Product not found</p>

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="h-[28rem] md:h-[32rem] bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
            {product.images && product.images[0] ? (
              <img
                src={product.images[0].endsWith('.svg')
                      ? product.images[0].replace(/\.svg$/, '.jpg')
                      : product.images[0]}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const orig = product.images[0]
                  if (!e.currentTarget.dataset.fallback && e.currentTarget.src.indexOf(orig) === -1) {
                    e.currentTarget.dataset.fallback = '1'
                    e.currentTarget.src = orig
                  }
                }}
              />
            ) : (
              <div className="text-slate-400">[no image]</div>
            )}
          </div>
          {/* Optional: Thumbnail gallery */}
          {/* <div className="grid grid-cols-5 gap-2">
            {product.images?.map((img, i) => (
              <div key={i} className="h-20 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden">
                <img src={img} alt={`thumbnail ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div> */}
        </div>
  
        {/* Product Info */}
        <div className="flex flex-col">
          <span className="text-indigo-600 font-semibold mb-1">{product.category}</span>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">{product.name}</h1>
          <p className="text-slate-600 mb-4">{product.description}</p>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-slate-900">{formatINR(product.price)}</span>
            {product.rating && <span className="text-amber-500 font-bold">{product.rating} ★</span>}
          </div>
  
          <div className="mt-auto">
            <button className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
  
      {/* Related Products */}
      {product.related && product.related.length > 0 && (
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-slate-800">Related Products</h3>
          <Carousel items={product.related} />
        </section>
      )}
    </div>
  )
}
