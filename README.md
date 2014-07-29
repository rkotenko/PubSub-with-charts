PubSub-with-charts
==================

The implementation here is very particular.  It really only allows one of each type of graph as it plays off of the html ID being the same as the name of the graph type in Chart.js.  This could be rectified to use a class instead and create as many charts as there are canvases with the chart type as the class.

But that is not really the point.

The chart here is just a way to visually show a PubSub implementation instead of the usual "print to console."  Each chart changes its data to a random set of numbers that is created via the button.  The button publishes the new data and each chart is a subscriber to that topic.  Both the Charting interace and the Publisher are implemented via IIFE.


Testing was done via Mocha, Chai, and Sinon.  I really like the combination. It is clean and pretty easy to read, especially using the expect-style of Chai. Sinon spies are particularly fun and very helpful.
