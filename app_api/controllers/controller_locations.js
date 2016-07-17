/***********************************************
	REST API
	CONTROLLER: 	Locations

	Provides a Data Access Object for Querying MongoDB 
	using Mongoose
 ***********************************************/

// CONSTANTS
var TESTING_VERBOSE			= true;
var MODEL_DOCUMENT_SCHEMA 	= 'locations';		// Used to select the MongoDB Model Schema
var MAX_RESULT_SET_SIZE		= 10;				// Limit the number of results returned from MongoDB query

// ERROR MESSAGES
var MSG_ERROR_NO_ID 	= "No locationId in request";
var MSG_ERROR_NO_RESULT	= "The Location Id provided does not exist";

// Import Utilities
var restUtilities 	= require('../utilities/utility_rest');
var urlQueryParser	= require('../utilities/utility_parser_url_query');
var util_geoJSON	= require('../utilities/utility_geoJSON');

// Import MongoDB via Mongoose
var mongoose = require('mongoose');
var mongo_model_location = mongoose.model(	MODEL_DOCUMENT_SCHEMA	);

// Import Subdocument Controllers
var reviewController = require('./controller_reviews');


var Earth = (function() {
 	// CONTANTS
 	var RADIUS_EARTH_KILOMETERS = 6371;
 	var RADIUS_EARTH_MILES		= 3959;

 	// Functions
 	var getDistanceFromRadians = function(radians) {
 		// Radians * Radius
 		return parseFloat(radians * RADIUS_EARTH_KILOMETERS);
 	};

 	var getRadiansFromDistance = function(distance) {
 		// Distance / Radius
 		return parseFloat(distance / RADIUS_EARTH_KILOMETERS);
 	};

 	return {
 		getDistanceFromRadians : getDistanceFromRadians,
 		getRadiansFromDistance : getRadiansFromDistance
 	};
 })();

// CREATE
	/*
	 	Returns a response with the following:
	 		- REST Response Status
	 */
	 module.exports.create 	= function(req,res) {
	 	if (TESTING_VERBOSE === true) 
	 		console.log("*****\tEnter app_api.controllers.controller_locations.create\t*****");

	 	// Get the Data POSTED to Request via <form>
	 	var locationFromRequestBody	= {		"name": 				req.body.name,
	 										"address": 				req.body.address,
	 										"facilities": 			req.body.facilities.split(','),

	 										"coords": 				[	parseFloat(req.body.lng),
	 																	parseFloat(req.body.lat)	],

	 										"hoursOfOperation": 	[	
	 																	{	"days": 	req.body.days,
	 																		"opening": 	req.body.opening,
	 																		"closing": 	req.body.closing,
	 																		"closed": 	req.body.closed 
	 																	}	
	 																]
	 				   };

	 	// Insert the Location into MongoDB
	 	mongo_model_location.create(locationFromRequestBody, function(err,location) {
	 		if (TESTING_VERBOSE === true)
	 			console.log("*****\tEnter app_api.controllers.controller_locations.create.MONGOOOSE.create.anonymous\t*****");

 			if (err) {
 				restUtilities.sendJsonResponse(res, 400, err);
 				return;
 			}

 			// If the locations is null
 			if ( !location ) {
 				// Inform the client
 				var message = "The location was not returned by the Database.";
 				if (TESTING_VERBOSE === true)
 					console.log("!!!!!\t" + message + "\t!!!!!");

 				restUtilities.sendJsonResponse(res, 404, {"message":message});
 				return;
 			}

 			// Send a response to the request via the RESPONSE variable of the session
		 	restUtilities.sendJsonResponse(res, '201', { 	status: restUtilities.STATUS_CREATED 	});
		 	return;
	 	});
	 };

// READ
	/*
	 	Returns a response with the following:
	 		- REST Response Status
	 		- Location Object
	 */
	 module.exports.getById 	= function(req,res) {
	 	if (TESTING_VERBOSE === true) console.log("Enter controller_locations.getById");

	 	if (req.params && req.params.locationId ) {
	 		// Search the Location Schema for a Location using the ID provided in the Request Parameters via the URI
	 		mongo_model_location.findById(req.params.locationId).exec(function(err, location) {

	 			// If the result set is empty
	 			if (!location) {
	 				// Send a NOT FOUND response with a message informing the client that the record doesn't exist
	 				restUtilities.sendJsonResponse(res, restUtilities.STATUS_NOT_FOUND, {
	 					"message": MSG_ERROR_NO_RESULT
	 				});
	 				return;

	 			} else if(err) {
	 				restUtilities.sendJsonResponse(res, restUtilities.STATUS_NOT_FOUND, err);
	 				return;
	 			}
	 		
	 			// Send a response to the request via the RESPONSE variable of the session
	 			restUtilities.sendJsonResponse(res, restUtilities.STATUS_SUCCESS, location);
	 			return;
	 		});

	 	} else {
 			// Send a NOT FOUND response with a descriptive error message
 			restUtilities.sendJsonResponse(res, restUtilities.STATUS_NOT_FOUND, {
 				"message": MSG_ERROR_NO_ID
 			});
 			return;
	 	}
	 		
	 	
	 };

	/*
	 	Returns a response with the following:
	 		- REST Response Status
	 		- Location[] Object
	 */
	 module.exports.listLocationsByDistance = function(req, res) {
	 	if (TESTING_VERBOSE === true) console.log("****\tEnter controller_locations.listLocationsByDistance\t****");



	 	// Contruct a Point Object from the Coordinates found in the URL Query
	 	var geoJSONPoint = urlQueryParser.queryCoordinatesAsPoint(req,res);
	 	// Get the max distance from the URL Query
	 	var maxDistance = urlQueryParser.queryMaxDistance(req,res);


	 	if (TESTING_VERBOSE === true) console.log("req.query.lng: " + req.query.lng);
	 	if ( !geoJSONPoint ) {
				// Get the a Location from MongoDb though the Location Schema
		 		mongo_model_location.find().exec(function(err, locations) {
		 		// Return Response
		 		restUtilities.sendJsonResponse(res, 200, locations);
		 		return;
	 		});
		}

	 	// Get the Coordinates as a Point Object from the URL
	 	if (TESTING_VERBOSE) {
	 		console.log(	"URL Query - Point Object: " 	+ util_geoJSON.pointAsString(geoJSONPoint) 	+ "\n"
	 					+	"URL Query - Max Distance: " 	+ maxDistance 								+ "\n"
	 					+ 	"Converted to Radians: "		+ Earth.getRadiansFromDistance(maxDistance)			);
		}


		// Define the Geo Search as Spherical (Coordinates on Globe)
		var geoOptions = { 	"spherical": 	true,
							"maxDistance": 	Earth.getRadiansFromDistance(maxDistance),
							"num": 			MAX_RESULT_SET_SIZE  };

		// TODO - DEFINE OPTIONS AND CALLBACK

		
		// Query MongoDB for Objects near the specified GeoJSON Point/Coordinates
		mongo_model_location.geoNear(geoJSONPoint, geoOptions, function(err,results,stats) {
			if (TESTING_VERBOSE) {
				console.log("Executed geoNear callback");
				console.log("RESULTS:");
				console.log(results);
			}

			if ( err ) {
				restUtilities.sendJsonResponse(res, 404, err);
				return;
			}
			if ( !results ) {
				restUtilities.sendJsonResponse(res, 404, {"message":"Could not find any locations within the specified distance"});
				return;
			}
			
			// Create an Array to store the locations in
			var locations = geoNearSetToLocationListArray(results);

			restUtilities.sendJsonResponse(res, '200', locations);
			return;
		});
	 };

	 /*
	 	Returns a response with the following:
	 		- REST Response Status
	 		- Location[] Object
	 */
	 module.exports.listLocations = function(req, res) {
	 	if (TESTING_VERBOSE === true) console.log("Enter controller_locations.listLocationsByDistance");
	 	
	 	// Get the a Location from MongoDb though the Location Schema
	 	mongo_model_location.find().exec(function(err, locations) {
	 		// Return Response
	 		restUtilities.sendJsonResponse(res, 200, locations);
	 		return;
	 	});
	 };

// UPDATE
	/*
	 	Returns a response with the following:
	 		- REST Response Status
	 */
	 module.exports.updateById 	= function(req,res) {
	 	if (TESTING_VERBOSE === true) console.log("Enter controller_locations.updateById");

	 	return;
	 };


// DELETE
	/*
	 	Returns a response with the following:
	 		- REST Response Status
	 */
	 module.exports.deleteById 	= function(req,res) {
	 	if (TESTING_VERBOSE === true) console.log("Enter controller_locations.deleteById");

	 	return;
	 };


// CONVENIENCE METHODS
	// CALCULATIONS
	/* Update the Average Rating for a Location
	 */
	module.exports.updateAverageRating = function (location) {
		if (TESTING_VERBOSE === true ) 
 		console.log("****\tEnter app_api.controllers.controller_locations.updateAverageRating\t****");

		var ratingTotal, ratingAverage, reviewCount, i;

		if (location.reviews && location.reviews.length > 0) {
			// Get all Reviews for the Location matching the provided ID
			reviewCount = location.reviews.length;
			ratingTotal = 0;

			// Loop through each review and sum the rating property
			for (i = 0; i < reviewCount; i++) {
				// Get the review at the current index and add its' rating to the total
				ratingTotal += location.reviews[i].rating;
			}

			// Divide the Sum of Ratings by the Number of Reviews (array.length)
			ratingAverage = parseInt(	ratingTotal / reviewCount,	10	);

			// Update the Location object and Persist
			location.rating = ratingAverage;
			location.save(function (err) {
				if (err) {	console.log(err);	}

				// Success
				console.log("Average Rating update to: " + ratingAverage);
			});
		}
	}

	// CALL BACK METHODS
	/* Converts a Result Set from MongoDB and converts the data into a relevent Object */
	var geoNearSetToLocationListArray = function (geoNearResultSet) {
		if (TESTING_VERBOSE === true)
			console.log("*****\tEnter app_api.controllers.controller_locations.geoNearSetToLocationArray\t*****");
		// Create an Array to store the locations in
		var locations = [];

		// Process each result as an individual document
		geoNearResultSet.forEach(function(doc) {
			console.log(doc.obj.name);

			// Add the Result to the locations array
			locations.push({
				"distance": 	Earth.getDistanceFromRadians(doc.dis),
				"name": 		doc.obj.name,
				"address": 		doc.obj.address,
				"rating": 		doc.obj.rating,
				"facilities:": 	doc.obj.facilities,
				"_id": 			doc.obj._id	
			});
		});

		return locations;
	}
