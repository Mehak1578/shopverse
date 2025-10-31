const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  const payload = { userId: user._id, isAdmin: user.isAdmin }
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
}

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: 'User already exists' })

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    user = new User({ name, email, password: hashed })
    await user.save()

    const token = generateToken(user)
    res.status(201).json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = generateToken(user)
    res.json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}
