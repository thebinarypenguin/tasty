var journey = require('journey');
var tasty = require('tasty');


/*
 * Create request router and routing table
 */
var router = new(journey.Router);

router.map(function () {

    this.get('/').bind(tasty.getDocUrl);
    
	this.get('/bookmarks').bind(tasty.getAllBookmarks);
	
    this.post('/bookmarks').bind(tasty.createBookmark);
    this.get(/^bookmarks\/([a-zA-Z0-9]+)$/).bind(tasty.getBookmark);
    this.put(/^bookmarks\/([a-zA-Z0-9]+)$/).bind(tasty.updateBookmark);
    this.del(/^bookmarks\/([a-zA-Z0-9]+)$/).bind(tasty.deleteBookmark);
        
});


/*
 * Create HTTP server
 */
require('http').createServer(function (request, response) {

    var body = "";

	// Collect message body
    request.addListener('data', function (chunk) { body += chunk });

	// Hand off to router
    request.addListener('end', function () {
        router.handle(request, body, function (result) {
            response.writeHead(result.status, result.headers);
            response.end(result.body);
        });
    });
    
}).listen(8080);


console.log('tasty listening at http://127.0.0.1:8080');
