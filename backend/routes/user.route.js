const { Router } = require("express");
const bcrypt = require("bcrypt");

const UserModel = require("../models/user.model");
const credentialFields = require("../middlewares/credential.middleware");

const userRouter = Router();

userRouter.post("/create", credentialFields, async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const user = await UserModel.findOne({
      $or: [{ mobile }, { email }],
    });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "error in bcrypt - create" });
      } else {
        const user = await UserModel.create({
          name,
          email,
          mobile,
          password: hash,
        });
        res.json({
          message: "User created successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/login", credentialFields, async (req, res) => {
  try {
    const user = await UserModel.findOne({
      mobile: req.body.mobile,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      if (result) {
        return res
          .cookie("token", user._id.toString(), { httpOnly: true })
          .json({
            message: "Authentication successful",
            name: user.name,
          });
      }
      res.status(401).json({ error: "Authentication failed" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRouter;
