const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Member = sequelize.define(
    "Member",
    {
        mem_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        mem_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mem_phone: {
            type: DataTypes.STRING,
        },
        mem_email: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "member",
        timestamps: false,
    }
);

module.exports = Member;