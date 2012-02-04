
var vows = require('vows');
var assert = require('assert');

var bookmarks = require('../models/bookmarks.js');

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
	},
	
	invalidId: null,            
	invalidBody: {}
	
};


// Create a Test Suite
var suite = vows.describe('Bookmarks Model (bookmarks.js)');


/**
 * Test the create, get, update and remove methods in that order
 */
suite.addBatch({

	'Calling create method with a valid body': {
	
		topic: function () {
			bookmarks.create(resources.createBody, this.callback);
		},
		
		'returns the new bookmark': function (err, bookmark) { 
			
			assert.isNull(err);
			
			assert.equal(bookmark.name, resources.createBody.name);
			assert.equal(bookmark.url, resources.createBody.url);
			assert.equal(bookmark.description, resources.createBody.description);	
			
			resources.createId = bookmark._id;		
			
		}
	
	},
	
	'Calling create method with an invalid body': {
	
		topic: function () {
			bookmarks.create(resources.invalidBody, this.callback);
		},
		
		'returns an error': function (err, id) {
			assert.instanceOf(err, Error);
			assert.isNull(id);
		}
	
	}
    
}).addBatch({

	'Calling get method with a valid id': {
	
		topic: function () {
			bookmarks.get(resources.createId, {}, this.callback);
		},
		
		'returns the specified bookmark': function (err, bookmark) {
		
			assert.isNull(err);
			
			assert.equal(String(bookmark._id), String(resources.createId));
			assert.equal(bookmark.name, resources.createBody.name);
			assert.equal(bookmark.url, resources.createBody.url);
			assert.equal(bookmark.description, resources.createBody.description);			
			
		}
	
	},

	'Calling get method with an invalid id': {
	
		topic: function () {
			bookmarks.get(resources.invalidId, {}, this.callback);
		},
		
		'returns an error': function (err, bookmark) {
			assert.instanceOf(err, Error);
			assert.isNull(bookmark);
		}
	
	}

}).addBatch({

	'Calling update method with a valid id': {
	
		topic: function () {
			bookmarks.update(resources.createId, resources.updateBody, this.callback);
		},
		
		'returns the updated bookmark': function (err, bookmark) {
		
			assert.isNull(err);
			
			assert.equal(String(bookmark._id), String(resources.createId));
			assert.equal(bookmark.name, resources.updateBody.name);
			assert.equal(bookmark.url, resources.updateBody.url);
			assert.equal(bookmark.description, resources.updateBody.description);			
			
		}
		
	},

	'Calling update method with an invalid id': {
	
		topic: function () {
			bookmarks.update(resources.invalidId, resources.createBody, this.callback);
		},
		
		'returns an error': function (err, bookmark) {
			assert.instanceOf(err, Error);
			assert.isNull(bookmark);		
		}
		
	}
		
}).addBatch({

	'Calling remove method with a valid id': {
	
		topic: function () {
			bookmarks.remove(resources.createId, this.callback);		
		},
				
		'returns true': function (err, result) {
			assert.isNull(err);
			assert.isTrue(result); 
		}
		
	},
	
	'Calling remove method with an invalid id': {
	
		topic: function () {
			bookmarks.remove(resources.invalidId, this.callback);		
		},
		
		'returns an error': function (err, result) { 
			assert.instanceOf(err, Error);
			assert.isNull(result); 
		}
		
	},

});


/**
 * Test the getAll method and the fields filter
 */
suite.addBatch({

	'Calling getAll method': {
	
		topic: function () {
			bookmarks.getAll({}, this.callback);
		},
		
		'returns an array of bookmarks': function (err, bookmarks) {
			assert.isNull(err);
			
			assert.isArray(bookmarks);
			
			// is an array of bookmarks
			assert.isTrue((function (b) {
				for (var i=0; i<b.length; i++) {
					if (b[i]._id === undefined) { return false; }
					if (b[i].name === undefined) { return false; }
					if (b[i].url === undefined) { return false; }
				}
				return true;
			})(bookmarks));
			
		}
	
	}	

});


suite.export(module);
