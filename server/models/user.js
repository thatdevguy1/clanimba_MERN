var mongoose = require('mongoose');


// User Schema
var UserSchema = mongoose.Schema({
	battleTag: {
		type: String
    }, 
    token: {
        type: String
    },
});

module.exports = mongoose.model('User', UserSchema);