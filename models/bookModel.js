const db = require('../database/db')


exports.getAllCategories = async () => {
    const query = 'SELECT * FROM category'
    const [rows] = await db.query(query)
    return rows
}

exports.getAllAuthors = async () => {
    const query = 'SELECT * FROM author'
    const [rows] = await db.query(query)
    return rows
}


// Fetch all books
exports.getAllBooks = async (req,res) => {
    const rows = await db.query(`
            SELECT book.id, book.title, book.publication_date, book.copies_owned, category_name AS category_name 
            FROM book
            LEFT JOIN category ON book.category_id = category.id`)
    // console.log(rows[0])
    return rows[0]
}

exports.addBook = async (book) => {
    const { title, category_id, author_id, publication_date, copies_owned } = book

    const [result] = await db.execute(`
        INSERT INTO book (title, category_id, publication_date, copies_owned) 
        VALUES (?, ?, ?, ?)`, 
        [title, category_id, publication_date, copies_owned]
    )

    const bookId = result.insertId
    console.log(bookId)

    for (const authorId of author_id) {
        await db.execute(`
            INSERT INTO book_author (book_id, author_id) 
            VALUES (?, ?)`, 
            [bookId, authorId]
        )
    }
}

exports.getBookById = async (bookId) => {
    const [bookResult] = await db.execute(`
        SELECT * FROM book WHERE id = ?
    `, [bookId])

    const [authorsResult] = await db.execute(`
        SELECT author_id FROM book_author WHERE book_id = ?
    `, [bookId])

    const author_ids = authorsResult.map((row) => row.author_id)

    return { ...bookResult[0], author_ids }
}

exports.updateBook = async (id, book) => {
  const { title, category_id, author_ids, publication_date, copies_owned } =
    book;

  console.log({
    title,
    category_id,
    publication_date,
    copies_owned,
    author_ids,
    id,
  });

  await db.execute(
    `
        UPDATE book
        SET title = ?, category_id = ?, publication_date = ?, copies_owned = ?
        WHERE id = ?
        `,
    [title, category_id, publication_date, copies_owned, id]
  );

  await db.execute(`DELETE FROM book_author WHERE book_id = ?`, [id]);

  if (Array.isArray(author_ids) && author_ids.length > 0) {
    for (const authorId of author_ids) {
      await db.execute(
        `
                INSERT INTO book_author (book_id, author_id)
                VALUES (?, ?)
                `,
        [id, authorId]
      );
    }
  }
};


exports.deleteBook = async (id) => {
    await db.execute(`DELETE FROM book_author WHERE book_id = ?`, [id])
    await db.execute(`DELETE FROM book WHERE id = ?`, [id])
}
