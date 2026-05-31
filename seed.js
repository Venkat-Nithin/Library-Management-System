require("dotenv").config();
const sequelize = require("./src/config/db");
const { Member, Membership, Category, Collection, Book, Issuance } = require("./src/models");

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Reset DB
        console.log("Database reset successfully.");

        // Categories
        const categories = await Category.bulkCreate([
            { cat_id: 1, cat_name: "Fiction", sub_cat_name: "Sci-Fi" },
            { cat_id: 2, cat_name: "Fiction", sub_cat_name: "Fantasy" },
            { cat_id: 3, cat_name: "Non-Fiction", sub_cat_name: "Biography" },
            { cat_id: 4, cat_name: "Educational", sub_cat_name: "Computer Science" },
        ]);

        // Collections
        const collections = await Collection.bulkCreate([
            { collection_id: 1, collection_name: "Main Library" },
            { collection_id: 2, collection_name: "Rare Books" },
            { collection_id: 3, collection_name: "New Arrivals" },
        ]);

        // Members
        const members = await Member.bulkCreate([
            { mem_name: "Alice Johnson", mem_phone: "1234567890", mem_email: "alice@example.com" },
            { mem_name: "Bob Smith", mem_phone: "0987654321", mem_email: "bob@example.com" },
            { mem_name: "Charlie Brown", mem_phone: "1112223333", mem_email: "charlie@example.com" },
            { mem_name: "Diana Prince", mem_phone: "4445556666", mem_email: "diana@example.com" }
        ]);

        // Memberships
        const memberships = await Membership.bulkCreate([
            { member_id: members[0].mem_id, status: "ACTIVE" },
            { member_id: members[1].mem_id, status: "ACTIVE" },
            { member_id: members[2].mem_id, status: "EXPIRED" },
            { member_id: members[3].mem_id, status: "ACTIVE" }
        ]);

        // Books
        const books = await Book.bulkCreate([
            {
                book_name: "Dune",
                book_cat_id: 1,
                book_collection_id: 1,
                book_launch_date: new Date("1965-08-01"),
                book_publisher: "Chilton Books",
                book_author: "Frank Herbert"
            },
            {
                book_name: "Clean Code",
                book_cat_id: 4,
                book_collection_id: 1,
                book_launch_date: new Date("2008-08-01"),
                book_publisher: "Prentice Hall",
                book_author: "Robert C. Martin"
            },
            {
                book_name: "The Hobbit",
                book_cat_id: 2,
                book_collection_id: 2,
                book_launch_date: new Date("1937-09-21"),
                book_publisher: "George Allen & Unwin",
                book_author: "J.R.R. Tolkien"
            },
            {
                book_name: "Steve Jobs",
                book_cat_id: 3,
                book_collection_id: 3,
                book_launch_date: new Date("2011-10-24"),
                book_publisher: "Simon & Schuster",
                book_author: "Walter Isaacson"
            },
            {
                book_name: "Never Borrowed Book",
                book_cat_id: 1,
                book_collection_id: 1,
                book_launch_date: new Date("2023-01-01"),
                book_publisher: "Unknown Publisher",
                book_author: "John Doe"
            }
        ]);

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Issuances
        const issuances = await Issuance.bulkCreate([
            {
                book_id: books[0].book_id,
                issuance_date: new Date("2023-10-01"),
                issuance_member: members[0].mem_id,
                issued_by: "Admin",
                target_return_date: new Date("2023-10-15"),
                issuance_status: "RETURNED"
            },
            {
                book_id: books[0].book_id,
                issuance_date: new Date("2023-11-01"),
                issuance_member: members[1].mem_id,
                issued_by: "Admin",
                target_return_date: new Date("2023-11-15"),
                issuance_status: "ISSUED" // pending return
            },
            {
                book_id: books[1].book_id,
                issuance_date: yesterday,
                issuance_member: members[0].mem_id,
                issued_by: "Admin",
                target_return_date: tomorrow,
                issuance_status: "ISSUED" // pending return
            },
            {
                book_id: books[2].book_id,
                issuance_date: new Date("2023-09-01"),
                issuance_member: members[2].mem_id,
                issued_by: "Admin",
                target_return_date: new Date("2023-09-15"),
                issuance_status: "RETURNED"
            }
        ]);

        console.log("Database seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
