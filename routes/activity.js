const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/blogs/user/activity', (req, res) => {
    Post.find({}, (err, allPosts) => {
        if(err){
            throw new Error('Could not find Post')
        }
        res.render('activity', {posts: allPosts})
    })
})

module.exports = router;