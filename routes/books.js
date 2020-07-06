const { new: _new, index, show, create, edit, update, delete: _delete } = require('../controllers/BooksController');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

module.exports = router => {
  router.get('/books', index);  
  router.get('/books/new', auth, _new);  
  router.post('/books', auth, create);   
  router.post('/books/update', auth, update);   
  router.post('/books/delete', auth, _delete);  
  router.get('/books/:id/edit', auth, edit);   
  router.get('/books/:id', show); 
};