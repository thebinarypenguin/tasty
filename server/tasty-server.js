var util = require('util');
var journey = require('journey');


/*
 * Create request router and routing table
 */
var router = new(journey.Router);

router.map(function () {

	// Provide a link to the documentation
    this.get('/').bind(function (req, res) {
        res.send(200, {}, { documentation: "somewhere.com" });
    });
    
    
    // Get all bookmarks
	this.get('/bookmarks').bind(function (req, res, params) {
        res.send(501, {}, { placeholder: "Get all bookmarks", fields: params.fields });
    });
    
    // Create new bookmark
    this.post('/bookmarks').bind(function (req, res, data) {
        res.send(501, {}, { placeholder: "Create new bookmark", input: data });
    });
    
    // Get specified bookmark
    this.get(/^bookmarks\/(\d+)$/).bind(function (req, res, id) {
        res.send(501, {}, { placeholder: 'Get bookmark '+id });
    });
    
    // Update specified bookmark
    this.put(/^bookmarks\/(\d+)$/).bind(function (req, res, id, data) {
        res.send(501, {}, { placeholder: 'Update bookmark '+id, input: data });
    });
    
    // Delete specified bookmark
    this.del(/^bookmarks\/(\d+)$/).bind(function (req, res, id) {
        res.send(501, {}, { placeholder: 'Delete bookmark '+id });
    });
        
    
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


util.puts('tasty listening at http://127.0.0.1:8080');
