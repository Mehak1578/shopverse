const Product = require('../models/Product')
const mongoose = require('mongoose')
const sampleProducts = require('../data/products')

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

exports.getProducts = async (req, res) => {
  try {
    // If DB not connected, return sample data from server/data/products.js so frontend can show products
    if (mongoose.connection.readyState !== 1) {
      return res.json(sampleProducts)
    }
    const { category } = req.query
    const filter = category ? { category: { $regex: new RegExp(`^${category}$`, 'i') } } : {}
    const products = await Product.find(filter).limit(100)
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product removed' })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}
