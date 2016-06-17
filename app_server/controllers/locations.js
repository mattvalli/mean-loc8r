/* GET 'home' page */
module.exports.homelist = function(req, res) {
	res.render('list-locations', { title: 'Home' });
}

/* GET 'Location' page */
module.exports.locationInfo = function(req, res) {
	res.render('detail-location', { title: 'Location Info' });
}

/* GET 'Add Review' page */
module.exports.addReview = function(req, res) {
	res.render('form-location-review', { title: 'Add Review' });
}