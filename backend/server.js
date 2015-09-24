var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var app = express()

var login_router = require('./routes/login.js')
var register_router = require('./routes/register.js')
var upload_router = require('./routes/upload.js');
var download_router = require('./routes/download.js')

var mongodbURI = "mongodb://localhost/easyfileshare"

var options = {
	server: {},
	replset: {}
}

var connection = mongoose.createConnection(mongodbURI, options)

connection.on('error', function(err){
	console.log(err)
})
connection.once('open', function(){
	console.log("DB Connected")
})

/* constructing session DB connection*/
var sessionConnection = mongoose.createConnection(mongodbURI, options)
sessionConnection.on('error', function(err){
	console.log(err)
})
sessionConnection.once('open', function(){
	console.log("SessionDB Connected")
})

app.use(session({
	secret: "UTechInno",
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection:sessionConnection,
		collection: "easyfileshare_sessions"
	})
}))

app.use(bodyParser.json())

/* setting up routers */
app.use('/', express.static('../frontend'))

app.use('/login', login_router.router)
app.use('/register', register_router.router)
app.use('/upload', upload_router.router)
app.use('/download', download_router.router)

var user = connection.model('user', require('./models/user.js'), 'users')
var file = connection.model('file', require('./models/file.js'), 'files')

var models = {
	user_model: user,
	file_model: file
}

login_router.modelSetup(models)
register_router.modelSetup(models)
upload_router.modelSetup(models)
download_router.modelSetup(models)

app.use('/', function(req, res){
	res.send("Ian is gay")
})

app.listen(9095)