const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// List products (optionally by category)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter).limit(50);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
