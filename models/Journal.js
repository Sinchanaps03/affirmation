// models/Journal.js

const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, // journal entry cannot be empty
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now // automatically store creation time
  }
});

// Export the model
module.exports = mongoose.model('Journal', journalSchema);