var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

//TODO environment variables
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function(callback) {
	console.log('ayy, database is hooked up');
});

var UserSchema = require('./db/userSchema.js');
var User = mongoose.model('User', UserSchema);

app.use(express.static('client'));
app.use('/bower_components', express.static('bower_components'));

var authentication = require('./routers/authentication.js')(User);

app.use(session({secret: "ther3als3cr3th3lly3ahil0v33ncrypti0n"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(authentication);

var server = app.listen(5050, function() {
	var host = server.address().address;
	var port = server.address().port;

	host = host === "::" ? "localhost" : host;

	console.log('To do application is listening on %s:%s', host, port);
});
