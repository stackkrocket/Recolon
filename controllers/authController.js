const passport = require('passport');
const User = require('../models/user');

//Display the Register form
exports.create_user_form = (req, res, next) => {
    res.render('register')
}

//Fetch data from input and create user in database
exports.create_user = (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        lastName: req.body.lastName,
        email:    req.body.email
    })

    User.register(newUser, req.body.password, function(err, user){
        if(err) {
          console.log(err)
          throw err;
        }
        passport.authenticate('local')(req, res, function(){
            console.log(user)
            req.flash("success", "Welcome" + "," + req.user.username )
            res.redirect('/recolon/auth/index')
        })
    })
}

//login an existing user - form
exports.login_user_form = (req, res, next) => {
    res.render('login');
}

//logout user
exports.user_logout = (req, res, next) => {
    req.logout();
    res.redirect('/')
}