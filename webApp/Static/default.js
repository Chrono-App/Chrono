(function() {
	function httpPost(url, payload, callback) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
				callback(xmlHttp.responseText);
		};
		xmlHttp.open("POST", url, true);
		xmlHttp.setRequestHeader("Content-Type", "application/json");
		xmlHttp.send(JSON.stringify(payload));
	}

	function renderCalendar() {
		var row1 = document.createElement("div");
		var days = [ "Time", "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

		var calendar = document.getElementById("calendar");

		// get the date element
		// change the date range wrt the model

		while(calendar.firstChild) {
			calendar.removeChild(calendar.firstChild);
		}

		calendar.appendChild(row1);

		days.forEach(function(day) {
			var dayElem = document.createElement("div");
			dayElem.className = "day text-center";
			dayElem.textContent = day;
			row1.appendChild(dayElem);
		});

		for (var i = 0; i < 23; i++) {
			var row = document.createElement("div");
			row.className = "timeSlot";

			for (var j = 0; j < 8; j++) {
				var time = document.createElement("div");
				time.className = "day text-center";
				row.appendChild(time);
			}
			calendar.appendChild(row);
		}
	}

	// document.getElementById("create_event").addEventListener("click", function() {
	// 	console.log("hi");
	// 	console.log(Chrono);
	// 	var event = this.eventsview();
	// 	console.log(event);
	// });

	document.getElementById("create_event").addEventListener("click", function() {
		//1. send dummy data to database
		var event = new Chrono.eventsview();
		event.model.fetch(function() {
			//console.log(event.model.title);
			//console.log(event.model.note);

			addEventToView(event.model);

		}, null);

		//2. call a function to changes the view
		//event.render();
		//console.log(event);
		//var event = this.eventsview();
		//console.log(event);
	});

	// user.post('/new', function(req, res) {
	// 	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
	// 		if (err != null) {
	// 			res.send('Issue connecting');
	// 		} else {
	// 			var collection = db.collection('users');

	// 			console.log(req.body);

	// 			collection.insertMany([req.body], function(err, result) {
	// 				if (err) {
	// 					res.send("Nooooo");
	// 				} else {
	// 					res.send("posted request");
	// 					db.close();
	// 				}
	// 			});
	// 		}
	// 	});
	//});



	//take the data that was passed in and then dom manipulate to show on the calendar
	 function addEventToView(data){
	 	//get day
	 	var event = document.getElementById("calendar").firstChild.firstChild;

	 	var newEvent = document.createElement("div");
	 	newEvent.textContent = data.title + " " + data.note;
	 	newEvent.className = "events";
	 	event.appendChild(newEvent);

	 	//get time

	// 	//get title

	// 	//add to blue box


	 }
	

	renderCalendar();

	// document.getElementById("newAccount").addEventListener("click", function(e) {
	//var times = [ "1am"]
	// })
})();