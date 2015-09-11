var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
	email: {type: String},
	password: {type: String},
	name: {type: String},
	files: {type: Array}
}, {versionKey: false});

module.exports = user;