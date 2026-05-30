const { Member } = require("../models");

/*
  CREATE MEMBER
*/
const createMember = async (req, res) => {
    try {
        const member = await Member.create(req.body);

        res.status(201).json({
            success: true,
            data: member,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
  GET ALL MEMBERS
*/
const getAllMembers = async (req, res) => {
    try {
        const members = await Member.findAll();

        res.status(200).json({
            success: true,
            data: members,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
  GET MEMBER BY ID
*/
const getMemberById = async (req, res) => {
    try {
        const member = await Member.findByPk(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found",
            });
        }

        res.status(200).json({
            success: true,
            data: member,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
  UPDATE MEMBER
*/
const updateMember = async (req, res) => {
    try {
        const member = await Member.findByPk(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found",
            });
        }

        await member.update(req.body);

        res.status(200).json({
            success: true,
            data: member,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
};