import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../utils/api'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' })
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await loginUser(form)
      // server returns { token } — we also store a simple user placeholder
      login(data.token, { name: 'User', isAdmin: false })
      toast.success('Logged in')
      navigate('/')
    } catch (err) {
      toast.error('Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              id="email"
              type="email"
              placeholder="you@example.com" 
              value={form.email} 
              onChange={e=>setForm({...form,email:e.target.value})} 
              required 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              id="password"
              placeholder="Password" 
              type="password" 
              value={form.password} 
              onChange={e=>setForm({...form,password:e.target.value})} 
              required 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button 
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
