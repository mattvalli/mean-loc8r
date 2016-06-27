/***********************************************
Used to Route Requests made to the REST API
 ***********************************************/

// Import Express
 var express 	= require('express');
 var router		= express.Router();

// Include Routes
require('./routes_locations');

// Make the Router Property Public to oustide modules
module.exports = router;