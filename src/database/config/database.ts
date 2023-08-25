import { Options } from "sequelize";

const config: Options = {
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: "mysql",
  host: process.env.DB_HOST,
}

module.exports = config;