var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer')
var upload = multer({ dest: "./uploads/" })

var user
var file

function modelSetup(models){
	user = models.user_model
	file = models.file_model
}

router.get('/', function(req, res){
	res.send("Hello")
});

router.post('/', upload.single('file'), function(req, res){
/*
	{ fieldname: 'file',
  originalname: '2.62.pdf',
  encoding: '7bit',
  mimetype: 'application/pdf',
  destination: './uploads/',
  filename: '49fdcb4db8083d638572a3da3b248a0b',
  path: 'uploads/49fdcb4db8083d638572a3da3b248a0b',
  size: 310896 }
*/

	var file_id = getID()
	console.log(req.file);

	var file_obj = {
		file_id: file_id,
		path: req.file.destination+req.file.filename,
		original_name: req.file.originalname
		//uploaded_on: Date.now()
	}

	file_obj = new file(file_obj)

	file_obj.save(function(err, result){
		if(!err){
			if(req.session.email){
				//User logged in
				user.update({email: req.body.email}, {files: {$push: file_id}}, function(err, data){
					if(!err){
						file.insert(file_obj, {}, function(err, data){
							if(!err){
								res.json({
									success: true,
									file_id: file_id
								})
							} else {
								console.log(err)
							}
						})
					} else {
						console.log(err)
					}
				})
			} else {
				//Not logged in
				res.json({
					success: true,
					msg: "",
					file_id: file_id
				})
			}
		}
	})
});

function getID(){
	var numArray = 
	["0","1","2","3","4","5","6","7","8","9"
	,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
	var id = "";
	for(var i = 0; i<6; i++){
		var r = Math.floor(Math.random()*36);
		id = id+numArray[r];
	};
	return id;
}

exports.router = router
exports.modelSetup = modelSetup