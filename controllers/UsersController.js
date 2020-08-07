const User = require('../models/User');
const viewPath = 'users';

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New User'
  });
};

exports.create = async (req, res) => {
  try {
    const user = new User(req.body);
    await User.register(user, req.body.password);

    req.flash('success', `Welcome, ${user.fullname}. Thank you for registering.`);
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    req.flash('danger', error.message);
    req.session.formData = req.body;
    res.redirect(`/register`);
  }
};