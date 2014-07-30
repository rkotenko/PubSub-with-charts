var expect = chai.expect;
var graphTypes = ['Bar', 'Line', 'Radar'];

// hide the visible items on pages to make it easier to see tests.
$('#charts').css('display', 'none');

// test the publisher interface
describe('Publisher', function(){
	var id1, id2,
		func1 = function(){},
		func2 = function(){},
		spy1, spy2,
		sandbox;
		
	
	beforeEach(function(){
		spy1 = sinon.spy(func1);
		spy2 = sinon.spy(func2);
		id1 = Publisher.subscribe('event1', spy1);
		id2 = Publisher.subscribe('event2', spy2);
		
	});

	afterEach(function(){
		Publisher.reset();
	});

	describe('Publish topic with no subscribers', function(){
		it('publish should return false when there are no subscribers to a topic', function(){
			expect(Publisher.publish('no subscribers')).to.be.false;	
		});
		
	});

	describe('Subscribe and publish a topic', function(){
		it('subscriber func1 should have been called with data', function(){
			Publisher.publish('event1', 'data');
			expect(spy1.called).to.be.true;
			expect(spy1.calledWith('data')).to.be.true;
		});

		it('subscriber func2 should NOT have been called', function(){
			Publisher.publish('event1');
			expect(spy2.called).to.be.false;
		});
	});	

	describe('Unsubscribe', function(){
		it('unsubscribing a non-subscriber from an existing event should return false', function(){
			expect(Publisher.unsubscribe('event1', 5)).to.be.false;
		});
		
		it('unsubscribing a subscriber from a non-existing event should return false', function(){
			expect(Publisher.unsubscribe('event5', id1)).to.be.false;
		});

		it('publishing event1 should not call spy1', function(){
			var result;

			Publisher.unsubscribe('event1', id1);
			result = Publisher.publish('event1');
			expect(spy1.called).to.be.false;
		});
	});
});

// check the charting object
describe('Charting Object', function(){
	describe('Charting exists', function(){
		
		it('charting object should exist', function(){
			expect(Charting).to.exist;
		});

		// change to an empty array
		it('chartArray should an empty object', function(){
			expect(Charting.chartArray).to.eql([]);
		});

		it('data needs to contain data for each canvas type', function(){
			var canvases = $('.chart');
			canvases.each(function(key){

				expect(Charting.data[this.dataset.type]).to.exist;	
			});
		});
	});

	describe('Charting.createCharts', function(){
		it('should create <canvas> number of objects in Charting.chartArray', function(){
			var count = 0,
			object, canvases;

			canvases = $('.chart');
			Charting.createCharts();
			// check for the existence of the update method.  If it exists, then this is a chart object
			// also check that each object has a token that is >= 0
			for(var i = 0, len = canvases.length; i < len; i++){
				object = Charting.chartArray[i];
				if(object.chart.update){
					count++;
					expect(object.id).to.be.above(-1);
				}
			}

			expect(count).to.equal(canvases.length);
		});
	});

	describe('getRandomArray', function(){
		it('should return an array of length 6 with numbers between 1 and 10 inclusive', function(){
			var data = [],
			len;

			data = Charting.getRandomArray(6, 1, 10);
			len = data.length;
			expect(len).to.equal(6);

			for(var i = 0; i < len; i++){
				expect(data[i]).to.be.within(1, 10);
			}
		});
	});

	describe('changeNumbers', function(){
		it('should call getRandomArray', function(){
			var randSpy = sinon.spy(Charting, 'getRandomArray');

			Charting.changeNumbers();
			expect(randSpy.called).to.be.true;
		});

		it('should call Publisher.publish', function(){
			var pubSpy = sinon.spy(Publisher, 'publish');

			Charting.changeNumbers();
			expect(pubSpy.called).to.be.true;	
		});
	});	
});