var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var timestamps  = require('mongoose-timestamp');

var postSchema = new Schema({
    title     : String,
    body      : String,
    author    : String,
    date      : Date
});

// the timestamps module gives us createdAt and updateAt
postSchema.plugin(timestamps);

module.exports = mongoose.model('Post', postSchema)