var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var group = new Schema({
	group_name: {type: String},
	files: {type: Array}
})

var user = new Schema({
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	name: {type: String},
	files: {type: Array},
	groups: [group]
}, {versionKey: false});

module.exports = user;