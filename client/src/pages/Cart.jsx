import React, { useContext } from 'react'
import { formatINR } from '../utils/currency'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Cart(){
  const { cart, addToCart, removeFromCart } = useContext(AuthContext)
  const subtotal = cart.reduce((s,i)=>s + (i.price * i.quantity),0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-slate-500 text-lg">Your cart is empty. Start shopping!</p>
          <Link to="/" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
                <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-slate-600">{formatINR(item.price)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="number" 
                    value={item.quantity}
                    onChange={(e) => addToCart(item, parseInt(e.target.value))}
                    className="w-20 border-slate-300 rounded-md text-center"
                    min="1"
                  />
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 font-semibold">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <Link to="/checkout">
              <button className="mt-6 w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
