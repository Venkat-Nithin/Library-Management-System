const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Membership = sequelize.define(
    "Membership",
    {
        membership_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "membership",
        timestamps: false,
    }
);

module.exports = Membership;