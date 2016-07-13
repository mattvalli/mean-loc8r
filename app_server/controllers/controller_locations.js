var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://getting-mean-loc8r.herokuapp.com";
}


/* GET 'home' page */
module.exports.homelist = function(req, res) {
	res.render('list-locations', test_data());
};

/* GET 'Location' page */
module.exports.locationInfo = function(req, res) {
	res.render('detail-location', { title: 		'Location Info',
									location:  	test_location_barista()	});
};

/* GET 'Add Review' page */
module.exports.addReview = function(req, res) {
	res.render('form-location-review', { title: 'Add Review' });
};

