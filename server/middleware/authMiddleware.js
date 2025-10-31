const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' })
  }
}

exports.isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) return res.status(403).json({ message: 'Admin required' })
  next()
}
