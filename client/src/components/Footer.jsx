import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-slate-900 text-slate-400 pt-12 pb-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* About Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-white text-2xl font-bold mb-2">Shopverse</h3>
          <p>Modern multi-category e-commerce experience built with the MERN stack.</p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/category/fashion" className="hover:text-white transition-colors">Fashion</a></li>
            <li><a href="/category/electronics" className="hover:text-white transition-colors">Electronics</a></li>
            <li><a href="/cart" className="hover:text-white transition-colors">Cart</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Newsletter</h4>
          <p className="mb-3">Get weekly deals and updates delivered to your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              aria-label="email" 
              className="flex-grow p-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
            />
            <button className="p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="text-center text-slate-500 mt-10 pt-6 border-t border-slate-800">
        © {new Date().getFullYear()} Shopverse. All Rights Reserved.
      </div>
    </footer>
  )
}
