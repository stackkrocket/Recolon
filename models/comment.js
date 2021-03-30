var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
   text: {
       type: String,
       required: true
   },
   author: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      },
      username: String
   }
})

module.exports = mongoose.model('Comment', commentSchema);