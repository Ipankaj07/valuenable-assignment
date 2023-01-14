const fields = ["name", "email", "mobile", "password"];

const credentialFields = async (req, res, next) => {
  try {
    const errors = {};

    if (req.path === "/login") {
      fields.splice(0, 2);
    }

    fields.forEach((field) => {
      if (!req.body[field]) {
        errors[field] = `${field} is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    if (req.body.mobile && !/^\d{10}$/.test(req.body.mobile)) {
      errors.mobile = "Invalid mobile number, must be in 10 digits";
    }

    if (
      req.body.email &&
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (
      req.body.password &&
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        req.body.password
      )
    ) {
      errors.password = `Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number, and one special character`;
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = credentialFields;
