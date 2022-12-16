const express = require("express");
const router = express.Router();

// controller that required
const bookController = require("../controllers/book.controller");

// routes that availabel
router.post("/inputNewBook", bookController.inputNewBook);
router.get("/checkAllBook", bookController.checkAllBook);
router.get("/checkBookDetail", bookController.checkBookDetail);
router.put("/updateBookDetail", bookController.updateBookDetail);
router.delete("/deleteBook", bookController.deleteBook);
router.get(
  "/checkBookDetailWithRegex",
  bookController.checkBookDetailWithRegex
);

module.exports = router;
