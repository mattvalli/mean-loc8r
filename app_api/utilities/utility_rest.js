/***********************************************
	REST API UTILITIES

	Provides the an app with short cuts to using
	a REST approach

 ***********************************************/


 // REST RESPONSE STATUS
module.exports.STATUS_SUCCESS					= '200';
module.exports.STATUS_CREATED					= '201';
module.exports.STATUS_NO_CONTENT				= '204';
module.exports.STATUS_BAD_REQUEST				= '400';
module.exports.STATUS_UNATHORIZED				= '401';
module.exports.STATUS_FORBIDDEN					= '403';
module.exports.STATUS_NOT_FOUND					= '404';
module.exports.STATUS_METHOD_NOT_ALLOWED		= '405';
module.exports.STATUS_CONFLICT					= '409';
module.exports.STATUS_INTERNAL_SERVER_ERRRO		= '500';

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

 