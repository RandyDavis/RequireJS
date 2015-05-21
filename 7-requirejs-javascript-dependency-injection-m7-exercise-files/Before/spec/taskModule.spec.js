describe("The taskModule", function() {
	
	var testRequire;
	var CONTEXT_NAME = "test";
	
	beforeEach(function() {
		// create a new config object that is a copy of hte default config.
		var defaultConfig = requirejs.s.contexts._.config;
		var testConfig = {};
		for(var key in defaultConfig) {
			if(defaultConfig.hasOwnProperty(key)) {
				testConfig[key] = defaultConfig[key];
			}
		}
		
		// set a context name on the new config
		testConfig.context = CONTEXT_NAME;
		
		// make a new require context
		testRequire = require.config(testConfig);
	});
	
	afterEach(function() {
		testRequire = undefined;
		delete requirejs.s.contexts[CONTEXT_NAME];
	});
	
	
	
	describe("add function", function() {
		it("calls taskRenderer.renderNew", function(done) {
			define("renderers/taskRenderer", [], function() {
				return {
					renderNew: function() {}
				};
			});
			
			define("data/taskData", [], function() {
				return {};
			});
			
			testRequire(["tasks", "renderers/taskRenderer"],
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