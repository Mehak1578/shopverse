const express = require('express')
const router = express.Router()
const { createOrder, getUserOrders, getAllOrders } = require('../controllers/orderController')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')

// Create order (authenticated users)
router.post('/', verifyToken, createOrder)

// Get current user's orders
router.get('/my', verifyToken, getUserOrders)

// Admin: get all orders
router.get('/', verifyToken, isAdmin, getAllOrders)

module.exports = router
