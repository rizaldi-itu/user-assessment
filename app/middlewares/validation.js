const emailValidator = require("deep-email-validator");

async function isEmailValid(email) {
  return emailValidator.validate(email);
}

async function isAdmin() {}

const validation = {
  isEmailValid,
  isAdmin,
};
module.exports = validation;
