describe("Check components", function() {

	it("should have a BSL namespace", function() {
		expect(BSL).toBeDefined();
	});

	it("should have a mediator object for working with custom events", function() {
		expect(BSL.vent.trigger).toBeDefined();
	});

	it("should be able to trigger and catch custom events", function() {
		var component;		
		BSL.vent.on("component:loaded", function(args){
			component = args.component;
		});
		BSL.vent.trigger('component:loaded',{component:'test'});
		
		expect(component).toEqual('test');
	});

});
