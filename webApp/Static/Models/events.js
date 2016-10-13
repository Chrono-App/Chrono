/* Adding an event
 * event title, time, note etc.
 */

var Chrono = Chrono || {};

Chrono.eventsmodel = function() {
	this._listeners = [];
 	this.title = null;
 	this.time = null;
 	this.note = null;
};

Chrono.eventsmodel.events = {
	FETCH_EVENT: 'FETCH_EVENT',
	SET_PROPS: 'SET_PROPS'
};

//Chrono.eventlistmodel = function() {
//	this.
//}

Chrono.eventsmodel.prototype.fetch = function(success, error) {
	//fire callback when fetch fails or succeeds
	this.title = document.getElementById("eventTitle").value;
	this.time = document.getElementById("eventTime").value;;
	this.note = document.getElementById("eventNote").value;;
	this.notify(Chrono.eventsmodel.events.FETCH_EVENT);
	success();
	//console.log(this);
};

Chrono.eventsmodel.prototype.notify = function(event_type) {
	this._listeners.forEach(function(listener) {
		listener(event_type);
	});
};

Chrono.eventsmodel.prototype.setProps = function(props) {
	//if props, set title, time, note properties
	this.notify(Chrono.eventsmodel.events.SET_PROPS);
};

//Chrono.eventsmodel.prototype.save = function() {
	//save event info to database
//}

Chrono.eventsmodel.prototype.subscribe = function(listener) {
	//subscribe listener to notify
	//listener fired when call notify
	this._listeners.push(listener);
}

Chrono.eventsmodel.prototype.unsubscribe = function(listener) {
	var index;
	index = this._listeners.indexOf(listener); 

	if (index > -1) {
		this._listeners.splice(index, 1);
	}
}
