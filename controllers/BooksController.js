const viewPath = 'books';
const Book = require('../models/book');
const User = require('../models/user');

exports.index = async (req, res) => {
  try {
    const books = await Book
      .find()
      .populate('user')
      .sort({updatedAt: 'desc'});

    res.render(`${viewPath}/index`, {
      pageTitle: 'Uploaded',
      books: books
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying the uploaded books: ${error}`);
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('user');
    console.log(book);
    res.render(`${viewPath}/show`, {
      pageTitle: book.title,
      book: book
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying this book: ${error}`);
    res.redirect('/');
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Book'
  });
};

exports.create = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    console.log('User', user);
    const book = await Book.create({user: user._id, ...req.body});

    req.flash('success', 'Book created successfully');
    res.redirect(`/books/${book.id}`);
  } catch (error) {
    req.flash('danger', `There was an error creating this book: ${error}`);
    req.session.formData = req.body;
    res.redirect('/books/new');
  }
};

exports.edit = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: book.title,
      formData: book
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this book: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let book = await Book.findById(req.body.id);
    if (!book) throw new Error('Book could not be found');

    const attributes = {user: user._id, ...req.body};
    await Book.validate(attributes);
    await Book.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The book was updated successfully');
    res.redirect(`/books/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this book: ${error}`);
    res.redirect(`/books/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await Book.deleteOne({_id: req.body.id});
    req.flash('success', 'The book was deleted successfully');
    res.redirect(`/books`);
  } catch (error) {
    req.flash('danger', `There was an error deleting this book: ${error}`);
    res.redirect(`/books`);
  }
};