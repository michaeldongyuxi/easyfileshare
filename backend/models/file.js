var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
	file_id: {type: String, required: true},
	path: {type: String, required: true},
	original_name: {type: String},
	uploaded_on: {type: Date}
}, {versionKey: false});

module.exports = user;