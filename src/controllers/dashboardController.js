const sequelize = require("../config/db");

const getOutstandingBooks = async (req, res) => {
    try {
        const [results] = await sequelize.query(`
      SELECT
        m.mem_name AS member_name,
        b.book_name,
        b.book_author,
        i.issuance_date,
        i.target_return_date
      FROM issuance i
      JOIN member m
        ON i.issuance_member = m.mem_id
      JOIN book b
        ON i.book_id = b.book_id
      WHERE i.issuance_status = 'ISSUED'
    `);

        res.status(200).json({
            success: true,
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getNeverBorrowedBooks = async (req, res) => {
    try {
        const [results] = await sequelize.query(`
      SELECT
        b.book_name,
        b.book_publisher,
        b.book_author
      FROM book b
      LEFT JOIN issuance i
        ON b.book_id = i.book_id
      WHERE i.book_id IS NULL
    `);

        res.status(200).json({
            success: true,
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getTopBorrowedBooks = async (req, res) => {
    try {
        const [results] = await sequelize.query(`
      SELECT
        b.book_name,
        COUNT(i.issuance_id) AS times_borrowed,
        COUNT(DISTINCT i.issuance_member) AS members_borrowed
      FROM book b
      JOIN issuance i
        ON b.book_id = i.book_id
      GROUP BY b.book_id, b.book_name
      ORDER BY times_borrowed DESC
      LIMIT 10
    `);

        res.status(200).json({
            success: true,
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getOutstandingBooks,
    getNeverBorrowedBooks,
    getTopBorrowedBooks,
};