var express = require('express');
var router = express.Router();

var user
var file

function modelSetup(models){
	user = models.user_model
	file = models.file_model
}

router.get('/:email', function(req, res){
	var email = req.params.email
	user.findOne({email: email}, {}, function(err, data){
		if(!err && data){
			res.json(data.groups)
		} else {
			console.log("Data not found")
			res.json({
				success: false,
				msg: "Data not found"
			})
		}
	})
})

exports.router = router
exports.modelSetup = modelSetup