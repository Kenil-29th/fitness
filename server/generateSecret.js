// generateSecret.js
const crypto = require('crypto');

const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex'); // Generates 64 random bytes, converted to hex string
};

const secret = generateSecret();
console.log('Your JWT Secret:', secret);