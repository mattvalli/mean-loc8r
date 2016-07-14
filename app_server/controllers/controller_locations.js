// CONSTANTS
var TESTING_VERBOSE = true;


// CONSUME REST API
var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://getting-mean-loc8r.herokuapp.com";
}

// 
var requestOptions = {
  url : "http://yourapi.com/api/path",
  method : "GET",
  json : {},
  qs: { offset: 20 }
};

/***** TESTING *****/
var testData = require('../testdata/test_locations');

/* GET 'home' page */
module.exports.homelist = function(req, res) {
    if (TESTING_VERBOSE === true ) 
        console.log("****\tEnter app_server.controllers.controller_locations.homelist\t****");

	res.render('list-locations', testData.testSampleListLocationsJSON());
};

/* GET 'Location' page */
module.exports.locationInfo = function(req, res) {
    if (TESTING_VERBOSE === true ) 
        console.log("****\tEnter app_server.controllers.controller_locations.locationInfo\t****");

	res.render('detail-location', { "title": 		'Location Info',
									"location":  	testData.test_location_barista()	});
};

/* GET 'Add Review' page */
module.exports.addReview = function(req, res) {
    if (TESTING_VERBOSE === true ) 
        console.log("****\tEnter app_server.controllers.controller_locations.addReview\t****");
    
	res.render('form-location-review', { title: 'Add Review' });
};

