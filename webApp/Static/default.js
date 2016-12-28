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

	// function renderCalendar() {
	// 	var row1 = document.createElement("div");
	// 	var days = [ "Time", "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

	// 	var calendar = document.getElementById("calendar");

	// 	// get the date element
	// 	// change the date range wrt the model

	// 	while(calendar.firstChild) {
	// 		calendar.removeChild(calendar.firstChild);
	// 	}

	// 	calendar.appendChild(row1);

	// 	days.forEach(function(day) {
	// 		var dayElem = document.createElement("div");
	// 		dayElem.className = "day text-center";
	// 		dayElem.textContent = day;
	// 		row1.appendChild(dayElem);
	// 	});

	// 	for (var i = 0; i < 23; i++) {
	// 		var row = document.createElement("div");
	// 		row.className = "timeSlot";

	// 		for (var j = 0; j < 8; j++) {
	// 			var time = document.createElement("div");
	// 			time.className = "day text-center";
	// 			row.appendChild(time);
	// 		}
	// 		calendar.appendChild(row);
	// 	}
	// }

	// document.getElementById("create_event").addEventListener("click", function() {
	// 	//1. send dummy data to database
	// 	var event = new Chrono.eventsview();
	// 	event.model.fetch(function() {
	// 		//console.log(event.model.title);
	// 		//console.log(event.model.note);

	// 		addEventToView(event.model);

	// 		httpPost("user/event", { title: event.model.title, day: event.model.day, time: event.model.time, note: event.model.note }, function(res) {
	// 		alert(res);
	// 	});

	// 	}, null);

	// 	//2. call a function to changes the view
	// 	//event.render();
	// 	//console.log(event);
	// 	//var event = this.eventsview();
	// 	//console.log(event);
	// });

	//take the data that was passed in and then dom manipulate to show on the calendar
	 function addEventToView(data){
	 	//get day
	 	var event;

	 	switch(data.day.toLowerCase()) {
	 		case 'sunday' :
	 			event = document.getElementById("calendar").childNodes[2].childNodes[1];
	 			break;
	 		case 'monday' :
	 			event = document.getElementById("calendar").childNodes[2].childNodes[2];
	 			break;
	 		case 'tuesday' :
	 			event = document.getElementById("calendar").childNodes[2].childNodes[3];
	 			break;
	 		case 'wednesday' :
	 			event = document.getElementById("calendar").childNodes[2].childNodes[4];
	 			break;
	 		case 'thursday' :
	 			event = document.getElementById("calendar").childNodes[2].childNodes[5];
	 			break;
	 		case 'friday' :
	 			event = document.getElementById("calendar").childNodes[2].childNodes[6];
	 			break;
	 		case 'saturday' :
	 			event = document.getElementById("calendar").childNodes[2].childNodes[7];
	 			break;
	 		default :
	 			event = document.getElementById("calendar").firstChild.firstChild;
	 			break;
	 	}

	 	var newEvent = document.createElement("div");

	 	var title = document.createElement("p");
	 	title.textContent = "title: " + data.title;
	 	var day = document.createElement("p");
	 	day.textContent = "day: " + data.day;
	 	var time = document.createElement("p");
	 	time.textContent = "time: " + data.time;
	 	var note = document.createElement("p");
	 	note.textContent = "note: " + data.note;

	 	newEvent.appendChild(title);
	 	newEvent.appendChild(day);
	 	newEvent.appendChild(time);
	 	newEvent.appendChild(note);

	 	newEvent.className = "events";
	 	event.appendChild(newEvent);

	 	// post to database
	 	//httpPost("user/new", { title: title, time: time, note: note}, callback)

	 }

	 // function findSlot(data) {
	 // }

	renderCalendar();

	// document.getElementById("newAccount").addEventListener("click", function(e) {
	//var times = [ "1am"]
	// })
})();