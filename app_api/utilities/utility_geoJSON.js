/***********************************************
	REST API UTILITIES - GEO JSON

	Provides a utility for parsing common variables from a URL

 ***********************************************/

/* 	
 */
 module.exports.pointAsString = function(point) {
 	return 				"POINT OBJECT"								+ "\n"
 					+	"point.lng: " 	+ point.coordinates[0]		+ "\n"
 					+	"point.lat: "	+ point.coordinates[1];
 };