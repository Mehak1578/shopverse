import React from 'react'
import { Link } from 'react-router-dom'
import { formatINR } from '../utils/currency'

export default function Carousel({ items = [] }){
  if (!items.length) return null
  return (
    <div className="grid" style={{gridAutoFlow:'column', gridAutoColumns:'minmax(280px, 1fr)', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem'}}>
      {items.map((product, i) => (
        <div key={product._id || i} className="bg-white rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-1 transition-transform duration-300">
          <Link to={`/product/${product._id}`} className="block">
            <div className="h-56 md:h-64 bg-slate-200 flex items-center justify-center overflow-hidden">
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0].endsWith('.svg')
                        ? product.images[0].replace(/\.svg$/, '.jpg')
                        : product.images[0]}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
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
            <div className="p-4">
              <h3 className="font-bold text-lg truncate">{product.name}</h3>
              <p className="text-slate-600 text-sm mt-2 h-10 overflow-hidden">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <strong className="text-xl text-slate-800">{formatINR(product.price)}</strong>
                <span className="text-sm text-amber-500 font-bold">{product.rating ? `${product.rating} ★` : ''}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
