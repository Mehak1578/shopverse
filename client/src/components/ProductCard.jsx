import React, { useContext, useMemo, useState } from 'react'
import { formatINR } from '../utils/currency'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function ProductCard({ product }){
  const { addToCart } = useContext(AuthContext)
  const original = product?.images?.[0] || ''
  const jpgCandidate = useMemo(() => {
    return original.endsWith('.svg') ? original.replace(/\.svg$/, '.jpg') : original
  }, [original])
  const [src, setSrc] = useState(jpgCandidate)

  return (
    <div className="shadow-md p-4 rounded-lg hover:scale-105 transition">
      <Link to={`/product/${product._id}`} className="block">
        <div className="w-full h-56 md:h-64 bg-slate-100 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
          <img
            src={src}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain"
            onError={() => {
              if (src !== original) setSrc(original)
            }}
          />
        </div>
        <h3 className="font-semibold">{product.name}</h3>
            <p>{formatINR(product.price)}</p>
      </Link>
      <button onClick={() => addToCart(product)} className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700">Add to Cart</button>
    </div>
  )
}
