var journey = require('journey');
var api = require('./controllers/api');


/*
 * Create request router and routing table
 */
var router = new(journey.Router);

router.map(function () {

    this.get('/').bind(api.getDocUrl);
    
	this.get('/bookmarks').bind(api.getAllBookmarks);
	
    this.post('/bookmarks').bind(api.createBookmark);
    this.get(/^bookmarks\/([a-zA-Z0-9]+)$/).bind(api.getBookmark);
    this.put(/^bookmarks\/([a-zA-Z0-9]+)$/).bind(api.updateBookmark);
    this.del(/^bookmarks\/([a-zA-Z0-9]+)$/).bind(api.deleteBookmark);
        
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
