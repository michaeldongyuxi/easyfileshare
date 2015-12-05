var express = require('express');
var router = express.Router();

var user
var file

function modelSetup(models){
	user = models.user_model
	file = models.file_model
}

router.get('/', function(req, res){
	res.send("Hello")
});

router.post('/', function(req, res){
	var obj = {
		email: req.body.email,
		password: req.body.password
	}
	var user_obj = new user(obj)
	user_obj.save(function(err, result){
		if(err){
			console.log("Error");
		} else {
			console.log(result);
			res.json({
				success: true,
				msg: ""
			})
		}
	})
	
	res.json({
		success: true
	})
})

exports.router = router
exports.modelSetup = modelSetup