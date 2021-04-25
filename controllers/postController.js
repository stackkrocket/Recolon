const Post = require('../models/post')
const multer = require('multer');

// Define disk storage for multer
const storage = multer.diskStorage({
    //File destination
    destination: function(req, file, callback){
        callback(null, './public/uploads/images')
    },
    /*By default, multer strips off file extension.  
    This code block adds back the file's original extension
    */
   filename: function(req, file, callback){
    callback(null, Date.now() + file.originalname);
   }
})
//

//Uploads for multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    }
})

//error code
const errFunc = () =>{
    const err = new Error('Posts not found');
    err.status = 404;
    throw err;
}

//Shw this page when a user newly creates an account
exports.new_user = (req, res, next) => {
    console.log(req.user)
    res.render('auth/index')
}

//All users posts feed
exports.user_feed = (req, res, next) => {
    Post.find({})
    .sort({created: -1})
    .exec((err, allPost) => {
        if(err) {
           errFunc();
        }
        res.render('auth/user/feed', {posts: allPost})
    })
}

//Display form for new post
exports.create_post_form = (req, res, next) => {
    res.render('new.ejs');
}

//Fetch input from form and create post
exports.create_post = (req, res, next) => {
    const title = req.body.title;
    const image = req.file.filename;
    const content = req.body.content;
    const author = {id: req.user._id, username: req.user.username, lastName: req.user.lastName}

    const newPost = {title: title, image: image, content: content, author: author}

    Post.create(newPost, (err, newPost) => {
        if(err){
          throw new Error('Could not publish post at this moment');
        }
        res.redirect('/recolon/auth/user/feed')
    })
}

//Show page - Details about a particular post
exports.show_page = (req, res, next) => {
    Post.findById(req.params.id)
    .populate('comments')
    .exec((err, foundPost) => {
        if(err){
           errFunc();
        }
        res.render('show', {post: foundPost})
    })
}

//edit post
exports.edit_post = (req, res, next) => {
    Post.findById(req.params.id, (err, foundPost) => {
        res.render('edit', {edit: foundPost});
    })
}

//Update Post
exports.update_post = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const content = req.body.content;

    const editedPost = {title: title, image: image, content: content};

    Post.findByIdAndUpdate(req.params.id, editedPost, (err, editedPost) => {
        if (err){
           errFunc();
        }
        res.redirect('/recolon/' + req.params.id)
    })
}

//Delete a post
exports.delete_post = (req, res, next) => {
    Post.findByIdAndRemove(req.params._id, (err, deletedPost) => {
        if(err){
            errFunc();
        }
        res.redirect('/recolon/auth/user/index/feed')
    })
}