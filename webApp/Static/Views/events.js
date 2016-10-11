var Chrono = Chrono || {};

Chrono.eventsview = function() {
		// create model
		this.model = new Chrono.eventsmodel();
		this.model.subscribe(this.onModelUpdate);
		this.render();
		// subscribe event

		// fetch!
};

Chrono.eventsview.prototype.render = function() {
	console.log(this.model.time);
	console.log(this.model.note);
};

Chrono.eventsview.prototype.onModelUpdate = function(eventType) {
	// based on etype, do something!
	console.log(eventType);
};


document.getElementById("create_event").addEventListener("click", function() {
		console.log("hi");
		var event = new Chrono.eventsview();
		//event.render();
		event.model.fetch();
		//console.log(event);
		//var event = this.eventsview();
		//console.log(event);
	});
