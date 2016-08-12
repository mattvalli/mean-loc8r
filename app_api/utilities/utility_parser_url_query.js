/***********************************************
	REST API UTILITIES - URL PARSER

	Provides a utility for parsing common variables from a URL

 ***********************************************/

// CONSTANTS
var TESTING_VERBOSE = true;

/* 	Parses URL for query containing geoJSON coordinates
	
	PRECONDITIONS
		Query contains the following variables:
			lng - Represents Longitude
			lat - Represents Latitude

	RETURNS - an Coordinate Array of doubles represinting longitude and latitude:
		 		coords[0] - Longitude
		 		coords[1] - Latitude
 */
 module.exports.queryCoordinates = function(req,res) {
 	if (TESTING_VERBOSE === true ) 
 		console.log("****\tEnter app_api.utilities.utility_parser_url_query.queryCoordinates\t****");

 	// If the request does not contain a Lat
 	if ( !req.query.lng 	|| 		!req.query.lat ) {
 		return {"message":"lng and lat query parameters are required"};
 	}

 	// Else Construct the Coords Array
 	return [	parseFloat(req.query.lng)	,
 				parseFloat(req.query.lat)	];
 };

 module.exports.queryCoordinatesAsPoint = function(req,res) {
 	if (TESTING_VERBOSE === true ) 
 		console.log("****\tEnter app_api.utilities.utility_parser_url_query.queryCoordinatesAsPoint\t****");

 	// Store the response
 	var response = this.queryCoordinates(req,res);	

 	// If the response from this.queryCoordinates does not contain a message
 	if (!response.message) {
 		// Construct and Return a Point Object
 		return { 	"type": 		"Point", 
 					"coordinates": 	response	};
 	}

 	if (TESTING_VERBOSE)
 		console.log("!!!!!\tRequest Failed: " + response.message + "\t!!!!!");

  	// Otherwise, we should return the response from this.queryCoordinates
 	return response;
 };

 module.exports.queryMaxDistance = function(req,res) {
 	if (TESTING_VERBOSE === true ) 
 		console.log("****\tEnter app_api.utilities.utility_parser_url_query.queryMaxDistance\t****");

 	if ( !req.query.maxDist ) { return null; }
 	return parseFloat(req.query.maxDist);
 };

