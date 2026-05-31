const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library Management API",
            version: "1.0.0",
            description: "Library Management System API Documentation",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-api-key",
                },
            },
        },
        security: [
            {
                ApiKeyAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;