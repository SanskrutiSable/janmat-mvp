const QRCode = require('qrcode');

const generateQRCode = async (text) => {
  try {
    const qr = await QRCode.toDataURL(text);
    return qr;
  } catch (error) {
    console.error("QR generation error", error);
    return null;
  }
};

module.exports = generateQRCode;
