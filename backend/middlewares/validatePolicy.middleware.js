const fields = [
  "dob",
  "gender",
  "sumAssured",
  "modalPremium",
  "premiumFrequency",
  "policyTerm",
  "policyPaymentTerm",
];

const validatePolicy = async (req, res, next) => {
  const errors = {};
  fields.forEach((field) => {
    if (!req.body[field]) {
      errors[field] = `${field} is required`;
    }
  });

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  if (req.body.policyPaymentTerm <= 5 || req.body.policyPaymentTerm >= 10) {
    errors.policyPaymentTerm = "Policy Payment Term should be between 5 and 10";
  }

  if (req.body.policyTerm <= 10 || req.body.policyTerm >= 20) {
    errors.policyTerm = "Policy Term should be between 10 and 20";
  }

  if (req.body.modalPremium <= 10000 || req.body.modalPremium >= 50000) {
    errors.modalPremium = "Modal Premium should be between 10000 and 50000";
  }

  if (req.body.policyTerm < req.body.policyPaymentTerm) {
    errors.policyTerm =
      "Policy Term should be greater than Policy Payment Term";
  }

  if (
    req.body.premiumFrequency !== "Yearly" &&
    req.body.premiumFrequency !== "Half-Yearly" &&
    req.body.premiumFrequency !== "Monthly"
  ) {
    errors.premiumFrequency =
      "Premium Frequency should be Yearly, Half-Yearly or Monthly";
  }

  if (
    req.body.sumAssured < 5000000 ||
    req.body.sumAssured < 10 * req.body.modalPremium
  ) {
    errors.sumAssured =
      "Sum Assured should be greater than 5000000 or 10 times Modal Premium";
  }

  if (req.body.dob) {
    const dob = new Date(req.body.dob);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 23 || age > 56) {
      errors.dob = "Age should be between 23 and 56";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = validatePolicy;
