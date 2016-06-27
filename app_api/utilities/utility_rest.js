/***********************************************
	REST API UTILITIES

	Provides the an app with short cuts to using
	a REST approach

 ***********************************************/

/*
	Updates the HTTP Response Object with a REST Status and Content

	Parameters:
		res 	- HTTP Response Object
		status 	- REST Status
		content - Content returned from the respones (Could be HTML, JSON, etc)
*/
 module.exports.sendJsonResponse = function(res, status, content) {
 	// Attach the current status of the application
 	res.status(status);
 	// Attach the content of the response
 	res.json(content);
 };

 