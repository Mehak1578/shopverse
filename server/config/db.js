const mongoose = require('mongoose');

const connectDB = async () => {
  // Ensure we can pick up env from repo root when server run from root
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGODB_URI not set — skipping DB connect (use .env to set)');
    return;
  }
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.warn('Continuing without DB connection — server will use fallback sample data if available.');
    // Do not exit process; allow server to run with sample data fallback
  }
};

module.exports = connectDB;
