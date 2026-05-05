const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getProducts);
router.post("/:id/update", updateProduct);
router.post("/:id/delete", deleteProduct);

module.exports = router;