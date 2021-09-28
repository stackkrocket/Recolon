const Post = require('../models/post')
const path = require('path');
const multer = require('multer');

//Configure Multer//
//Set storage engine and upload location
const storage = multer.diskStorage({
    destination: './public/uploads/images/',
    filename: function(req, file, callback){
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

//Initialize upload variable
const upload = multer({
    storage: storage,
    limit: {fileSize: 5000000},
    fileFilter: function(req, file, callback){
        checkFileType(file, callback);
    }
});

//c\Check file type
function checkFileType(file, callback){
    //Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;

    //Check for extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    //Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype){
        return callback(null, true);
    }else{
        callback('Error: Images Only');
    }
}


/*===Config ends here===*/

//Shw this page when a user newly creates an account
// Refactor this Line of code to redirect both the user and its session to desired page
exports.new_user = (req, res, next) => {
    console.log(req.user)
    res.render('auth/index')
}


//Display form for new post
exports.create_post_form = (req, res, next) => {
    res.render('new.ejs');
}

//Fetch input from form and create post
exports.create_post = (req, res, next) => {
    const title = req.body.title;
    const image = req.file.filename;
    const community = req.body.communities;
    const content = req.body.content;
    const author = {id: req.user._id, username: req.user.username, lastName: req.user.lastName};

    const newPost = {title: title, image: image, community: community, content: content, author: author};

    Post.create(newPost, (err, createdPost) => {
        if(err){
            throw new Error('Post could not be uploaded...')
        }
        res.redirect('/recolon/auth/user/index/feed');
    })
}

//All users posts feed
//Refactor this line of code
exports.user_feed = (req, res, next) => {
    Post.find({})
    .sort({created: -1})
    .exec((err, allPost) => {
        if(err) {
           res.send(err);
        }else{
            res.render('auth/user/feed', {posts: allPost, currentUser: req.user})
        }
    })
}

//Show page - Details about a particular post
exports.show_page = (req, res, next) => {
    Post.findById(req.params.id)
    .populate('comments')
    .exec((err, foundPost) => {
        if(err){
            res.send(err);
        }else{
            res.render('show', {post: foundPost})
        }
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
            res.send(err);
        }else{
            res.redirect('/recolon/' + req.params.id)
        }
    })
}

//Delete a post
exports.delete_post = (req, res, next) => {
    Post.findByIdAndRemove(req.params._id, (err, deletedPost) => {
        if(err){
            res.send(err);
        }else{
            res.redirect('/recolon/auth/user/index/feed')   
        }
    })
}