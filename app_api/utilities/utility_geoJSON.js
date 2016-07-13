/***********************************************
	REST API UTILITIES - GEO JSON

	Provides a utility for parsing common variables from a URL

 ***********************************************/

/* Defines Earth using Radians
 */
 module.exports.Earth = (function() {
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

/* Converts a Point Object to a String
 */
 module.exports.pointAsString = function(point) {
 	return 				"POINT OBJECT"								+ "\n"
 					+	"point.lng: " 	+ point.coordinates[0]		+ "\n"
 					+	"point.lat: "	+ point.coordinates[1];
 };


