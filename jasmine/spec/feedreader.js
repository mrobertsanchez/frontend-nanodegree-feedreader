/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('urls defined - not empty', function(){
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
		});

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('names defined - not empty', function(){
			 allFeeds.forEach(function(feed){
				 expect(feed.name).toBeDefined(); 
				 expect(feed.name.length).not.toBe(0);
			 });
		 });
    });

	describe('The menu', function(){
		/* This is a test that ensures the menu element is hidden by default upon load of site
		by checking menu-hidden css id*/
		it('is hidden by default', function(){
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
		
		/* This is a test that ensures the menu toggles to visible/hidden when icon is clicked/tapped*/
		it('icon toggles visible/hidden when clicked', function(){
			$('a.menu-icon-link').trigger('click'); 
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('a.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});
	
    /* This is a test named "Initial Entries". It ensures when the loadFeed
        function is called and completes its work, there is at least
        a single .entry element within the .feed container. Because loadFeed() is
		run asychronously we will need to run beforeEach and done() function*/
	
	describe('Initial Entries', function(){
		beforeEach(function(done){
			loadFeed(0, function(){
				done();
			});
		});
		it('should exist as visible(at least one)', function(){
			expect($('.feed .entry').length).not.toEqual(0);
	});
	});

    /* This is a test that ensures when a new feed is loaded
     by the loadFeed function that the content actually changes.*/
		 
	describe('New Feed Selection', function(){
		var initialFeed;
		var secondaryFeed;
		beforeEach(function(done){
			loadFeed(0, function(){
				initialFeed = $('.feed').html();
				loadFeed (1, done);
			});
		});
		
		it('should change feed content', function() {
			secondaryFeed = $('.feed').html();
			expect(secondaryFeed).not.toEqual(initialFeed);
		});
	});
}());