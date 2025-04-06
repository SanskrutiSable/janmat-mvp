const mongoose = require('mongoose');

const flaggedVoterSchema = new mongoose.Schema({
  voterId: mongoose.Schema.Types.ObjectId,
  reason: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FlaggedVoter', flaggedVoterSchema);
