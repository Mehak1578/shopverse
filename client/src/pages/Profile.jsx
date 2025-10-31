import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../utils/api'
import { formatINR } from '../utils/currency'

export default function Profile(){
  const { user } = useContext(AuthContext)
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    let mounted=true
    ;(async()=>{
      try{
        const res = await api.get('/orders/my')
        if(mounted) setOrders(res.data)
      }catch(e){}
    })()
    return ()=> mounted=false
  },[])

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        {user ? (
          <div>
            <div className="mb-4">
              <strong className="text-gray-700">Name:</strong> {user.name}
            </div>
            <div className="mb-6">
              <strong className="text-gray-700">Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}
            </div>

            <h3 className="text-xl font-bold mb-4 border-t pt-6">Order History</h3>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map(o => (
                  <div key={o._id} className="p-4 border rounded-lg">
                    <div className="font-semibold">Order ID: {o._id}</div>
                    <div className="text-sm text-gray-600">Status: <span className="font-medium text-green-600">{o.status}</span></div>
                    <div className="text-sm text-gray-600">Total: <span className="font-medium">{formatINR(o.totalPrice)}</span></div>
                  </div>
                ))}
              </div>
            ) : (
              <p>You have no past orders.</p>
            )}
          </div>
        ) : (
          <p>Please login to view your profile.</p>
        )}
      </div>
    </div>
  )
}
