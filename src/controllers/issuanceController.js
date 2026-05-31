const { Issuance, Member, Book } = require("../models");

/*
  CREATE ISSUANCE
*/
const createIssuance = async (req, res) => {
    try {
        const { book_id, issuance_member } = req.body;

        const member = await Member.findByPk(issuance_member);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found",
            });
        }

        const book = await Book.findByPk(book_id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        const activeIssuance = await Issuance.findOne({
            where: {
                book_id,
                issuance_status: "ISSUED",
            },
        });

        if (activeIssuance) {
            return res.status(400).json({
                success: false,
                message: "Book is already issued",
            });
        }

        const issuance = await Issuance.create(req.body);

        res.status(201).json({
            success: true,
            data: issuance,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
  GET ALL ISSUANCES
*/
const getAllIssuances = async (req, res) => {
    try {
        const issuances = await Issuance.findAll();

        res.status(200).json({
            success: true,
            data: issuances,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
  GET ISSUANCE BY ID
*/
const getIssuanceById = async (req, res) => {
    try {
        const issuance = await Issuance.findByPk(req.params.id);

        if (!issuance) {
            return res.status(404).json({
                success: false,
                message: "Issuance not found",
            });
        }

        res.status(200).json({
            success: true,
            data: issuance,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
  UPDATE ISSUANCE
*/
const updateIssuance = async (req, res) => {
    try {
        const issuance = await Issuance.findByPk(req.params.id);

        if (!issuance) {
            return res.status(404).json({
                success: false,
                message: "Issuance not found",
            });
        }

        await issuance.update(req.body);

        res.status(200).json({
            success: true,
            data: issuance,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const returnBook = async (req, res) => {
    try {
        const issuance = await Issuance.findByPk(req.params.id);

        if (!issuance) {
            return res.status(404).json({
                success: false,
                message: "Issuance record not found",
            });
        }

        if (issuance.issuance_status === "RETURNED") {
            return res.status(400).json({
                success: false,
                message: "Book already returned",
            });
        }

        issuance.issuance_status = "RETURNED";

        await issuance.save();

        res.status(200).json({
            success: true,
            message: "Book returned successfully",
            data: issuance,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createIssuance,
    getAllIssuances,
    getIssuanceById,
    updateIssuance,
    returnBook,
};