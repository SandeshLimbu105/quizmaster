// routes/questions.js
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { questionText, options, correctAnswer, category } = req.body;

    if (!questionText || !options || typeof correctAnswer !== 'number') {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newQuestion = new Question({
      questionText,
      options,
      correctAnswer,
      category: category || 'general'
    });

    await newQuestion.save();
    res.status(201).json({ success: true, message: 'Question added successfully!', question: newQuestion });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
