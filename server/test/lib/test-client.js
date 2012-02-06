var http = require('http');
var querystring = require('querystring');

var config = {
	host: '127.0.0.1',
	port: 8080
};


/**
 * Make a simple GET request
 */
exports.get = function (uri, callback) {

	var options = {
		host: config.host,
		port: config.port,
		method: 'GET', 
		path: uri
	};

	// Start request
	var req = http.request(options, function(res) {

		var output = {};

		// Save response code
		output.responseCode = res.statusCode;
	
		// When we get data, save it to response body
		res.on('data', function (chunk) {
			output.responseBody = chunk + '';
		});
		
		// When we are done, execute callback
		res.on('end', function() {
			callback(null, output);
		});
		  
	});
	
	// When we get an error, execute callback
	req.on('error', function (err) {
		callback(err, null);
	});
	
	// Finish sending the request
	req.end();
	
};


/**
 * Make a simple POST request
 */
exports.post = function (uri, body, callback) {

	var options = {
		host: config.host,
		port: config.port,
		method: 'POST', 
		path: uri
	};

	// Start request
	var req = http.request(options, function(res) {

		var output = {};

		// Save response code
		output.responseCode = res.statusCode;
	
		// When we get data, save it to response body
		res.on('data', function (chunk) {
			output.responseBody = chunk + '';
		});
		
		// When we are done, execute callback
		res.on('end', function() {
			callback(null, output);
		});
		  
	});
	
	// When we get an error, execute callback
	req.on('error', function (err) {
		callback(err, null);
	});
	
	// Write request body
	req.write(querystring.stringify(body));
	
	// Finish sending the request
	req.end();

};


/**
 * Make a simple PUT request
 */
exports.put = function (uri, body, callback) {

	var options = {
		host: config.host,
		port: config.port,
		method: 'PUT', 
		path: uri
	};

	// Start request
	var req = http.request(options, function(res) {

		var output = {};

		// Save response code
		output.responseCode = res.statusCode;
	
		// When we get data, save it to response body
		res.on('data', function (chunk) {
			output.responseBody = chunk + '';
		});
		
		// When we are done, execute callback
		res.on('end', function() {
			callback(null, output);
		});
		  
	});
	
	// When we get an error, execute callback
	req.on('error', function (err) {
		callback(err, null);
	});
	
	// Write request body
	req.write(querystring.stringify(body));
	
	// Finish sending the request
	req.end();

};


/**
 * Make a simple DELETE request
 */
exports.del = function (uri, callback) {

	var options = {
		host: config.host,
		port: config.port,
		method: 'DELETE', 
		path: uri
	};

	// Start request
	var req = http.request(options, function(res) {

		var output = {};

		// Save response code
		output.responseCode = res.statusCode;
	
		// When we get data, save it to response body
		res.on('data', function (chunk) {
			output.responseBody = chunk + '';
		});
		
		// When we are done, execute callback
		res.on('end', function() {
			callback(null, output);
		});
		  
	});
	
	// When we get an error, execute callback
	req.on('error', function (err) {
		callback(err, null);
	});
	
	// Finish sending the request
	req.end();

};

