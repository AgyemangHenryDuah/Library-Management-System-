const express = require("express")
const router = express.Router()
const booksController = require("../controllers/bookController")
const validation = require("../middlewares/validation")

router.get("/", booksController.listBooks)

router.get("/add", booksController.showAddForm)
router.post("/add", validation.validateBook, booksController.addBook)

router.get("/edit/:id", booksController.showEditForm)
router.post("/edit/:id", validation.validateBook, booksController.editBook)

router.post("/delete/:id", booksController.deleteBook)

module.exports = router
