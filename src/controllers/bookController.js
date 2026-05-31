const { Book } = require("../models");

/*
  CREATE BOOK
*/
const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);

        res.status(201).json({
            success: true,
            data: book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
  GET ALL BOOKS
*/
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();

        res.status(200).json({
            success: true,
            data: books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
  GET BOOK BY ID
*/
const getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.status(200).json({
            success: true,
            data: book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
  UPDATE BOOK
*/
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        await book.update(req.body);

        res.status(200).json({
            success: true,
            data: book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
};