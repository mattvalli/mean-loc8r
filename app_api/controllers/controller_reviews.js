/***********************************************
	REST API
	CONTROLLER: 	Reviews

	Provides a Data Access Object for Querying MongoDB 
	using Mongoose
 ***********************************************/

// CONSTANTS - IMPORT
var TESTING_VERBOSE			= true;
var MODEL_DOCUMENT_SCHEMA 	= 'locations';		// Used to select the MongoDB Model Schema

// Import Utilities
var bodyParser		= require('body-parser');
var restUtilities 	= require('../utilities/utility_rest');

// Import MongoDB via Mongoose
var mongoose 				= require('mongoose');
var mongo_model_location 	= mongoose.model(	MODEL_DOCUMENT_SCHEMA	);

// Import API Modules
var module_location = require('./controller_locations');

// CONSTANTS - CONTROLLER
var MSG_LOCATION_ID_NOT_FOUND	= "The requested Location Id could not be found";
var MSG_REVIEW_ID_NOT_FOUND 	= "The requested Review Id could not be found";
var MSG_RESULT_SET_EMPTY_REVIEW	= "No Reviews Found";
var MSG_ERROR_PARAMS_REQUIRED	= "Not Found! The request requires both a Location and Review Id";


// Make functions publicly available that also are used within the module
module.exports = {
	"addReview": addReview,
	"reviewJSONViaPostMethod": reviewJSONViaPostMethod
}

// CREATE
	/*
	 	Returns a response with the following:
	 		- REST Response Status
	 */
	module.exports.create		= function(req,res) {
	 	if (	TESTING_VERBOSE === true	) 	console.log("****\tEnter app_api.controllers.controller_locations.create\t****");

	 	// Get the Location ID from the URL Parameters HashMap
	 	var locationId = req.params.locationId;

	 	// If the Location Id is null
	 	if (!locationId) {
	 		// Inform the user via the response message
	 		restUtilities.sendJsonResponse(res,404,{"message":"You are required to provided location id in the URL."});
	 		return;
	 	}

	 	// Find the location in MongoDB
	 	mongo_model_location.findById(locationId)
	 						.select("reviews")
	 						.exec(function(err,location) {
	 							// If error
	 							if (err) {
	 								restUtilities.sendJsonResponse(res,400,err);
	 								return;
	 							}

	 							// Add a Review to the Reviews Subdocument
	 							addReview(req,res,location);
	 							return;
	 						});
	};

	/* Add a review to the location provided
	 */
	var addReview = function (req, res, location) {
	  	if (	TESTING_VERBOSE === true	) 	console.log("****\tEnter app_api.controllers.controller_locations.addReview\t****");

	  	// If the Location is null
	  	if (!location) {
	  		restUtilities.sendJsonResponse(res,404,{"message":"The Location ID could not be found."});
	  		return;
	  	}

	  	// Push the Review into the Location.Reviews
	  	var review = reviewJSONViaPostMethod(req,res);
	  	console.log("REVIEW" + "\n"
	  				+ "review.author: " 		+ review.author 		+ "\n"
	  				+ "review.rating: " 		+ review.rating 		+ "\n"
	  				+ "review.reviewText: " 	+ review.reviewText 	+ "\n"
	  				+ "review.dateUpdated: " 	+ review.dateUpdated			);
	  	location.reviews.push(	review	);

	  	// Save the updated Location
	  	location.save(function(err,location) {
	  		// Handle Error
	  		if (err) {
	  			restUtilities.sendJsonResponse(res,400,err);
	  			return;
	  		}

	  		// Update the properties requiring processing
	  		module_location.updateAverageRating(location._id);

	  		// Retrieve the Review just added to the location and return it in the response
	  		restUtilities.sendJsonResponse(res, 201, location.reviews[location.reviews.length - 1]);
	  		return;
	  	});
	};

// READ
	/*
	 	RETURNS: 	a Review Object in the Response Object as Content with the following:
	 					- REST Response Status
	 					- Review Object
	 */
	 module.exports.getById 					= function(req,res) {
	 	if (	TESTING_VERBOSE === true	) 	console.log("****\tEnter app_api.controllers.controller_locations.reviewById\t****");

	 	if (req.params && req.params.locationId ) {
	 		// Search the Location Schema for a Location using the ID provided in the Request Parameters via the URI
	 		mongo_model_location.findById(req.params.locationId)
	 							.select('name reviews')
	 							.exec(function(err, location) {
	 			// Create varialbes with local scoped to the function
	 			var response, review;

	 			// If the result set is empty
	 			if (!location) {
	 				// Send a NOT FOUND response with a message informing the client that the record doesn't exist
	 				restUtilities.sendJsonResponse(	res, 
	 												restUtilities.STATUS_NOT_FOUND, 
	 												{	"message": MSG_LOCATION_ID_NOT_FOUND	});
	 				return;
	 			} else if(err) {
	 				// Return the Error
	 				restUtilities.sendJsonResponse(	res, 
	 												restUtilities.STATUS_NOT_FOUND, 
	 												err);
	 				return;
	 			}

	 			// If the location is not null
	 			// Ensure there is at least 1 review for the location
	 			if ( location.reviews && location.reviews.length > 0) {
	 				// Select the review containing the id found in the request parameters
		 			// If it does not exist, the review variable will be null
		 			review = location.reviews.id(req.params.reviewId);

		 			// OPTION OUTPUT - Verify the Data Retrival using Mongoose and JSON objects returned by MongoDB
		 			if (TESTING_VERBOSE === true) {
		 				console.log(		"********************************************"											+ "\n"
			 							+	"Status: location.reviews is NOT NULL and is an array with a length greater than zero" 	+ "\n"
			 							+	"req.params.reviewId: " 																+ "\n"		
			 							+ 	req.params.reviewId 																	+ "\n"
										+	"location.reviews: " 																	+ "\n"
										+ 	location.reviews 																		+ "\n"
			 							+	"location.review.reviewById: " 															+ "\n"
			 							+	review 																					+ "\n"
			 							+	"********************************************"													);
					}

					// If the review is null
		 			if (	!review 	) {
		 				// Inform the cliente that the review id they requested does not exist
		 				restUtilities.sendJsonResponse(	res, 
		 												restUtilities.STATUS_NOT_FOUND, 
		 												{	"message": MSG_REVIEW_ID_NOT_FOUND	}	);
		 			} else {
		 				// Construct a Response Object containing both Location and Review JSON Objects
		 				response = 	{	location: 	{	name: 	location.name,
		 												id: 	req.params.locationId	},
		 								review: 	review
		 							};

			 			// Send a response to the request via the RESPONSE variable of the session
			 			restUtilities.sendJsonResponse(	res, 
			 											restUtilities.STATUS_SUCCESS, 
			 											response);
			 		}

	 			} else {
	 				// There were no reviews stored in the location
	 				restUtilities.sendJsonResponse(	res, 
	 												restUtilities.STATUS_NOT_FOUND, 
	 												{	message: MSG_RESULT_SET_EMPTY_REVIEW	});
	 			}
	 		});

	 	} else {
 			// Send a NOT FOUND response with a descriptive error message
 			restUtilities.sendJsonResponse(	res, 
 											restUtilities.STATUS_NOT_FOUND, 
 											{	"message": MSG_ERROR_PARAMS_REQUIRED	});
	 	}
	 };

	 /*
	 	Returns a response with the following:
	 		- REST Response Status
	 */
	 module.exports.listLocationReviews			= function(req,res) {
	 	if (	TESTING_VERBOSE === true	) 	console.log("****\tEnter app_api.controllers.controller_locations.listLocationReviews\t****");

	 	if (req.params && req.params.locationId ) {
	 		// Search the Location Schema for a Location using the ID provided in the Request Parameters via the URI
	 		mongo_model_location.findById(req.params.locationId)
	 							.select('name reviews')
	 							.exec(function(err, location) {
	 			// Create varialbes with local scoped to the function
	 			var response, review;

	 			// If the result set is empty
	 			if (!location) {
	 				// Send a NOT FOUND response with a message informing the client that the record doesn't exist
	 				restUtilities.sendJsonResponse(	res, 
	 												restUtilities.STATUS_NOT_FOUND, 
	 												{	"message": MSG_LOCATION_ID_NOT_FOUND	});
	 				return;
	 			} else if(err) {
	 				// Return the Error
	 				restUtilities.sendJsonResponse(	res, 
	 												restUtilities.STATUS_NOT_FOUND, 
	 												err);
	 				return;
	 			}

	 			// If the location is not null
	 			// Ensure there is at least 1 review for the location
	 			if ( location.reviews && location.reviews.length > 0) {

		 			// OPTION OUTPUT - Verify the Data Retrival using Mongoose and JSON objects returned by MongoDB
		 			if (TESTING_VERBOSE === true) {
		 				console.log(		"********************************************"											+ "\n"
			 							+	"Status: location.reviews is NOT NULL and is an array with a length greater than zero" 	+ "\n"
			 							+	"req.params.locationId: " 																+ "\n"		
			 							+ 	req.params.locationId 																	+ "\n"
										+	"location.reviews: " 																	+ "\n"
										+ 	location.reviews 																		+ "\n"
			 							+	"********************************************"													);
					}

		 				// Construct a Response Object containing both Location and Review JSON Objects
		 				response = 	{	location: 	{	name: 	location.name,
		 												id: 	req.params.locationId	},
		 								reviews: 	location.reviews
		 							};

			 			// Send a response to the request via the RESPONSE variable of the session
			 			restUtilities.sendJsonResponse(	res, 
			 											restUtilities.STATUS_SUCCESS, 
			 											response);

	 			} else {
	 				// There were no reviews stored in the location
	 				restUtilities.sendJsonResponse(	res, 
	 												restUtilities.STATUS_NOT_FOUND, 
	 												{	message: MSG_RESULT_SET_EMPTY_REVIEW	});
	 			}
	 		});

	 	} else {
 			// Send a NOT FOUND response with a descriptive error message
 			restUtilities.sendJsonResponse(	res, 
 											restUtilities.STATUS_NOT_FOUND, 
 											{	"message": MSG_ERROR_PARAMS_REQUIRED	});
	 	}
	 };

// UPDATE
	/*
		PURPOSE: 	Updates a Review Result on the Location Sub-Document

	 	RETURNS: 	Returns a response with the following:
	 					- REST Response Status
	 */
	 module.exports.updateById 					= function(req,res) {
	 	if ( TESTING_VERBOSE === true ) {
	 		console.log("****\tEnter app_api.controllers.controller_locations.updateById\t****");
	 	}

	 	

	 	// Local Scope Variables
	 	var reviewById;

	 	// Ensure that the Location ID has been provided as a Request Parameter
	 	if ( ! req.params.locationId ) {
	 		// If NOT respond with 404 Code
	 		restUtilities.sendJsonResponse(res, 404, {"message": "Not Found! A Location ID must be provided."});
	 		return;
	 	}

	 	// Ensure that the Location ID has been provided as a Request Parameter
	 	if ( ! req.params.reviewId ) {
	 		// If NOT respond with 404 Code
	 		restUtilities.sendJsonResponse(res, 404, {"message": "Not Found! A Review ID must be provided."});
	 		return;
	 	}

	 	// Use the Location ID provided as a Request Parameter
	 	// Select only the relevent info
	 	mongo_model_location.findById(req.params.locationId)
	 						.select('reviews')
	 						.exec(function(err,location){
	 							// Handle Error
								if (err) {
									restUtilities.sendJsonResponse(res, 400, err);
									return;
								}

								// Handle a Null Location
								if ( ! location ) {
									restUtilities.sendJsonResponse(res,404, {"message": "Could not find a location matching the Location ID"});
									return;
								}
								// Check to see if the location.reviews exists
								if ( !location.reviews || location.reviews <= 0 ) {
									restUtilities.sendJsonResponse(res, 404, "The Location does not contain any Reviews");
								}

								// The Location has Reviews
								// Select the review by its ID
								reviewById = location.reviews.id(req.params.reviewId);

								// Handle a null object
								if ( ! reviewById ) {
									restUtilities.sendJsonResponse(res,404,{"message":"Could not find a review matching hhe Review ID"});
									return;
								}

								// Update the instance properties
								updateReviewFromRequestBody(req,reviewById);

								// Save the location
								location.save(function(err,location) {
									// Handle Error as result of Save
									if (err) {
										restUtilities.sendJsonResponse(res, 404, err);
										return;
									}

									// Success
									module_location.updateAverageRating(location._id);
									restUtilities.sendJsonResponse(res,200,location.reviews.id(req.params.reviewId));
								});
	 						});
	 	return;
	 };

// DELETE
	/*

	 	Returns a response with the following:
	 		- REST Response Status
	 */
	module.exports.deleteById 					= function(req,res) {
		// Check to see if the Location and Review IDs have been supplied via URL Parameters
		if ( ! req.params.locationId || ! req.params.reviewId ) {
			restUtilities.sendJsonResponse(res, 404, {"message": "Not found, locationId and reviewId are both required", });
		}

		// Select only the Reviews from the Location
		mongo_model_location.findById(req.params.locationId)
							.select('reviews')
							.exec(function(err,location){
								// Handle any Errors
								if (err) {
									restUtilities.sendJsonResponse(res, 400, err);
									return;
								}

								// Check to see if the location exists
								if ( ! location ) {
									// Respond to the request
									restUtilities.sendJsonResponse(res,404,{"message": "Location ID not found"});
									return;
								}

								// Ensure the Locations has reviews
								if (location.reviews && location.reviews.length > 0) {
									// Check to see if the Specific Review exists
									if ( ! location.reviews.id(req.params.reviewId) ) {
										restUtilities.sendJsonResponse(res,404,{"message": "Review ID not found"});
										return;
									}

								// The review exists, now delete
									location.reviews.id(req.params.reviewId).remove();

									// Save the changes to the Location Document
									location.save(function(err,location) {
										// Handle any Errors
										if (err) {
											restUtilities.sendJsonResponse(res,400,err);
											return;
										} else {
											// Success
											// Update the Overall Rating of the Location
											module_location.updateAverageRating(location._id);
											// Return Null as appropriate with DELETE Request Method
											restUtilities.sendJsonResponse(res,204, null);
											return;
										}
									});
								} else {
									// There are no reviews
									restUtilities.sendJsonResponse(res, 404, {"message": "No reviews to delete" });
									return;
								}
							}); 
	};


// CONVENIENCE METHODS
	// UPDATE
		var updateReviewFromRequestBody = function(req,review){
			if (TESTING_VERBOSE === true) {
				console.log("****\tEnter app_api.controllers.controller_reviews.updateReviewFromRequestBody\t****");
				console.log("REQUEST BODY DUMP");
				console.log("req.body.author: " 	+ req.body.author);
				console.log("req.body.rating: " 	+ req.body.rating);
				console.log("req.body.reviewText: " + req.body.reviewText);
			}

			// Use the Review Reference to update the Review
			review.author		= 	req.body.author;
			review.rating 		=	req.body.rating;
			review.reviewText	=	req.body.reviewText;
			review.dateUpdated 	= 	new Date();
		};
	/* Get the review object via the POST Method */
	var reviewJSONViaPostMethod = function(req,res) {
		if (TESTING_VERBOSE === true) {
				console.log("****\tEnter app_api.controllers.controller_reviews.reviewJSONViaPostMethod\t****");
				console.log("REQUEST BODY DUMP");
				console.log("req.body.author: " 	+ req.body.author);
				console.log("req.body.rating: " 	+ req.body.rating);
				console.log("req.body.reviewText: " + req.body.reviewText);
				console.log("dateUpdated: " + new Date());
			}

		return {	"author": 		req.body.author,
					"rating": 		req.body.rating,
					"reviewText": 	req.body.reviewText,
					"dateUpdated": 	new Date()				};
	};

