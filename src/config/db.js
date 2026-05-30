const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "library_management",
    "library_user",
    "library123",
    {
        host: "localhost",
        dialect: "postgres",
        logging: false,
    }
);

module.exports = sequelize;