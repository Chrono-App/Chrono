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
	

	renderCalendar();

	// document.getElementById("newAccount").addEventListener("click", function(e) {
	//var times = [ "1am"]
	// })
})();