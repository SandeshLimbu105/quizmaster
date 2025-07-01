const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quizdb', {
      serverSelectionTimeoutMS: 5000,  // Timeout after 5s instead of 30s
      maxPoolSize: 10,                // Maximum number of socket connections
      socketTimeoutMS: 45000,          // Close sockets after 45s of inactivity
      family: 4,                       // Use IPv4, skip IPv6
    });
    
    console.log('MongoDB connected successfully');
    
    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected');
    });
    
  } catch (err) {
    console.error('MongoDB initial connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;