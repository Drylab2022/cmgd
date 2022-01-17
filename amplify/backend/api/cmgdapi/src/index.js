const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const port = process.env.PORT || 5000;
//const models = require("./models");
const indexRouter = require("./routes/index");

// Database connection
const sequelize = require("./config/database");

// Test db connection
sequelize
  .authenticate()
  .then(() => console.log("connected"))
  .catch((err) => console.log("Err" + err));
//sequelize.sync({ force: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", indexRouter);

app.listen(port, () => {
  console.log("Example app listening at http://localhost:" + port);
});
