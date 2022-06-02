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
// sequelize.sync({ force: true });

const app = express();

// Set up swagger-jsdoc
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Metagenomic Data Curation API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        // cmgdapiAuthorizer: {
        //   type: "oauth2",
        //   description: "For more information, see https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-userpools-server-contract-reference.html",
        //   flows: {
        //     authorizationCode: {
        //       authorizationUrl: "https://cmgdtest.auth.us-east-1.amazoncognito.com/oauth2/authorize",
        //       tokenUrl: "https://cmgdtest.auth.us-east-1.amazoncognito.com/oauth2/token",
        //       scopes: {
        //         Reviewer: "reviewer",
        //         Curator: "curator"
        //       }
        //     }
        //   }
        // },
        Oauth2: {
          type: "http",
          scheme: "bearer"
        }
      }
    }
  },
  apis: ["./routes/*.js"], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

// Set up swagger-ui-express
const swaggerUi = require("swagger-ui-express");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

app.use("/", indexRouter);

app.listen(port, () => {
  console.log("Example app listening at http://localhost:" + port);
});
