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
	file.findOne({file_id: file_id}, {}, function(err, data){
		if(!err){
			if(!data){
				res.json({
					success: false,
					msg: "File not found"
				})
			} else {
				res.download(data.path, data.original_name, function(err){
					if(err){
						console.log(err)
					} else {
						console.log("ok")
					}
				})
			}
		} else {
			console.log(err)
			res.json({
				success: false
			})
		}
	})
});

exports.router = router
exports.modelSetup = modelSetup
