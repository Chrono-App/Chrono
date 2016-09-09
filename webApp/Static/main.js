// (function() {
// 	function httpGet(url, callback) {
// 		var xmlHttp = new XMLHttpRequest();
// 		xmlHttp.onreadystatechange = function() {
// 			if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
// 				callback(xmlHttp.responseText);
// 		};
// 		xmlHttp.open("GET", url, true);
// 		xmlHttp.send(null);
// 	};

// 	document.getElementById("login").addEventListener("click", function(e) {
// 		httpGet()
// 	})
// })

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
		});
	})
})();