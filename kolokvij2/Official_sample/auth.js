const bcrypt = require("bcrypt");

async function hashPassword(plain_text, salt_rounds = 10) {
  return await bcrypt.hash(plain_text, salt_rounds);
}

async function comparePassword(plain_text, hashed_password) {
  return await bcrypt.compare(plain_text, hashed_password);
}

module.exports = {
  hashPassword,
  comparePassword,
};