var express = require('express');
//var cookieParser = require('cookie-parser');
//var session = require('express-session');
// http://stackoverflow.com/questions/16088824/serve-static-files-and-app-get-conflict-using-express-js
var serveStatic = require('serve-static');

var app = express();
//var user = express();

//app.use(cookieParser());
//app.use(session({ secret: 'chrono', resave: false, saveUninitialized: true }));
//app.use(express.static(__dirname + '/Static'));
app.use(serveStatic(__dirname + '/Static'));
//app.use('/user', user);

app.get("/", function(req, res){
   // if(req.session.page_views){
   //    req.session.page_views++;
   //    res.send("You visited this page " + req.session.page_views + " times");
   // }else{
   //    req.session.page_views = 1;
   //    console.log("Welcome to this page for the first time!");
   //    res.end();
   // }
   console.log(app.mountpath);
   res.sendFile(__dirname + '/Static/home.html');
  // res.end();
});

app.listen(3000);