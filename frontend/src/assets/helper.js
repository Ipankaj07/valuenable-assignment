let bonusRates = [];

const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const calculateBonusRate = (dob, gender, premiumFrequency, policyTerm) => {
  for (let i = 0; i < policyTerm; i++) {
    let age = calculateAge(dob) + i;

    let baseRate =
      gender === "M"
        ? age >= 25 && age <= 30
          ? 2.5
          : age > 30 && age <= 35
          ? 3
          : 3.5
        : age >= 25 && age <= 30
        ? 2.5
        : age > 30 && age <= 35
        ? 2.8
        : 3.2;

    let additionalRate = 0;
    if (premiumFrequency === "Yearly") additionalRate = 0;
    else if (premiumFrequency === "Half-Yearly") additionalRate = 0.5;
    else if (premiumFrequency === "Monthly") additionalRate = 2;

    bonusRates.push(baseRate + additionalRate);
  }
};

const insuranceCalculator = (data) => {
  const {
    dob,
    gender,
    sumAssured,
    modalPremium,
    premiumFrequency,
    policyTerm,
    policyPaymentTerm,
  } = data;

  calculateBonusRate(dob, gender, premiumFrequency, policyTerm);

  let tableData = [];

  for (let i = 0; i < policyTerm; i++) {
    // let age = calculateAge(dob) + i;
    let bonusRate = bonusRates[i];
    let bonus = (sumAssured * bonusRate) / 100;
    let totalPremium = modalPremium * (i + 1);
    let totalBonus = bonus * (i + 1);
    let totalSumAssured = +sumAssured + +totalBonus;
    let totalPremiumPaid = totalPremium * (i + 1);
    // let totalBonusPaid = totalBonus * (i + 1);
    let totalSumAssuredPaid = totalSumAssured * (i + 1);

    tableData.push({
      policyYear: i + 1,
      premium: modalPremium,
      sumAssured: sumAssured,
      bonusRate: bonusRate,
      bonusAmount: bonus,
      totalBenefit: totalSumAssured,
      netCashFlows: +totalPremiumPaid - +totalSumAssuredPaid,
    });
  }
  // console.log("Hey!! WEDNESDAY");
  // console.log(tableData);
  return tableData;
};

export default insuranceCalculator;
