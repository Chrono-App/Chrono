var new_username = document.getElementById("newUser").value;
var new_password = document.getElementById("newPassword").value;

console.log(new_username);


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

	document.getElementById("newAccount").addEventListener("click", function(e) {
		var user_input = document.getElementById("newUser").value;
		var password_input = document.getElementById("newPassword").value;

		httpPost("/user/new", { username: user_input, password: password_input }, function(res) {
			alert(res);
			window.location = "/";
		});
	});
})();