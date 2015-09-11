var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var app = express()

var login = require('./routes/login.js')
var register = require('./routes/register.js')
var upload = require('./routes/upload.js');
var download = require('./routes/download.js')

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

/* setting up routers */
app.use('/', express.static('../frontend'))

app.use('/login', login.router)
app.use('/register', register.router)
app.use('/upload', upload.router)
app.use('/download', download.router)

app.use('/', function(req, res){
	res.send("Ian is gay")
})

app.listen(9095)