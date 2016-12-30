var express = require('express');
var bodyParser = require('body-parser');
//var parseurl = require('parseurl');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var user = express(); //sub app
var MongoClient = require('mongodb').MongoClient;

var mySession;

app.use(express.static(__dirname + '/Static'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'chrono', resave: false, saveUninitialized: true }));
app.use('/user', user);

app.get("/", function(req, res){
   if(req.session.views){
      req.session.views++;
      console.log("You visited this page " + req.session.views + " times");
      console.log(req.sessionID);
   }else{
      req.session.views = 1;
      console.log("Welcome to this page for the first time!");
      console.log(req.sessionID);
   }
   //console.log(app.mountpath);
   res.sendFile(__dirname + '/Static/home.html');
  // res.end();
});

// user.get("/default.html", function(req, res) {
// 	console.log("default");
// 	res.end();
// });


user.post('/', function(req, res) {
	
//console.log(req.body);
	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
		if (err != null) {
			res.send('OH NO!');
		} else {
			var collection = db.collection('users');

			console.log(req.body);

			collection.find({ username: req.body.username, password: req.body.password }).hasNext().then(function(arg) {
				if (arg) {
					req.session.regenerate(function(){
						req.session.user = req.body.username;
						req.session.success = 'authenticated';
						console.log(req.session.user);
						res.send("found");
					});
					//req.session.loggedIn = true;
					//console.log(req.session.loggedIn);
					
				} else {
					res.send("no!");
				}
				db.close();
			});
		}
	});
});

// user.post('/login', function(req, res) {
// 	// pull information from database
// 	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
// 		if (err) {
// 			res.send('Issue connecting');
// 		} else {
// 			var collection = db.collection('users');

// 			console.log(req.session.user);
// 		}
// 	// render calendar
// })

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

			// TODO: add some test here

			db.close();

		}
	});
});

function getCookie(cookie_name) {
	var name = cookie_name + "=";
	var cookie = document.cookie;
	for (var i = 0; i < cookie.length; i++) {
		var c = cookie[i];
		// while (c.charAt(0) == ' ') {
		// 	c = c.substring(1);
		// }
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

user.post('/event', function(req, res) {
	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
		if (err != null) {
			res.send('Cannot connect to MongoDB');
		} else {
			var collection = db.collection("users");

			var session_id = req.session.user;
			console.log(session_id);
			//var session_id = "becca";

			collection.update({ username: req.session.user }, { $set: { events: { title: req.body.title, allDay: req.body.allDay, start: req.body.start,
			end: req.body.end } } });
			// var x = document.cookie;

			// collection.insertMany([req.body], function(err, result) {
			// 	if (err) {
			// 		res.send("can't post event oh no");
			// 	} else {
			// 		res.send("posted request!");
			// 	}
			// });

			db.close();
		}
	})
})

app.listen(3000);
