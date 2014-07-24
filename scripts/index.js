$('#change').click(function(){
	// change the data for the graphs
	// right now this just calls change data directly.  It will be changed to use a publisher later
	for(var chart in chartArray){
		func[chart]([2, 3, 4, 1, 7, 1, 8]);
	}
});

createCharts();

