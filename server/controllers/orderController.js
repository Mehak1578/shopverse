const Order = require('../models/Order')

exports.createOrder = async (req, res) => {
  try {
    const { products, totalPrice } = req.body
    const order = new Order({ userId: req.user.userId, products, totalPrice })
    await order.save()
    res.status(201).json(order)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).populate('products.productId')
    res.json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('products.productId')
    res.json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}
