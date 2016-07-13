// EXPRESS
var express 				= require('express');
var router 					= express.Router();

// CONTROLLERS
var controller_location 	= require('../controllers/controller_locations');
var controller_other		= require('../controllers/controller_other');

/* GET Request: LOCATIONS	*/
router.get('/', 					controller_location.homelist		);
router.get('/location', 			controller_location.locationInfo	);
router.get('/location/review/new', 	controller_location.addReview		);

/* GET Request: OTHERS		*/
router.get('/about', 				controller_other.about				);
		

// Make the Router Property Public to oustide modules
module.exports = router;
