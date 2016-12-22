var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
var user = express();

app.use(cookieParser());
app.use(session({ secret: 'chrono', resave: false, saveUninitialized: true }));
//app.use(express.static(__dirname + '/Static'));
app.use('/user', user);

app.get('/', function(req, res){
   // if(req.session.page_views){
   //    req.session.page_views++;
   //    res.send("You visited this page " + req.session.page_views + " times");
   // }else{
   //    req.session.page_views = 1;
   //    console.log("Welcome to this page for the first time!");
   //    res.end();
   // }
   console.log("hello");
   res.end();
});
app.listen(3000);