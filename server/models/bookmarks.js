var querystring = require('querystring');
var mongodb = require('mongodb');

var config = {
	host: "127.0.0.1",
	port: mongodb.Connection.DEFAULT_PORT,
	database: "tasty",
	serverOptions: {},
	databaseOptions: {
		strict: true
	}
};


var mongoServer = new mongodb.Server(config.host, config.port, config.serverOptions);
var mongoConnection = new mongodb.Db(config.database, mongoServer, config.databaseOptions);

// Get the objectID type - this is the default type of the "_id" field
var ObjectID = require('mongodb').ObjectID;


/**
 * Determine if element is in array
 */
var inArray = function (needle, haystack) {
	for (var i = 0; i < haystack.length; i++) {
		if (haystack[i] === needle) { return true; }
	}
    return false;
};


/**
 * Parse resource id and return as object
 */
var parseId = function (id) {

	// Convert to string
	id += '';

	// Check that id is 24-char hex string
	if (/[a-f0-9]{24}/i.test(id)) {
		return {"_id": new ObjectID(id)};
	} else {
		return null;
	}
	
};


/**
 * Parse filter fields and return as object
 */
var parseFields = function (fields) {

	var obj = {};

	if (fields) {

		var arr = fields.split(',');

		if (inArray('name', arr)) { obj.name = true; }
		if (inArray('url', arr)) { obj.url = true; }
		if (inArray('description', arr)) { obj.description = true; }		

	}
	
	return obj;
};


/**
 * Parse body and return as object
 */
var parseBody = function (body, strict) {	

	var obj = {};

	// Grab name
	if (typeof body.name === 'string') {
		obj.name = body.name;
	}
	
	// Grab url
	if (typeof body.url === 'string') {
		obj.url = body.url;
	}
	
	// Grab description
	if (typeof body.description === 'string') {
		obj.description = body.description;
	}
	
	// Minimum requirements for creation of new bookmark
	if (strict) {
		if (typeof obj.name !== 'string') { return null; }
		if (typeof obj.url !== 'string') { return null; }
	}
	
	return obj;
};


/**
 * Get all bookmarks
 */
exports.getAll = function (params, callback) {
	
	// Validate filter fields
	var fields = parseFields(params.fields);
	
	// Open connection
	mongoConnection.open(function (err, db) {

		if (err) { callback(err, null); return; }
		
		// Get bookmarks collection
		db.collection('bookmarks', function(err, collection) {

			if (err) { callback(err, null); return; }

			// Get all bookmarks
			collection.find({}, fields, function (err, cursor) {

				if (err) { callback(err, null); return; }
			
				// Convert resultset to an array
				cursor.toArray(function (err, docs) {

					if (err) { callback(err, null); return; }

					// Execute callback with array of bookmarks
					callback(null, docs);

				});
			
			});

		});
		
	});
    
};


/**
 * Create new bookmark
 */
exports.create = function (body, callback) {

	// Validate request body
	var data = parseBody(body, true);
	if (data === null) {
		callback( new Error('Invalid message body'), null ); return;
	}
	
	// Open connection
	mongoConnection.open(function (err, db) {
	
		if (err) { callback(err, null); return; }
	
		// Get bookmarks collection
		db.collection('bookmarks', function (err, collection) {			

			if (err) { callback(err, null); return; }

			// Create bookmark			
			collection.insert(data, {safe: true}, function (err, docs) {

				if (err) { callback(err, null); return; }

				// Execute callback with bookmark object
    			callback(null, docs[0]);
    			
			});

		});	
		
	});
	
};


/**
 * Get specified bookmark
 */
exports.get = function (id, params, callback) {

	// Validate resource id
	var query = parseId(id);
	if (query === null) {
		callback( new Error('Invalid resource id'), null ); return;
	}

	// Validate filter fields
	var fields = parseFields(params.fields);

	// Open connection
	mongoConnection.open(function (err, db) {
	
		if (err) { callback(err, null); return; }
	
		// Get bookmarks collection
		db.collection('bookmarks', function(err, collection) {

			if (err) { callback(err, null); return; }

			// Get bookmark			
			collection.find(query, fields, function(err, cursor) {

				if (err) { callback(err, null); return; }

				// Convert resultset to an array				
				cursor.toArray(function (err, docs) {
				
					if (err) { callback(err, null); return; }
				
					// Execute callback with bookmark object
					callback(null, docs[0]);
					
				});
				
			});

		});	
		
	});

};


/**
 * Update specified bookmark
 */
exports.update = function (id, body, callback) {

	// Validate resource id
	var query = parseId(id);
	if (query === null) {
		callback( new Error('Invalid resource id'), null ); return;
	}

	// Validate request body	
	var data = parseBody(body);

	// Open connection
	mongoConnection.open(function (err, db) {
	
		if (err) { callback(err, null); return; }
	
		// Get bookmarks collection
		db.collection('bookmarks', function(err, collection) {			

			if (err) { callback(err, null); return; }

			// Update bookmark			
			collection.update(query, data, {safe: true}, function(err, count) {

				if (err) { callback(err, null); return; }

				// Get bookmark			
				collection.find(query, {}, function(err, cursor) {

					if (err) { callback(err, null); return; }

					// Convert resultset to an array				
					cursor.toArray(function (err, docs) {
				
						if (err) { callback(err, null); return; }
				
						// Execute callback with bookmark object
						callback(null, docs[0]);
					
					});
				
				});
    			
			});

		});	
		
	});

};


/**
 * Delete specified bookmark
 */
exports.remove = function (id, callback) {

	// Validate resource id
	var query = parseId(id);
	if (query === null) {
		callback( new Error('Invalid resource id'), null ); return;
	}

	// Open connection
	mongoConnection.open(function (err, db) {
	
		if (err) { callback(err, null); return; }
	
		// Get bookmarks collection
		db.collection('bookmarks', function(err, collection) {
	
			if (err) { callback(err, null); return; }
			
			// Delete bookmark			
			collection.remove(query, {safe: true}, function(err, count) {
				
				if (err) { callback(err, null); return; }
				
				// Execute callback with result
    			callback(null, true);

			});

		});	
		
	});

};

