// routes/journalroutes.js

const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');

// Get all journal entries
router.get('/', async (req, res) => {
  try {
    const journals = await Journal.find().sort({ createdAt: -1 }); // latest first
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single journal entry by ID
router.get('/:id', async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    res.json(journal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new journal entry
router.post('/', async (req, res) => {
  const journal = new Journal({
    text: req.body.text
  });

  try {
    const newJournal = await journal.save();
    res.status(201).json(newJournal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a journal entry by ID
router.put('/:id', async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ message: 'Journal not found' });

    if (req.body.text) journal.text = req.body.text;
    const updatedJournal = await journal.save();
    res.json(updatedJournal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a journal entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ message: 'Journal not found' });

    await journal.remove();
    res.json({ message: 'Journal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;