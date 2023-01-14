const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  dob: Date,
  gender: String,
  sumAssured: Number,
  modalPremium: Number,
  premiumFrequency: String,
  policyTerm: Number,
  policyPaymentTerm: Number,
});

const PolicyModel = mongoose.model("Policy", policySchema);

module.exports = PolicyModel;
