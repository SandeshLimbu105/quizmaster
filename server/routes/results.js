const express = require('express');
const router = express.Router();
const Result = require('../models/result'); // ✅ Make sure this file exists

// POST /api/results - Save user's quiz result
router.post('/', async (req, res) => {
  try {
    const { username, score, category } = req.body;

    if (!username || score == null) {
      return res.status(400).json({ message: 'Username and score are required' });
    }

    const newResult = new Result({
      username,
      score,
      category: category || 'general'
    });

    await newResult.save();
    res.status(201).json({ message: 'Result saved successfully' });
  } catch (err) {
    console.error('Error saving result:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
