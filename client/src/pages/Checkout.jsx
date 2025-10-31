import React, { useState, useContext } from 'react';
import { formatINR } from '../utils/currency';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Checkout() {
  const { cart } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'Credit Card',
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to a backend
    console.log('Order placed:', { ...formData, cart });
    toast.success('Payment Successful! Thank you for shopping with Shopverse.');
    setIsOrderPlaced(true);
    // Here you would typically clear the cart as well
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  if (isOrderPlaced) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
        <p className="text-lg text-slate-700">Thank you for shopping with Shopverse.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      <div className="mb-6 p-4 bg-slate-100 rounded-lg">
        <h3 className="font-semibold text-lg">Order Summary</h3>
  <p className="text-slate-600">Total Items: {cart.length}</p>
  <p className="font-bold text-xl mt-2">Total: {formatINR(cartTotal)}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
          <textarea
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <div className="mt-2 space-y-2">
            {['Credit Card', 'UPI', 'Cash on Delivery'].map((method) => (
              <label key={method} className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-3 block text-sm text-gray-700">{method}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
