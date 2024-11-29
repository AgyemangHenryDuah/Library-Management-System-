exports.validateBook = (req, res, next) => {
    const { title, publication_date, copies_owned } = req.body;

    console.log(`${title}, ${publication_date}, ${copies_owned}`);

    // Check if required fields are provided
    if (!title || !publication_date || !copies_owned) {
        return res.status(400).send('Title, publication date, and available copies are required');
    }

    // Check if `copies_owned` is a valid positive number
    if (isNaN(copies_owned) || copies_owned <= 0) {
        return res.status(400).send('Available copies must be a positive number');
    }

    // Check if `publication_date` is a valid date
    if (isNaN(new Date(publication_date).getTime())) {
        return res.status(400).send('Invalid publication date');
    }

    next();
};
