const express = require('express')
const router = express.Router()
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')

// Public list/read
router.get('/', getProducts)
router.get('/:id', getProductById)

// Protected admin routes
router.post('/', verifyToken, isAdmin, createProduct)
router.put('/:id', verifyToken, isAdmin, updateProduct)
router.delete('/:id', verifyToken, isAdmin, deleteProduct)

module.exports = router
