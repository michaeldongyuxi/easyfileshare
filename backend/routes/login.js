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
	var password = req.body.password

	user.findOne({email: email}, {}, function(err, data){
		if(!err && data){
		if(data.password == password){
			req.session.email = email;
			res.json({
				success: true,
				msg: ""
			})
		} else {
			res.json({
				success: false,
				msg: ""
			})
		}} else {
			res.json({
				success: false,
				msg: ""
			})	
		}
	})
});

exports.router = router
exports.modelSetup = modelSetup
