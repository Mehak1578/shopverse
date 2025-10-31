import React, { useState, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const categories = ['Fashion','Electronics','Groceries','Home','Books','Sports','Beauty']

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const { user, logout, cart } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold"><h2>Shopverse</h2></Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-lg">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-blue-400' : 'hover:text-blue-300 transition-colors'}>Home</NavLink>
          
          <div className="relative group">
            <button className="hover:text-blue-300 transition-colors">Categories ▾</button>
            <div className="absolute right-0 mt-2 w-48 bg-white text-slate-900 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {categories.map(c => (
                <Link key={c} to={`/category/${c.toLowerCase()}`} className="block px-4 py-2 hover:bg-slate-100">{c}</Link>
              ))}
            </div>
          </div>

          <NavLink to="/cart" className={({isActive}) => isActive ? 'text-blue-400' : 'hover:text-blue-300 transition-colors'}>
            Cart {cart.length > 0 && `(${cart.length})`}
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={({isActive}) => isActive ? 'text-blue-400' : 'hover:text-blue-300 transition-colors'}>Login</NavLink>
              <NavLink to="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors">Register</NavLink>
            </>
          ) : (
            <div className="relative group">
              <button className="hover:text-blue-300 transition-colors">{user.name || 'Account'} ▾</button>
              <div className="absolute right-0 mt-2 w-48 bg-white text-slate-900 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <Link to="/profile" className="block px-4 py-2 hover:bg-slate-100">Profile</Link>
                {user.isAdmin && <Link to="/admin" className="block px-4 py-2 hover:bg-slate-100">Admin</Link>}
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-slate-100">Logout</button>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile Nav Button */}
        <button className="md:hidden" onClick={() => setOpen(o => !o)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {open && (
        <nav className="md:hidden flex flex-col items-center gap-4 py-4 text-lg">
          <NavLink to="/" onClick={()=>setOpen(false)} className={({isActive}) => isActive ? 'text-blue-400' : 'hover:text-blue-300 transition-colors'}>Home</NavLink>
          
          {/* Mobile Categories can be a simple link to a dedicated categories page or a dropdown */}
          <div className="relative group text-center">
            <button className="hover:text-blue-300 transition-colors">Categories ▾</button>
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-slate-900 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {categories.map(c => (
                <Link key={c} to={`/category/${c.toLowerCase()}`} onClick={()=>setOpen(false)} className="block px-4 py-2 hover:bg-slate-100">{c}</Link>
              ))}
            </div>
          </div>

          <NavLink to="/cart" onClick={()=>setOpen(false)} className={({isActive}) => isActive ? 'text-blue-400' : 'hover:text-blue-300 transition-colors'}>
            Cart {cart.length > 0 && `(${cart.length})`}
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" onClick={()=>setOpen(false)} className={({isActive}) => isActive ? 'text-blue-400' : 'hover:text-blue-300 transition-colors'}>Login</NavLink>
              <NavLink to="/register" onClick={()=>setOpen(false)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors">Register</NavLink>
            </>
          ) : (
            <div className="relative group text-center">
              <button className="hover:text-blue-300 transition-colors">{user.name || 'Account'} ▾</button>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-slate-900 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <Link to="/profile" onClick={()=>setOpen(false)} className="block px-4 py-2 hover:bg-slate-100">Profile</Link>
                {user.isAdmin && <Link to="/admin" onClick={()=>setOpen(false)} className="block px-4 py-2 hover:bg-slate-100">Admin</Link>}
                <button onClick={() => { handleLogout(); setOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-slate-100">Logout</button>
              </div>
            </div>
          )}
        </nav>
      )}
    </header>
  )
}
