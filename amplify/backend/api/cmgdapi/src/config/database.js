const user = process.env.DB_USER || "postgres";
const host = process.env.DB_HOST || "localhost";
const database = process.env.DB_NAME || "cmgd";
const password = process.env.DB_PWD || "docker";
const port = process.env.DB_PORT || 5432;

// const user = process.env.DB_USER || "drylab";
// const host =
//   process.env.DB_HOST ||
//   "cmgd-dev-cluster.cluster-cjxzpipgg2mq.us-east-1.rds.amazonaws.com";
// const database = process.env.DB_NAME || "cmgd";
// const password = process.env.DB_PWD || "wq890820";
// const port = process.env.DB_PORT || 5432;

const { Op, Sequelize } = require("sequelize");
module.exports = new Sequelize(database, user, password, {
    host: host,
    dialect: "postgres",
    define: {
        freezeTableName: true,
    },
    operatorsAliases: {
        gt: Op.gt,
        lt: Op.lt,
        gte: Op.gte,
        lte: Op.lte,
        ne: Op.ne,
        and: Op.and,
        or: Op.or,
        in: Op.in,
        contains: Op.contains,
        contained: Op.contained,
        like: Op.like,
    },
});
