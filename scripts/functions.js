/********************** Defines functions outside the scope of the publisher class ******************/

/*		These are function used for setting up the charts and defining subscribers. 				*/
/*		Putting them here also allows for unit testing unlike if they were in the main script	    */

/***************************************************************************************************/

var chartArray  = {},
	graphTypes =['Bar', 'Line', 'Radar'];

var func = {};

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

function createCharts(){
	// give all of the graph types an extended method to encapsulate data change/update and
	// create a chart for each type
	for(var i = 0, len = graphTypes.length; i < len; i++){
		type = graphTypes[i];
		Chart.types[type].extend({
			changeData: changeData
		});		

		// create some charts

		ctx = $('#' + type).get(0).getContext('2d');
		chart = new Chart(ctx)[type](data[type]);

		// push to an array for access in the subscriber function.
		
		chartArray[type] = chart;	

		// to test some stuff, put the fuctions in an array.  Bind the chart to them so this is preserved in the subcribed function
		func[type] = chart.changeData.bind(chart);
	}
}