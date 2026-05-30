const Member = require("./Member");
const Membership = require("./Membership");
const Category = require("./Category");
const Collection = require("./Collection");
const Book = require("./Book");
const Issuance = require("./Issuance");

/*
  MEMBER ↔ MEMBERSHIP
*/
Member.hasMany(Membership, {
    foreignKey: "member_id",
});

Membership.belongsTo(Member, {
    foreignKey: "member_id",
});

/*
  MEMBER ↔ ISSUANCE
*/
Member.hasMany(Issuance, {
    foreignKey: "issuance_member",
});

Issuance.belongsTo(Member, {
    foreignKey: "issuance_member",
});

/*
  BOOK ↔ ISSUANCE
*/
Book.hasMany(Issuance, {
    foreignKey: "book_id",
});

Issuance.belongsTo(Book, {
    foreignKey: "book_id",
});

/*
  CATEGORY ↔ BOOK
*/
Category.hasMany(Book, {
    foreignKey: "book_cat_id",
});

Book.belongsTo(Category, {
    foreignKey: "book_cat_id",
});

/*
  COLLECTION ↔ BOOK
*/
Collection.hasMany(Book, {
    foreignKey: "book_collection_id",
});

Book.belongsTo(Collection, {
    foreignKey: "book_collection_id",
});

module.exports = {
    Member,
    Membership,
    Category,
    Collection,
    Book,
    Issuance,
};