const express = require("express");

const {
    createIssuance,
    getAllIssuances,
    getIssuanceById,
    updateIssuance,
    returnBook,
} = require("../controllers/issuanceController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Issuances
 *   description: Book issuance management APIs
 */

/**
 * @swagger
 * /issuances:
 *   post:
 *     summary: Create a new issuance
 *     tags: [Issuances]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_id:
 *                 type: integer
 *               issuance_member:
 *                 type: integer
 *               issued_by:
 *                 type: string
 *               issuance_status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Issuance created successfully
 */
router.post("/", createIssuance);

/**
 * @swagger
 * /issuances:
 *   get:
 *     summary: Get all issuances
 *     tags: [Issuances]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of issuances
 */
router.get("/", getAllIssuances);

/**
 * @swagger
 * /issuances/{id}:
 *   get:
 *     summary: Get issuance by ID
 *     tags: [Issuances]
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
 *         description: Issuance details
 *       404:
 *         description: Issuance not found
 */
router.get("/:id", getIssuanceById);

/**
 * @swagger
 * /issuances/{id}:
 *   put:
 *     summary: Update an issuance
 *     tags: [Issuances]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_id:
 *                 type: integer
 *               issuance_member:
 *                 type: integer
 *               issued_by:
 *                 type: string
 *               issuance_status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Issuance updated successfully
 */
router.put("/:id", updateIssuance);

/**
 * @swagger
 * /issuances/{id}/return:
 *   put:
 *     summary: Return an issued book
 *     tags: [Issuances]
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
 *         description: Book returned successfully
 */
router.put("/:id/return", returnBook);

module.exports = router;