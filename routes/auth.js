const express = require('express');
const router = express.Router();
const passport  = require('passport');
const Post = require('../models/post');


//====include user model===//
const User = require('../models/user')

const authController = require('../controllers/authController')


//Authentication
//User roles -Pages allowed for view
const isUserAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect('/recolon/accounts/login')
}


//======landing page===//
router.get('/', (req, res) => {
   Post.find({})
   .sort({created: -1})
   .limit(10)
   .exec((err, post) => {
       if(err){
           throw new Error('Nothing In Database')
       }
       res.render('index.ejs', {posts: post});
   })
})
//create a new user
router.get('/recolon/accounts/register', authController.create_user_form);

//Submit a POST request to the server to create new user
router.post('/recolon/accounts/register', authController.create_user);

//
router.get('/recolon/accounts/login', authController.login_user_form);

router.post('/recolon/accounts/login', passport.authenticate('local', {
    successRedirect: '/recolon/auth/user/index/feed',
    failureRedirect: '/recolon/accounts/login',
    failureMessage: 'An error occurred'
}), function(req, res){})

//logout current user
router.get('/recolon/accounts/logout', authController.user_logout);

module.exports = router;