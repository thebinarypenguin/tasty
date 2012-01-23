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
	res.send(501, {} {message: "I'm just a stub."});
};


/**
 * Create new bookmark
 */
exports.createBookmark = function (req, res, body) {
	res.send(501, {} {message: "I'm just a stub."});
};


/**
 * Get specified bookmark
 */
exports.getBookmark = function (req, res, id, params) {
	res.send(501, {} {message: "I'm just a stub."});
};


/**
 * Update specified bookmark
 */
exports.updateBookmark = function (req, res, id, body) {
	res.send(501, {} {message: "I'm just a stub."});
};


/**
 * Delete specified bookmark
 */
exports.deleteBookmark = function (req, res, id) {
	res.send(501, {} {message: "I'm just a stub."});
};
