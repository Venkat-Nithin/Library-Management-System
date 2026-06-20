const express = require("express");

const {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Member management APIs
 */

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mem_name:
 *                 type: string
 *               mem_phone:
 *                 type: string
 *               mem_email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member created successfully
 */
router.post("/", createMember);

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of members
 */
router.get("/", getAllMembers);

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Get member by ID
 *     tags: [Members]
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
 *         description: Member details
 *       404:
 *         description: Member not found
 */
router.get("/:id", getMemberById);

/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Update a member
 *     tags: [Members]
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
 *               mem_name:
 *                 type: string
 *                 example: Alice Johnson
 *               mem_phone:
 *                 type: string
 *                 example: "9999999999"
 *               mem_email:
 *                 type: string
 *                 example: alice@example.com
 *     responses:
 *       200:
 *         description: Member updated successfully
 */
router.put("/:id", updateMember);

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Delete a member
 *     tags: [Members]
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
 *         description: Member deleted successfully
 */
router.delete("/:id", deleteMember);

module.exports = router;