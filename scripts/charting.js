/********************** Defines the charting interface ******************/

(function(c, p, Chart){
	c.chartArray  = [];
	
	// function takes and array of data and changes the values of the points and bars for the graphs
	// This will be the subscribed function.  Requires a chart be bound to it for context
	changeData = function(data){

		// data values are either in points or bar.  Try points first
		try{
			for(var i = 0, len = data.length;i < len; i++){
				this.datasets[0].points[i].value = data[i];
			}
		}
		catch(e){
			for(var i = 0, len = data.length;i < len; i++){
				this.datasets[0].bars[i].value = data[i];
			}
		}
		
		this.update();
	};	

	// calls getRandomNumbers and then publishes the new data
	// can be attached to a button on the page (in this case, it most certainly will)
	c.changeNumbers = function(){
		p.publish('newData', c.getRandomArray(7, 10, 1));
	};

	c.createCharts = function createCharts(){
		var type, ctx, aChart, token, canvases;

		// give all of the graph types an extended method to encapsulate data change/update and
		// create a chart for each type
		// create some charts
		canvases = $('.chart');
		canvases.each(function(){
			type = this.dataset.type;
			ctx = this.getContext('2d');
			
			aChart = new Chart(ctx)[type](c.data[type]);

			// Bind the chart to them so this is preserved in the subscribed function.
			// save an object of {id: token, chart: aChart} to the array
			token = p.subscribe('newData', changeData.bind(aChart));
			
			c.chartArray.push({id: token, chart: aChart});	
		});
			
	};

	// get a {len} array of random numbers between {min} and {max} inclusive 
	c.getRandomArray = function(size, max, min){
		var data = [];

		for(var i = 0; i < size; i++){
			data.push(Math.floor(Math.random() * 10 + 1));
		}

		return data;
	};	


}(window.Charting = window.Charting || {}, Publisher, Chart));


