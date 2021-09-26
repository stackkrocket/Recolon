var mongoose = require('mongoose');
var Schema = mongoose.Schema;



/*===Config ends here===*/

var postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    community: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    deleted: {
        type: Date,
        default: Date.now()
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
        lastName: String
    }
})

module.exports = mongoose.model('Post', postSchema);