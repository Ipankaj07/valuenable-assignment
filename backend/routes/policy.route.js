const { Router } = require("express");

const PolicyModel = require("../models/policy.model");
const validatePolicy = require("../middlewares/validatePolicy.middleware");

const policyRouter = Router();

policyRouter.get("/", async (req, res) => {
  try {
    const policies = await PolicyModel.find();
    res.json({ policies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

policyRouter.post("/", validatePolicy, async (req, res) => {
  try {
    const policy = await PolicyModel.create(req.body);
    res.json({ policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

policyRouter.get("/:id", async (req, res) => {
  try {
    const policy = await PolicyModel.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ error: "Policy not found" });
    }
    res.json({ policy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = policyRouter;
