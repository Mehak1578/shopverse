import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

const api = axios.create({ baseURL: API_BASE, timeout: 10000 })

export default api

export const fetchProducts = async (category) => {
  const url = category ? `/products?category=${encodeURIComponent(category)}` : '/products'
  const res = await api.get(url)
  return res.data
}

export const getProduct = async (id) => {
  const res = await api.get(`/products/${id}`)
  return res.data
}

export const registerUser = async (payload) => {
  const res = await api.post('/auth/register', payload)
  return res.data
}

export const loginUser = async (payload) => {
  const res = await api.post('/auth/login', payload)
  return res.data
}

export const createOrder = async (payload) => {
  const res = await api.post('/orders', payload)
  return res.data
}

