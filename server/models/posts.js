var mongoose = require('mongoose');


// User Schema
var PostSchema = mongoose.Schema({
	user: {
		type: String
    }, 
    post: {
        type: String
    },
    date: {
        type: String
    },
    replies: {
        type: [String]
    }
});

module.exports = mongoose.model('Post', PostSchema);