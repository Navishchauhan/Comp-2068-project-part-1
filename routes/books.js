const { new: _new, index, show, create, edit, update, delete: _delete } = require('../controllers/BooksController');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

module.exports = router => {
  router.get('/books', index); // public
  router.get('/books/new', auth, _new); // authenticated
  router.post('/books', auth, create);  // authenticated
  router.post('/books/update', auth, update);  // authenticated
  router.post('/books/delete', auth, _delete);  // authenticated
  router.get('/books/:id/edit', auth, edit);  // authenticated
  router.get('/books/:id', show); // public
};