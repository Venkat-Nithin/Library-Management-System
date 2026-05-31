require("dotenv").config();

const express = require("express");
const path = require("path");
const sequelize = require("./config/db");
const Member = require("./models/Member");
const memberRoutes = require("./routes/memberRoutes");
const bookRoutes = require("./routes/bookRoutes");
const issuanceRoutes = require("./routes/issuanceRoutes");
const apiKeyAuth = require("./middleware/apiKeyAuth");
const dashboardRoutes = require("./routes/dashboardRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

require("./models");

const app = express();

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Serve static files for UI dashboard
app.use("/ui", express.static(path.join(__dirname, "../public")));

app.use(apiKeyAuth);

app.use("/members", memberRoutes);
app.use("/books", bookRoutes);
app.use("/issuances", issuanceRoutes);
app.use("/dashboard", dashboardRoutes);

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
