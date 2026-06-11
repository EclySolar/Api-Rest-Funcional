const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Produtos",
      version: "1.0.0",
      description: "Documentação da API"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: [
    "./routes/authRoutes.js",
    "./routes/productRoutes.js"
  ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;