var bookmarks = require('../models/bookmarks.js');


/**
 * Get documentation URL
 */
exports.getDocUrl = function (req, res) {
	res.sendBody('Documentation for this API can be found at http://github.com/thebinarypenguin/tasty');
};


/**
 * Get all bookmarks
 */
exports.getAllBookmarks = function (req, res, params) {

	bookmarks.getAll(params, function (err, docs) {

		if (err) {
			res.send(500, {}, {error: err.message});
		} else {
			res.send(200, {}, JSON.stringify(docs));
		}
		
	});
	
};


/**
 * Create new bookmark
 */
exports.createBookmark = function (req, res, body) {

	bookmarks.create(body, function (err, doc) {

		if (err) {
			res.send(500, {}, {error: err.message});
		} else {
			res.send(200, {}, JSON.stringify(doc));
		}

	});
	
};


/**
 * Get specified bookmark
 */
exports.getBookmark = function (req, res, id, params) {

	bookmarks.get(id, params, function (err, doc) {
	
		if (err) {
			res.send(500, {}, {error: err.message});
		} else {
			res.send(200, {}, JSON.stringify(doc));
		}	

	});

};


/**
 * Update specified bookmark
 */
exports.updateBookmark = function (req, res, id, body) {

	bookmarks.update(id, body, function (err, count) {

		if (err) {
			res.send(500, {}, {error: err.message});
		} else {
			res.send(200, {}, {count: count});
		}
	
	});

};


/**
 * Delete specified bookmark
 */
exports.deleteBookmark = function (req, res, id) {
	
	bookmarks.remove(id, function (err, count) {

		if (err) {
			res.send(500, {}, {error: err.message});
		} else {
			res.send(200, {}, {count: count});
		}
	
	});
	
};
