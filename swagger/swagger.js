const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Loja",
      version: "2.0.0",
      description: "Documentação da API utilizando MySQL"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
apis: [
  "./routes/authRoutes.js",
  "./routes/categoriaRoutes.js",
  "./routes/productRoutes.js",
  "./routes/clientRoutes.js",
  "./routes/orderRoutes.js"
]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;