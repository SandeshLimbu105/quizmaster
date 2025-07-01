require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const leaderboardRoutes = require('./routes/leaderboard');
// Import route files
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const resultRoutes = require('./routes/results');

const app = express();

// --------------------------------------
// 🔐 Middleware Setup
// --------------------------------------
app.use(cors({
  origin: ['http://localhost:5000'], // You can add your frontend domain here if deployed
  credentials: true
}));

app.use(express.json());

// --------------------------------------
// 🌐 Serve Static Files (Local Dev)
// --------------------------------------
app.use(express.static(path.join(__dirname, '../client/public')));

// --------------------------------------
// 🛣️ API Routes
// --------------------------------------
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);

// Test route (optional)
app.get('/api', (req, res) => {
  res.send('Quiz Website Backend is Running!');
});

// --------------------------------------
// 🏭 Serve React Build (Optional Production)
// --------------------------------------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// --------------------------------------
// 🗄️ MongoDB Connection
// --------------------------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quizdb');
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Connection event logging
mongoose.connection.on('connected', () => {
  console.log('📊 Mongoose connected to DB cluster');
});

mongoose.connection.on('disconnected', () => {
  console.warn('🔌 Mongoose disconnected');
});

// --------------------------------------
// 🚀 Start Server After DB Connection
// --------------------------------------
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
  app.use('/api/leaderboard', leaderboardRoutes);
  app.use('/api/results', resultRoutes);

  // Handle shutdown gracefully
  process.on('SIGTERM', () => {
    server.close(() => {
      mongoose.connection.close();
      console.log('👋 Server closed');
      process.exit(0);
    });
  });
});
