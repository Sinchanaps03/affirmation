// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import journal routes
const journalRoutes = require('./routes/journalroutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // optional if frontend is separate
app.use(express.json()); // parse JSON bodies

// Serve frontend static files (if you want to serve HTML from backend)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/journal', journalRoutes);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/journals', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});