/********************** Defines functions outside the scope of the publisher class ******************/

/*		These are function used for setting up the charts and defining subscribers. 				*/
/*		Putting them here also allows for unit testing unlike if they were in the main script	    */

/***************************************************************************************************/
(function(c, Chart){
	c.chartArray  = {},
		c.graphTypes =['Bar', 'Line', 'Radar'];

	// function takes and array of data and changes the values of the points and bars for the graphs
	// This will be the subscribed function. 
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

	c.createCharts = function createCharts(){
		var type,
			ctx,
			chart;

		// give all of the graph types an extended method to encapsulate data change/update and
		// create a chart for each type
		for(var i = 0, len = c.graphTypes.length; i < len; i++){
			type = c.graphTypes[i];
			Chart.types[type].extend({
				changeData: changeData
			});		

			// create some charts

			ctx = $('#' + type).get(0).getContext('2d');
			chart = new Chart(ctx)[type](c.data[type]);

			// push to an array for access in the subscriber function.
			
			c.chartArray[type] = chart;	

			// Bind the chart to them so this is preserved in the subcribed function
			
		}
	}	
}(window.Charting = window.Charting || {}, Chart));
