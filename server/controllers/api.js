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
		res.send(200, {}, JSON.stringify(docs));
	});
	
};


/**
 * Create new bookmark
 */
exports.createBookmark = function (req, res, body) {

	bookmarks.create(body, function (err, doc) {
		res.send(200, {}, JSON.stringify(doc));
	});
	
};


/**
 * Get specified bookmark
 */
exports.getBookmark = function (req, res, id, params) {

	var doc = bookmarks.get(id, params, function (err, doc) {
		res.send(200, {}, JSON.stringify(doc));
	});

};


/**
 * Update specified bookmark
 */
exports.updateBookmark = function (req, res, id, body) {

	var count = bookmarks.update(id, body, function (err, count) {
		res.send(200, {}, {});	
	});

};


/**
 * Delete specified bookmark
 */
exports.deleteBookmark = function (req, res, id) {
	
	bookmarks.remove(id, function (err, count) {
		res.send(200, {}, {});	
	});
	
};
