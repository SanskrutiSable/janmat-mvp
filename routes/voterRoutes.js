const express = require('express');
const router = express.Router();
const multer = require('multer');
const { registerVoter } = require('../controllers/voterController');

const upload = multer({ dest: 'uploads/' });

router.post('/register', upload.single('photo'), registerVoter);

module.exports = router;
