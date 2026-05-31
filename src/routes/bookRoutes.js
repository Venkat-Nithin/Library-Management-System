const express = require("express");

const {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
} = require("../controllers/bookController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management APIs
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_name:
 *                 type: string
 *               book_cat_id:
 *                 type: integer
 *               book_collection_id:
 *                 type: integer
 *               book_launch_date:
 *                 type: string
 *                 format: date
 *               book_publisher:
 *                 type: string
 *               book_author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 */
router.post("/", createBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/", getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 */
router.get("/:id", getBookById);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book updated successfully
 */
router.put("/:id", updateBook);

module.exports = router;