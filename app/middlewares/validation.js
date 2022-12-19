const emailValidator = require("deep-email-validator");

async function isEmailValid(email) {
  return emailValidator.validate(email);
}

const validation = {
  isEmailValid,
};
module.exports = validation;
