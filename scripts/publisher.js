// This publisher uses a simple incrementing token.  Obviously, in a real situation, it would be better to use a more unique identifier

var Publisher = {};

(function(p){
	var topics = {};	// an object array of topics for subscription
	var uId = -1;		// id to use as a token to be able to identify the subscribers 

	p.subscribe = function(topic, func){
		if(!topics[topic]){
			topics[topic] = [];
		}
		uId++;
		topics[topic].push({id: uId, func: func});
		return uId;
	};

	p.unsubscribe = function(topic, id){
		if(!topics[topic]){
			return false;
		}

		for(var i = 0, len = topics[topic].length; i < len; i++){
			if(topics[topic][i].id == id){
				topics[topic].splice(i, 1);
				return true;
			}
		}

		return false;
	};
	p.publish = function(topic, data){
		if(!topics[topic]){
			return false;
		}

		for(var i = 0, len = topics[topic].length; i < len; i++){
			topics[topic][i].func(data);
		}
	};

	// resets the publisher to empty.  I don't like exposing this method, but I don't know of any other way to reset my publisher between tests
	// yet.
	p.reset = function(){
		topics = {};
		uId = -1;
	}
})(Publisher);