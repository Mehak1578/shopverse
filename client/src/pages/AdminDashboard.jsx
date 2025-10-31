import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { formatINR } from '../utils/currency'

export default function AdminDashboard(){
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    let mounted=true
    ;(async()=>{
      try{ const p = await api.get('/products'); if(mounted) setProducts(p.data) }catch(e){}
      try{ const o = await api.get('/orders'); if(mounted) setOrders(o.data) }catch(e){}
    })()
    return ()=> mounted=false
  },[])

  return (
<div className="max-w-7xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">Admin Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Products Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Products ({products.length})</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {products.map(p => (
              <div key={p._id} className="p-3 border rounded-lg flex justify-between items-center">
                <span>{p.name}</span>
                <span className="text-sm text-gray-500">{formatINR(p.price)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Recent Orders ({orders.length})</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {orders.map(o => (
              <div key={o._id} className="p-3 border rounded-lg">
                <div className="font-semibold">Order ID: {o._id}</div>
                <div className="text-sm text-gray-600">Status: <span className="font-medium text-green-600">{o.status}</span></div>
                <div className="text-sm text-gray-600">Total: <span className="font-medium">{formatINR(o.totalPrice)}</span></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
