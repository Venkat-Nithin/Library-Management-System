const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Issuance = sequelize.define(
    "Issuance",
    {
        issuance_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        issuance_date: {
            type: DataTypes.DATE,
        },
        issuance_member: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        issued_by: {
            type: DataTypes.STRING,
        },
        target_return_date: {
            type: DataTypes.DATE,
        },
        issuance_status: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "issuance",
        timestamps: false,
    }
);

module.exports = Issuance;