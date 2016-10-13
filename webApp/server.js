var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var user = express(); //sub app
var MongoClient = require('mongodb').MongoClient

app.use(bodyParser.json());
app.use(express.static(__dirname + '/Static'));
app.use('/user', user);

// user.post('/', function(req, res) {
// 	console.log(req.body);
// 	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
// 		if (err != null) {
// 			res.send('OH NO!');
// 		} else {
// 			var collection = db.collection('users');
// 			collection.insertMany([req.body], function(err, result) {
// 				if (err != null) {
// 					res.send('OH NO!');
// 				} else {
// 					res.send("posted request");
// 					db.close();
// 				}
// 			});
// 		}
// 	});
// });

user.post('/', function(req, res) {
	
//console.log(req.body);
	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
		if (err != null) {
			res.send('OH NO!');
		} else {
			var collection = db.collection('users');

			console.log(req.body);

			//if (collection.find( { username : req.body.username, password: req.body.password }).hasNext()) {
			//	console.log(collection.find( { username : req.body.username, password: req.body.password }).hasNext().then(function(arg) {
			//		conso
			//	}));
			//	res.send("found");
			//} else {
			//	res.send("not found");
			//}

			collection.find({ username: req.body.username, password: req.body.password }).hasNext().then(function(arg) {
				if (arg) {
					res.send("found");
				} else {
					res.send("no!");
				}
				db.close();
			});
		}
	});
});

user.post('/new', function(req, res) {
	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
		if (err != null) {
			res.send('Issue connecting');
		} else {
			var collection = db.collection('users');

			console.log(req.body);

			collection.insertMany([req.body], function(err, result) {
				if (err) {
					res.send("Nooooo");
				} else {
					res.send("posted request");
				}
			});

			var userinfo = db.collection(req.body.username).save({ user: req.body.username });

			console.log(req.body.username);

			// TODO: add some test here

			db.close();

		}
	});
});

app.listen(3000);
