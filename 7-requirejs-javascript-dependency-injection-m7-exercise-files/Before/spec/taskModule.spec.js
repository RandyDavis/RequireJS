describe("The taskModule", function() {
	
	var injector;
	
	beforeEach(function(done) {
		require(["Squire"], function(Squire) {
			injector = new Squire();
			done();
		})
	});
	
	afterEach(function() {
		injector.remove();
	});
	
	describe("add function", function() {
		it("calls taskRenderer.renderNew", function(done) {
			injector.mock("renderers/taskRenderer", {
				renderNew: function() {}
			});
			
			injector.mock("data/taskData", {});
			
			injector.require(["tasks", "renderers/taskRenderer"],
				function(tasks, taskRenderer) {
					spyOn(taskRenderer, "renderNew");
					tasks.add();
					expect(taskRenderer.renderNew).toHaveBeenCalled();
					done();
				},
				function(error) {
					done.fail(error);
				});			
		});
		
		it("thing should exist", function(done) {
			define("thing", [], function() {
				return {};
			});
			
			require(["thing"], function(thing) {
				expect(thing).toBeDefined();
				done();
			},
			function(error) {
				done.fail(error);
			});
		});
		
		it("thing should not exist", function(done) {
			require(["thing"], function(thing) {
				expect(thing).not.toBeDefined();
				done();
			},
			function(error) {
				done.fail(error);
			});
		});
	});
});