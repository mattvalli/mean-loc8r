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

// Modules
var util_geoJSON = require('../../app_api/utilities/utility_geoJSON');

/***** TESTING *****/
var testData = require('../testdata/test_locations');

/* GET 'home' page */
module.exports.homelist = function(req, res) {
    if (TESTING_VERBOSE === true ) 
        console.log("****\tEnter app_server.controllers.controller_locations.homelist\t****");

    // Handle passing the Model Data to the Template File
    // Local vars
    var requestOptions, path;

    // Define the PATH
    path = '/api/locationsNearBy';

    // Create the Request Options
    requestOptions = {  "url":      apiOptions.server + path,
                        "method":   "GET",
                        "json":     {},
                        "qs":       {   "lng":          -122.6604369,
                                        "lat":          45.5134441,
                                        "maxDistance":  2500            }
                    };

    // Make a request to the REST API
    request(requestOptions, function(err, response, body){

        // Local Vars
        var i, data;
        data = body;

        if (response.statusCode === 200 && data.length) {
            // Format some of the data set
            homelist_processData(data);
        }

        // Render the View
        renderHomepage(req, res, data);
    });
};

/* Formats the data for the homelist function */
var homelist_processData = function(data) {
     if (TESTING_VERBOSE === true ) 
        console.log("****\tEnter app_server.controllers.controller_locations.homelist_processData\t****");

    // Loop through the data and format the distance
    for (i = 0; i < data.length; i++) {
        // Loop vars
        var locationDistance = data[i].distance;
        // Check to see the location distance is valid
        if ( !locationDistance || isNaN(locationDistance) ) {
            if (locationDistance == 0) {
                data[i].distance = "You are Here!";
            } else {
                data[i].distance = "Unknown";
            }
            continue;
        }

        // Format distance
        data[i].distance = util_geoJSON.formatDistance(locationDistance);
    }
}

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


/* HELPER METHODS */
var renderHomepage = function(req,res, responseBody) {
    if (TESTING_VERBOSE === true ) 
        console.log("****\tEnter app_server.controllers.controller_locations.renderHomepage\t****");

    // Local Vars
    var message = null;

    // Check to see if the response is an array
    if ( !(responseBody instanceof Array) ) {
        message = "API lookup error";
        responseBody = [];
    } else {
        // if the requestBody has zero elements
        if (!responseBody.length) {
            message = "No places found nearby";
        }
    }

    // Pass the Model data to the Template File
    res.render('list-locations', testData.testSampleListLocationsJSON(responseBody, message));
};