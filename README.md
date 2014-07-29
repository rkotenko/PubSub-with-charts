PubSub-with-charts
==================

The creation of charts here is very particular in its setup.  It really only allows one of each type of graph since it plays off of the html ID being the same as the name of the graph type in Chart.js.  This could be rectified in one way by setting the class of the canvases to 'chart' and then giving them each an attribute that indicates the chart type.  Then, createCharts() could loop through all chart canvases and apply the proper setup data for each instead of relying on canvas AND the graphType variable of Charting to be in sync (Indeed, I might implement this for kicks - less areas for out of sync behavior is good).

But that is not really the point.

The chart here is just a way to visually show a PubSub implementation instead of the usual "print to console."  Each chart changes its data to a random set of numbers that is created via the button.  The button publishes the new data and each chart is a subscriber to that topic.  Both the Charting interace and the Publisher are implemented via IIFE.


Testing was done via Mocha, Chai, and Sinon.  I really like the combination. It is clean and pretty easy to read, especially using the expect-style of Chai. Sinon spies are particularly fun and very helpful.
