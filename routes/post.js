const express = require('express');
const router = express.Router();

//===include post model==//
const Post = require('../models/post')

//include post controller
const postController = require('../controllers/postController');

//check for authentication middleware
const isUserAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You do not have permission to do that. Please login or Register to get access")
    res.redirect('/recolon/accounts/login')
}

//validate post author
const authorValidation = (req, res, next) => { 
    //check if user is logged in
    if(req.isAuthenticated)   {
        //render the show page of the post
        Post.findById(req.params.id, function(err, foundPost){
            if(err){
                console.log(err)
                req.flash("error", "Database Error: Post not found")
                res.redirect('back')
            }else{
                //does post belong to user?
               if(foundPost.author.id.equals(req.user._id)) {next()}
               //not authorized
               else {
                   req.flash("error", "Access denied. You do not own this content"); 
                   res.redirect('back')
                }
            }
        })

    }
    //You need to log in to view edit page
    else{
        req.flash("error", "You do not have permission to do that. Please login or Register to get access")
        res.redirect('back');
    }
  
}



//===new created user==//
router.get('/recolon/auth/index', isUserAuthenticated, postController.new_user);

//===user feed===//
router.get('/recolon/auth/user/index/feed', isUserAuthenticated, postController.user_feed);
//======User add new post====//
router.get('/recolon/new', isUserAuthenticated, postController.create_post_form);

//Submit a POST request to the server
router.post('/recolon/new', isUserAuthenticated, postController.create_post);

//=====show page route===//
router.get('/recolon/:id', isUserAuthenticated, postController.show_page);

//=====Edit post page route====//
router.get('/recolon/:id/edit', isUserAuthenticated, authorValidation, postController.edit_post);


//Submit a PUT request to the server
router.put('/recolon/:id', isUserAuthenticated, authorValidation, postController.update_post);

//Submit a DELETE request to the server
router.delete('/recolon/:id', isUserAuthenticated, authorValidation, postController.delete_post);

module.exports = router;