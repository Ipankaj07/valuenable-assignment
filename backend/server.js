require("dotenv").config();
const connect = require("./configs/db");
const app = require("./index");

const port = process.env.PORT || 8080;

app.listen(port, async () => {
  await connect();
  console.log("server running on port " + port);
});
