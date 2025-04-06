const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const voterRoutes = require('./routes/voterRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Voter = require('./models/Voter');

dotenv.config();
const app = express();

// 📌 Static folders
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public'))); // for emblem, CSS etc.
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // for voter photos


// 📌 View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 📌 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to handle form-data

// 📌 Routes

// Home Page - Homelander
app.get('/homelander', (req, res) => {
  res.render('homelander');
});

// Main landing page
app.get('/', (req, res) => {
  res.render('index');
});

// Voter Login Page
app.get('/voterLogin', (req, res) => {
  res.render('voterLogin', { error: null });
});

// Handle Voter Login
app.post('/voterLogin', async (req, res) => {
  const { aadhaar, password } = req.body;

  try {
    const voter = await Voter.findOne({ aadhaar });

    if (!voter || voter.password !== password) {
      return res.render('voterLogin', { error: 'Invalid Aadhaar or Password' });
    }

    res.render('dashboard', {
      name: voter.name,
      voterId: voter._id,
      photoPath: '/uploads/' + path.basename(voter.photo)
    });

  } catch (err) {
    console.error(err);
    res.render('voterLogin', { error: 'Something went wrong' });
  }
});

// Admin Login Page
app.get('/admin/login', (req, res) => {
  res.render('adminLogin', { error: null });
});

// Admin Routes
app.use('/admin', adminRoutes);

// API Routes
app.use('/api/voters', voterRoutes);

// Test Route
app.get('/test', (req, res) => {
  res.send('✅ Server working perfectly.');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🧠 MongoDB connected'))
  .catch(err => console.error(err));

// Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  const previewURL = `https://localhost-${PORT}.preview.app.github.dev`;
  console.log(`🌐 IDX Preview: ${previewURL}`);
});
