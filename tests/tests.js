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
		spy2 = sinon.spy(func1);
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
		var result;

		it('unsubscribing a non-subscriber from an existing event should return false', function(){
			expect(Publisher.unsubscribe('event1', 5)).to.be.false;
		});
		
		it('unsubscribing a subscriber from a non-existing event should return false', function(){
			expect(Publisher.unsubscribe('event5', id1)).to.be.false;
		});

		it('publishing event1 should not call spy1', function(){
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

		it('chartArray should an empty object', function(){
			expect(Charting.chartArray).to.eql({});
		});

		it('graphTypes should contain the needed chart types', function(){
			expect(Charting.graphTypes).to.eql(graphTypes);
		});

		it('data needs to contain data for each graphType', function(){
			for(var i = 0, len = graphTypes.length; i < len; i++){
				expect(Charting.data[graphTypes[i]]).to.exist;
			}
		});
	});

	describe('Charting.createCharts', function(){
		var count = 0;

		it('should create graphTypes.length number of chart objects in Charting.chartArray', function(){
			Charting.createCharts();
			// check for the existence of the changeData method.  If it exists, then this is a chart object with the extended change Data function
			for(var i = 0, len = graphTypes.length; i < len; i++){
				if(Charting.chartArray[graphTypes[i]].changeData){
					count++;
				}
			}

			expect(count).to.equal(graphTypes.length);
		});
	});
});