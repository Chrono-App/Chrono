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

	document.getElementById("create_event").addEventListener("click", function() {
		// send data to database
		var event = new Chrono.eventsview();
		event.model.fetch(function() {
			addEventToView(event.model);

			httpPost("user/event", { title: event.model.title, day: event.model.day, time: event.model.time, note: event.model.note }, function(res) {
			alert(res);
		});

		}, null);

    // document.getElementById("delete_event").addEventListener("click", function() {
    // });

	// 	//2. call a function to changes the view
	// 	//event.render();
	// 	//console.log(event);
	// 	//var event = this.eventsview();
	// 	//console.log(event);
	// });
	 }

	 // function findSlot(data) {
	 // }

	renderCalendar();

	// document.getElementById("newAccount").addEventListener("click", function(e) {
	//var times = [ "1am"]
	// })
})();