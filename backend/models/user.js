var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	name: {type: String},
	files: {type: Array}
}, {versionKey: false});

module.exports = user;