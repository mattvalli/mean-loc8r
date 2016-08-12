// Import Mongoose
var mongoose = require( 'mongoose' );


/********************************************************
 *************			SUB-SCHEMAs			*************
 ********************************************************/
// HOURS_OPERATIONAL
var hoursOfOperationSchema = new mongoose.Schema({
	// Data Properties of an Hours of Operation Schedule
	day: 			{		type: 			String,
							require: 		true 		},
	
	// `````````			TODO		 	`````````````
	/*******	SUBSTITUTE FOR A DATE FORMAT 	********/
	// Times 
	opening: 		String,
	closing: 		String,

	// Inoperable
	closed: 		{		type: 			Boolean,
							require: 		true		}	
});

// REVIEWS
var reviewSchema = new mongoose.Schema({
	// Data Properties of each review
	author: 		String,
	rating: 		{		type: 			Number,
							require: 		true,
							"default": 		0,
							min: 			0,
							max: 			5 			},
	reviewText: 	String,
	dateCreated: 	{		type: 			Date,
							"default": 		Date.now	},
	dateUpdated: 	{		type: 			Date,
							"default": 		Date.now	} 
});



/********************************************************
 *************	MAIN SCHEMA -- LOCATION 	*************
 ********************************************************/
var locationSchema = new mongoose.Schema({
	// Data Properties of Location & there associated JSON Type

	// NAME
	name: 			{ 	type: 		String,
						require: 	true 				}, 
	// ADDRESS
	address: 		String,

	// RATING
	rating: 		{	type: 		Number,
						"default": 	0,

						// Validation
						min:		0,
						max: 		5					},
	// PHONE
	phone: 			String,

	// GPS COORDINATES
	// Global Coordinates for Location in GeoJSON format
	coords:			{	type: 		[Number],
						index: 		'2dsphere' 			},

	// COLLECTIONS
	// FACILITIES
	facilities: 		[String],
	hoursOfOperation: 	[hoursOfOperationSchema],
	reviews: 			[reviewSchema] 
});


/********************************************************
 *************		SCHEMA COMPILATION	 	*************
 ********************************************************/
 console.log("Compiling Location Schema...");
 mongoose.model('locations',locationSchema);
 console.log("Compiled");