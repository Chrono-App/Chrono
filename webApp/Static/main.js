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

	document.getElementById("login").addEventListener("click", function(e) {
		var user_input = document.getElementById("username").value;
		var password_input = document.getElementById("password").value;

		httpPost("/user", { username: user_input, password: password_input }, function(res) {
			alert(res);
			window.location = '/default.html';
		    document.cookie = "username=" + user_input;
		});
	});

	var calendar = document.getElementById("calendar");

	var days = [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

	days.forEach(function(day) {
		var dayElem = document.createElement("div");
		dayElem.className = "day";
		calendar.appendChild(dayElem);
	})
	
})();