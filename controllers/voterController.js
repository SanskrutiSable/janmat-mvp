const Voter = require('../models/Voter');
const FlaggedVoter = require('../models/FlaggedVoter');
const QRCode = require('qrcode');
const path = require('path');

const registerVoter = async (req, res) => {
  try {
    const { name, aadhaar } = req.body;
    const photo = req.file;

    if (!photo) return res.status(400).send('Photo is required');
    const photoPath = path.join('uploads', photo.filename);

    // Check for duplicate Aadhaar
    const existing = await Voter.findOne({ aadhaar });
    const isFraudulent = !!existing;

    const newVoter = new Voter({
      name,
      aadhaar,
      photo: photoPath,
      isFraudulent
    });

    await newVoter.save();

    // 🚨 Flag if fraud
    if (isFraudulent) {
      const flagged = new FlaggedVoter({
        voterId: newVoter._id,
        reason: 'Duplicate Aadhaar detected'
      });
      await flagged.save();
    }

    const qrData = newVoter._id.toString();
    const qrImageData = await QRCode.toDataURL(qrData);

    res.render('qr', {
      name: newVoter.name,
      voterId: newVoter._id,
      qrCode: qrImageData,
      isFraudulent
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

module.exports = { registerVoter };

