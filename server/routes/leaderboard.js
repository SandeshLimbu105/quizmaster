const express = require('express');
const router = express.Router();
const Result = require('../models/result');

// GET /api/leaderboard
router.get('/', async (req, res) => {
  try {
    const topResults = await Result.find().sort({ score: -1 }).limit(10); // Top 10
    res.json(topResults);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

module.exports = router;
