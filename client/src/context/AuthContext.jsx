import React, { createContext, useState, useEffect } from 'react'
import api from '../utils/api'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch(e){ return null }
  })
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || [] } catch(e){ return [] }
  })

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    }
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const login = (tokenValue, userData) => {
    setToken(tokenValue)
    setUser(userData || null)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setCart([])
  }

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item._id === product._id)
      if (existingProduct) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item._id === productId)
      if (existingProduct.quantity === 1) {
        return prevCart.filter(item => item._id !== productId)
      } else {
        return prevCart.map(item =>
          item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      }
    })
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </AuthContext.Provider>
  )
}
