var express = require('express');
var bodyParser = require('body-parser');
//var parseurl = require('parseurl');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var user = express(); //sub app
var MongoClient = require('mongodb').MongoClient;

var mySession;

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: 'chrono', resave: false, saveUninitialized: true }));
app.use(express.static(__dirname + '/Static'));
app.use('/user', user);

app.get("/", function(req, res){
   if(req.session.views){
      req.session.views++;
      console.log("You visited this page " + req.session.views + " times");
   }else{
      req.session.views = 1;
      console.log("Welcome to this page for the first time!");
   }
   //console.log(app.mountpath);
   res.sendFile(__dirname + '/Static/home.html');
  // res.end();
});


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

			// var session_id = document.cookie;
			// console.log(session_id);
			// var session_id = "becca";

			collection.update({ username: session_id }, { $set: { events: { title: req.body.title, day: req.body.day,
			time: req.body.time, note: req.body.note } } });
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
