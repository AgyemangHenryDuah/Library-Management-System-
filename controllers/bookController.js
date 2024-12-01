const bookModel = require('../models/bookModel')

exports.listBooks = async (req, res) => {
    const books = await bookModel.getAllBooks()
    res.render('librarian/books', { books })
}

exports.showAddForm = async (req, res) => {
    const categories = await bookModel.getAllCategories()
    const authors = await bookModel.getAllAuthors()
    console.log(categories)
    console.log(authors)
    res.render('librarian/newBook', { 
        categories: categories, 
        authors: authors, })
}

exports.addBook = async (req, res) => {
    console.log(req.body)
    await bookModel.addBook(req.body)
    res.redirect('/')
}

exports.showEditForm = async (req, res) => {
    const book = await bookModel.getBookById(req.params.id)
    const categories = await bookModel.getAllCategories()
    const authors = await bookModel.getAllAuthors()
    res.render('librarian/editBook', { book, categories, authors })
}

exports.editBook = async (req, res) => {
    try {
        await bookModel.updateBook(req.params.id, req.body)
        console.log(req.params.id)
        res.redirect('/')
    } catch (err) {
        res.status(500).send('Error editing book')
    }
}

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id
    await bookModel.deleteBook(bookId) 
    res.redirect("/") 
  } catch (err) {
    console.error(err)
    res.status(500).send("Error deleting book")
  }
}
