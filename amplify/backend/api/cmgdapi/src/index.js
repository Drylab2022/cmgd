const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const port = process.env.PORT || 5001;
if (process.env.ENV === "PROD") {
  require("dotenv").config({ path: ".env.prod" });
}
//const models = require("./models");
const indexRouter = require("./routes/index");

// Database connection
const sequelize = require("./config/database");

// Test db connection
sequelize
  .authenticate()
  .then(() => console.log("connected"))
  .catch((err) => console.log("Err" + err));
sequelize.sync({ force: true });

const app = express();

app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

app.use("/", indexRouter);

app.listen(port, () => {
  console.log("Example app listening at http://localhost:" + port);
});
