
var vows = require('vows');
var assert = require('assert');

var client = require('./lib/test-client.js');

var resources = {

	createId: null,    // Will be set below
	createBody: {
		name: 'Example Site',
		url: 'http://example-site.com',
		description: 'This is an example site'
	},
	     	
	updateBody: {
		name: 'Example Site Updated',
		url: 'http://example-site-updated.com',
		description: 'This is an example site updated'
	}
	
};

// Create a Test Suite
var suite = vows.describe('Public API');


/**
 * Test API status codes
 */
suite.addBatch({

	'GET /': {
	
		topic: function () {
			client.get('/', this.callback);
		},
		
		'should return 200 OK': function (err, response) {
			assert.isNull(err);
			assert.equal(response.responseCode, '200');
		}
	
	}

}).addBatch({

	'GET /bookmarks': {
	
		topic: function () {
			client.get('/bookmarks', this.callback);
		},
		
		'should return 200 OK': function (err, response) {
			assert.isNull(err);
			assert.equal(response.responseCode, '200');
		}
	
	} 

}).addBatch({

	'POST /bookmarks': {
	
		topic: function () {
			client.post('/bookmarks', resources.createBody, this.callback);
		},
		
		'should return 200 OK': function (err, response) {
			assert.isNull(err);
			assert.equal(response.responseCode, '200');
			
			resources.createId = JSON.parse(response.responseBody)._id;
		}
	
	}

}).addBatch({
	
	'GET /bookmarks/resource-id': {
	
		topic: function () {
			client.get('/bookmarks/'+resources.createId, this.callback);
		},
		
		'should return 200 OK': function (err, response) {
			assert.isNull(err);
			assert.equal(response.responseCode, '200');
		}
	
	}

}).addBatch({

	'PUT /bookmarks/resource-id': {
	
		topic: function () {
			client.put('/bookmarks/'+resources.createId, resources.updateBody, this.callback);
		},
		
		'should return 200 OK': function (err, response) {
			assert.isNull(err);
			assert.equal(response.responseCode, '200');
		}
	
	}

}).addBatch({

	'DELETE /bookmarks/resource-id': {
	
		topic: function () {
			client.del('/bookmarks/'+resources.createId, this.callback);
		},
		
		'should return 200 OK': function (err, response) {
			assert.isNull(err);
			assert.equal(response.responseCode, '200');
		}
	
	}

}).export(module);
