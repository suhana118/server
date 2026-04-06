const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const UserModel = require('./models/Users');

// Load environment variables
dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*', //Allow your frontend domain
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders:'Content-Type',
    credentials: true,
  })
);

app.use(express.json());

// MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
}

connectDB();

// Test Route
app.get('/', (req, res) => {
  res.send('🚀 Server is running successfully on Render and connected to MongoDB Atlas!');
});
