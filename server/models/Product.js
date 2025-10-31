const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ['Fashion', 'Electronics', 'Groceries', 'Home', 'Books', 'Sports', 'Beauty'],
      required: true
    },
    price: { type: Number, required: true },
    images: [{ type: String }],
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)
