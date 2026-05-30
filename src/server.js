const express = require("express");
const sequelize = require("./config/db");
const Member = require("./models/Member");
const memberRoutes = require("./routes/memberRoutes");

require("./models");

const app = express();

app.use(express.json());

app.use("/members", memberRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Library Management API Running",
    });
});

const PORT = 5000;

sequelize
    .authenticate()
    .then(async () => {
        console.log("Database Connected");

        await sequelize.sync();

        console.log("Tables Synced");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });
