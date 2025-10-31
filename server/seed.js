const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const Product = require('./models/Product')
const productsData = require('./data/products')

// Load server/.env first and fall back to repository root .env
dotenv.config()
if (!process.env.MONGODB_URI) {
  const rootEnv = path.resolve(__dirname, '..', '.env')
  dotenv.config({ path: rootEnv })
}

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI not set in .env — set it before running seed script')
  process.exit(1)
}

const seed = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to MongoDB for seeding')

    // Clear existing products
    await Product.deleteMany({})
    console.log('Cleared existing products')

    // Insert sample products
    const created = await Product.insertMany(productsData)
    console.log(`Inserted ${created.length} products`)

    console.log('Seeding completed')
    process.exit(0)
  } catch (err) {
    console.error('Seeding error:', err)
    process.exit(1)
  }
}

seed()
