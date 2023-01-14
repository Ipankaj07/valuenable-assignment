const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const userRouter = require("./routes/user.route");
const policyRouter = require("./routes/policy.route");

app.get("/", (_, res) => {
  res.send("Hello World!!! This is the backend server.");
});

app.use("/users", userRouter);
app.use("/policies", policyRouter);

module.exports = app;
