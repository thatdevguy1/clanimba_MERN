var mongoose = require('mongoose');


// User Schema
var PostSchema = mongoose.Schema({
	user: {
		type: String
    }, 
    charImg: {
        type: String
    },
    post: {
        type: String
    },
    date: {
        type: String
    },
    replies: {
        type: [{
            user: String,
            icon: String,
            msg: String
        }]
    }
});

module.exports = mongoose.model('Post', PostSchema);