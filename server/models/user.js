var mongoose = require('mongoose');


// User Schema
var UserSchema = mongoose.Schema({
	battleTag: {
		type: String
    }, 
    token: {
        type: String
    },
    posts: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);