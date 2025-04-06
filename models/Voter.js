const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  name: String,
  email: String,
  voterId: String,
  photo: String,
  isFraudulent: { type: Boolean, default: false }
});

module.exports = mongoose.model('Voter', voterSchema);
