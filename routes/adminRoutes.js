const express = require('express');
const router = express.Router();
const FlaggedVoter = require('../models/FlaggedVoter');
//const Voteodels/Voter');

// Route to show all flagged voters
router.get('/flagged', async (req, res) => {
  try {
    const flaggedVoters = await FlaggedVoter.find().populate('voterId');
    res.render('flagged', {
      flaggedVoters,
      title: 'Flagged Voters' // 👈 pass the title here
    });
  } catch (err) {
    console.error('⚠️ Error loading flagged voters:', err);
    res.status(500).send('Error loading flagged voters');
  }
});


module.exports = router;
