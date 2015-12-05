var express = require('express');
var router = express.Router();

var user
var file

function modelSetup(models){
	user = models.user_model
	file = models.file_model
}

router.post('/', function(req, res){
	var email = req.body.email
	var group_name = req.body.group_name

	user.update({email: email}, {$push: {groups: {group_name: group_name, files: []}}}, function(err, data){
		if(!err){
			console.log(group_name)
			console.log(data)
			console.log("yoyoyo=====")
			console.log(req.body)
			console.log("yoyoyo=====")
			res.json({
				success: true
			})
		} else {
			console.log(err)
			res.json({
				sucess: false,
				msg: "Error"
			})
		}
	})
	
});

exports.router = router
exports.modelSetup = modelSetup