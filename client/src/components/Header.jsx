import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1rem',background:'#0f172a',color:'#fff'}}>
      <Link to="/" style={{color:'#fff',textDecoration:'none'}}>
        <h1>Shopverse</h1>
      </Link>
      <nav>
        <Link to="/" style={{color:'#fff',marginRight:16}}>Home</Link>
        <Link to="/category/fashion" style={{color:'#fff',marginRight:16}}>Fashion</Link>
        <Link to="/category/electronics" style={{color:'#fff',marginRight:16}}>Electronics</Link>
        <Link to="/category/groceries" style={{color:'#fff'}}>Groceries</Link>
      </nav>
    </header>
  )
}
