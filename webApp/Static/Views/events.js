var Chrono = Chrono || {};

Chrono.eventsview = function() {
		// create model
		this.model = new Chrono.eventsmodel();
		model.subscribe(this.onModelUpdate)
		// subscribe event

		// fetch!
};

Chrono.eventsview.prototype.render = function() {

};

Chrono.eventsview.prototype.onModelUpdate = function(eventType) {
	// based on etype, do something!
	console.log(this);
};

