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


        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty.
         */

         allFeeds.forEach( function(feed) {
           it('have URLs for: ' + feed.name, function() {
             expect(feed.url).toBeDefined();
             /* based on the assumption that a URL can't have less than
             * 10 characters,eg. http://a.co
             */
             expect(feed.url.length).toBeGreaterThan(10);
           });
         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         allFeeds.forEach( function(feed) {
           it('have name for: ' + feed.url, function() {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).toBeGreaterThan(0);
           });
         });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default.
         */
         it('is hidden by default', function() {
           var hasClass = $('body').hasClass('menu-hidden');
           expect(hasClass).toBe(true);
         });

         /* This test ensures the menu changes visibility when
          * the menu icon is clicked. It has two expectations:
          * does the menu display when clicked
          * and does it hide when clicked again.
          */
          it('is shown/hidden when icon clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Because loadFeed() is asynchronous so we will use
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
          loadFeed(0, done);
        });

        it('has at least one feed loaded', function(done){
          var feeds = $('.feed .entry').length;
          expect(feeds).toBeGreaterThan(0);
          done();
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function, the content actually changes.
         * Using 'done' as loadFeed() is asynchronous.
         */
         var oldContent, currentContent;

         beforeEach(function(done) {
           oldContent = $('.feed .entry:first > h2').text();
           /* If the feeds array has more than one item then we test
           * the content changes if we load the second item.
           */
           if (allFeeds.length > 1) {
             loadFeed(1, done);
           }
           /* If the feeds array has only one item we change an element in the
           * DOM and we load the feed again to check it has changed.
           */
           else {
             oldContent = $('.feed .entry:first > h2').text('Dummy text').text();
             loadFeed(0, done);
           }
         });

         it('changes content', function(done){
           currentContent = $('.feed .entry:first > h2').text();
           expect(oldContent).not.toBe(currentContent);
           done();
         });
    });
}());
