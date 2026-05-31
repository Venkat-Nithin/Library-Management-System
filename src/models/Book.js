const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Book = sequelize.define(
    "Book",
    {
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        book_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        book_cat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        book_collection_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        book_launch_date: {
            type: DataTypes.DATE,
        },
        book_publisher: {
            type: DataTypes.STRING,
        },
        book_author: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "book",
        timestamps: false,
    }
);

module.exports = Book;