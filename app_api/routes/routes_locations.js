/***********************************************
	Defines Controller for Location Routes in the REST API
 ***********************************************/

 // Import Express
 var express 	= require('express');
 var router		= express.Router();

 // Include Controller Classes
 var controller_location 	= require('../controllers/controller_locations');
 var controller_review		= require('../controllers/controller_reviews');

// Location Requests
	// List Locations
	router.get('/locations', 					controller_location.listLocations		);
	router.get('/locationsNearBy', 					controller_location.listLocationsByDistance		);
	// Create Location
	router.post('/locations',					controller_location.create				);
	// Read Location by Id
	router.get('/locations/:locationId', 		controller_location.getById				);
	// Update Location By Id
	router.put('/locations/:locationId',		controller_location.updateById					);
	// Delete Location By Id
	router.delete('/locations/:locationId',		controller_location.deleteById					);

// SUB-DOCUMENTS
	// Reveiw
	// List Location Reviews
	router.get('/locations/:locationId/reviews', 				controller_review.listLocationReviews	);
	// Create Review under Location
	router.post('/locations/:locationId/reviews',				controller_review.create	);
	// Get Review under Location
	router.get('/locations/:locationId/reviews/:reviewId',		controller_review.getById			);
	// Update Review under Location
	router.put('/locations/:locationId/reviews/:reviewId',		controller_review.updateById			);
	// Delete Review under Location
	router.delete('/locations/:locationId/reviews/:reviewId',	controller_review.deleteById			);

// EXPORT so that 'app.js' can use the router in the application
module.exports = router;