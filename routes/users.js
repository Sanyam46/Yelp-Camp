const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../Utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

// Assuming you have something like this in your users.js file
router.get('/logout', function(req, res) {
    req.logout(function(err) {
      if (err) {
        // Handle the error, for example, by sending an error response
        res.status(500).json({ error: 'Logout failed' });
      } else {
        // Handle successful logout, for example, by redirecting to another page
        res.redirect('/'); // Redirect to the home page or any other page you prefer
      }
    });
  });
  
module.exports = router;