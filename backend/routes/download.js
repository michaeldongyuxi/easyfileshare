var express = require('express')
var router = express.Router()

var user
var file

function modelSetup(models){
	user = models.user_model
	file = models.file_model
}

router.get('/:file_id', function(req, res){
	var file_id = req.params.file_id
	var fileDestination
	file.findOne({file_id: file_id}, {}, function(err, data){
		var fileDestination = data.path
	})
	res.send("Hello")
});

exports.router = router
exports.modelSetup = modelSetup