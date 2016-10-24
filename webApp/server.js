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

// post new username/password
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

			var events_collection = db.collection("events");

			//var userinfo = db.collection(req.body.username);
			
			events_collection.save({ user: req.body.username });

			var userid;

			events_collection.find().toArray(function(err, results) {
				userid = (results[0]._id).toString();
				console.log(userid);
				updateCollection();
				//collection.update({ username: req.body.username }, { $set : { user_id : "userid" } });
			});


			function updateCollection() {
				collection.update({ username: req.body.username }, { $set : { user_id : "userid" } });
			}

			//collection.update({ username: req.body.username }, { $set : { user_id : userid } });
			// 	// collection.insertMany([results[0]], function(err, result) {
			// 	// 	console.log(results[0]);
			// 	// });
			//});

			// userinfo.find().toArray(function(err, results) {
			// 	var userid = results[0]._id;
			// 	console.log(userid);

			// 	console.log(collection);

			// 	collection.update({ username: req.body.username }, { $set : { user_id : "hello" } });
			// 	// collection.insertMany([results[0]], function(err, result) {
			// 	// 	console.log(results[0]);
			// 	// });
			// });

			//var print = userinfo.find( { user: { $eq: req.body.username } } );
			//console.log(print);
			//var userid = userinfo.user;

			//console.log(userid);

			// function(err, cb) {
			// 	var userinfo = db.collection(req.body.username);
			// 	userinfo.save({ user: req.body.username });
			// }

			//console.log(userinfo._id);

			//collection.update({ username: req.body.username }, { $set : { user_id : "userid" } });

			//console.log(userinfo._id);

			//collection.insertMany([{ user_id: events_collection._id }]);

			//console.log(userinfo._id);

			// TODO: add some test here

			db.close();

		}
	});
});

user.post('/event', function(req, res) {
	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
		if (err != null) {
			res.send('Cannot connect to MongoDB');
		} else {
			var collection = db.collection("events");

			collection.insertMany([req.body], function(err, result) {
				if (err) {
					res.send("can't post event oh no");
				} else {
					res.send("posted request!");
				}
			});
		}
	})
})

app.listen(3000);
