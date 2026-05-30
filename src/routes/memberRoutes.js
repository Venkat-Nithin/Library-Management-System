const express = require("express");

const {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
} = require("../controllers/memberController");

const router = express.Router();

/*
  CREATE MEMBER
*/
router.post("/", createMember);

/*
  GET ALL MEMBERS
*/
router.get("/", getAllMembers);

/*
  GET MEMBER BY ID
*/
router.get("/:id", getMemberById);

/*
  UPDATE MEMBER
*/
router.put("/:id", updateMember);

module.exports = router;