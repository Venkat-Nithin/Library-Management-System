const express = require("express");

const {
    getOutstandingBooks,
    getNeverBorrowedBooks,
    getTopBorrowedBooks,
} = require("../controllers/dashboardController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard metrics and reporting APIs
 */

/**
 * @swagger
 * /dashboard/outstanding-books:
 *   get:
 *     summary: Get outstanding books
 *     tags: [Dashboard]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of outstanding books
 */
router.get("/outstanding-books", getOutstandingBooks);

/**
 * @swagger
 * /dashboard/never-borrowed-books:
 *   get:
 *     summary: Get books that have never been borrowed
 *     tags: [Dashboard]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of never borrowed books
 */
router.get("/never-borrowed-books", getNeverBorrowedBooks);

/**
 * @swagger
 * /dashboard/top-borrowed-books:
 *   get:
 *     summary: Get top 10 most borrowed books
 *     tags: [Dashboard]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of top 10 borrowed books
 */
router.get("/top-borrowed-books", getTopBorrowedBooks);

module.exports = router;