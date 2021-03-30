const express = require('express');
const router = express.Router();

//====include post and comments model===//
const Post = require('../models/post');
const Comment = require('../models/comment');

//Authentication
//User roles -Pages allowed for view
const isUserAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/recolon/accounts/login')
}

//====Create a comment and post it to a particular post articles===//
router.post('/recolon/:id', function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(!foundPost)  {throw new Error("Post not found to post comment to..")}
        const text = req.body.text;
        const newComment = {text: text}

        Comment.create(newComment, function(err, comment){
            if(err) {throw new Error('Could not create a new comment')}
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;

            comment.save();
            foundPost.comments.push(comment);
            foundPost.save();

            res.redirect('/recolon/' + req.params.id);
        })
    })
})












/*

//====add a comment===//
router.get('/blogs/:id/comments/new', function(req, res){
    Post.findById(req. params.id, function(err, post){
        if(err) {console.log(err)}
        else{
            res.render('comment/new', {post: post})
        }
    })
})

router.post('/blogs/:id/comments', function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err) {console.log(err)}
        else{
            const text = req.body.text;

            const newComment = {text: text}
            Comment.create(newComment, function(err, comment){
                if(err) {console.log(err)}
                else{

                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save(); 
                    //save comment
                    post.comments.push(comment)
                    post.save()
                    res.redirect('/blogs/' + post.id)
                }
            })
        }
    })
})

//===edit comment===//
router.get('/blogs/:id/comments/:comments_id/edit', function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err) {console.log(err)}
        else{
            Comment.findById(req.params.id, function(err, foundComment){
                if(err) {console.log(err)}
                else{
                    res.render('comment/edit', {post: foundPost, comment: foundComment})
                }
            })
        }
    })
})*/

module.exports = router;
