var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
	file_id: {type: String},
	path: {type: String}
}, {versionKey: false});

module.exports = user;