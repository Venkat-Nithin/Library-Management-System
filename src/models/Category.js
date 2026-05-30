const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define(
    "Category",
    {
        cat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cat_name: {
            type: DataTypes.STRING,
        },
        sub_cat_name: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "category",
        timestamps: false,
    }
);

module.exports = Category;