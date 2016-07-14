/***********************************************
	SAMPLE TEST DATA 	
	MODEL CLASS: 	Locations

	Provides the an app with data for testing
	the development of the Model

	

 ***********************************************/

 // IMPORTS
 var mongoose = require('mongoose');

 // CONSTANTS
 var TESTING_VERBOSE = true;

/* TESTING */
/* Function to hand test data to controller code */
module.exports.testSampleListLocationsJSON = function() {
	if (TESTING_VERBOSE === true ) 
		console.log("****\tEnter app_server.testdata.test_locations.testSampleListLocationsJSON\t****");

	return { 	"title": 			'Loc8r - find a place to work with wifi',

				"pageHeader": 	{	title: 		'Loc8r',
									strapline: 	'Find a place to work with wifi near you!'	},

				"sidebar": 		'Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.', 

				"locations": 	[	this.test_location_barista(),
									this.test_location_coava(),
									this.test_location_reup(),
									this.test_location_cafe_evangalist()	]
			};
};

/* SAMPLE LOCATIONS AS JSON OBJECTS */
module.exports.test_location_barista_mongo = function(){
	if (TESTING_VERBOSE === true ) 
		console.log("****\tEnter app_server.testdata.test_locations.test_location_barista_mongo\t****");

	return {name:'BARista',address:'1865 Lincoln Ave, Portland, OR 97214',map:{center:{longitude:- 0.9690884,latitude:51.455041},zoom:17,size:{	height: 400,width:350},sensor:false,markers:[{longitude:-0.9690884,latitude:51.455041}],scale:2},phone:'(503) 894-8134',rating:5,coords:[-122.1596140, 37.4476324],facilities:['Hot Drinks', 'Food', 'Premium Wifi'],distance:'100m'};
};

module.exports.test_location_barista = function(){
	if (TESTING_VERBOSE === true ) 
		console.log("****\tEnter app_server.testdata.test_locations.test_location_barista\t****");

	return { 	//"_id": 			ObjectId(), 
				"name": 		'BARista',
				"address": 		'1865 Lincoln Ave, Portland, OR 97214',
				"map": 			{	center: 	{	longitude: 	- 0.9690884,
													latitude: 	51.455041 		},
									zoom: 		17, 
									size: 		{	height: 400,
													width: 	350 				},
									sensor: 	false,
									markers:  	[
													{	longitude:  -0.9690884,
														latitude: 	51.455041	}
												] ,
									scale: 		2 
								}, 
				"phone": 		'(503) 894-8134',
				"rating": 		5,
				"coords": 		[-122.1596140, 37.4476324],
				"facilities": 	['Hot Drinks', 'Food', 'Premium Wifi'],  
				"distance": 		'100m'										};
};



module.exports.test_location_coava_mongo = function() {
	if (TESTING_VERBOSE === true ) 
		console.log("****\tEnter app_server.testdata.test_locations.test_location_coava_mongo\t****");

	return {name:'Coava',address:'1300 SE Grand Ave, Portland, OR 97214',phone:'(503) 894-8134',rating:4,facilities:['Hot Drinks', 'Food', 'Premium Wifi'],distance:'100m',coords:[-122.6604370, 45.5134440],hoursOfOperation:[{day:"Monday - Friday",opening:"6:00 AM",closing:"9:00 PM",closed:false},{day:"Saturday",opening:"7:00 AM",closing:"9:00 PM",closed:false},{day:"Sunday",opening:"9:00 AM",closing:"8:00 PM",closed:false}],reviews:[{author:"Matt",rating:4,reviewText:"Coava has some excellent coffee, but what distinguishes them from other Portland-based cafes is their made-to-order drip coffee that is filtered through re-usable, metal filters. This method is not only environmentally-aware, but also allows the natural oils of the beans to pass through the filter, providing a more unique earthy flavor. Great spot, great coffee, great people!",dateCreated:Date.now},{author:"Greta",rating:3,reviewText:"Simply put, hands down the best!",dateCreated:Date.now},{author:"Michleen",rating:3,reviewText:"Good coffee, but not too much seating at the original location which is housed in a shared space with a bamboo wood furnature and flooring company. Worth a look around but not ideal for parties of 4 or more looking for a place to sit. :(",dateCreated:Date.now}]};
};

module.exports.test_location_coava = function() {
	if (TESTING_VERBOSE === true ) 
		console.log("****\tEnter app_server.testdata.test_locations.test_location_coava\t****");

	return { 	"name": 				'Coava Coffee Roasters',
				"address": 				'1300 SE Grand Ave, Portland, OR 97214',
				"phone": 				'(503) 894-8134',
				"rating": 				4,

				"facilities": 			['Hot Drinks', 'Food', 'Premium Wifi'],  
				"distance": 			'100m',
				"coords": 				[-122.6604370, 45.5134440],
				"hoursOfOperation": 	[
										{	//"_id": 		ObjectId(), 
											"day": 		"Monday - Friday",
											"opening": 	"6:00 AM",
											"closing": 	"9:00 PM",
											"closed": 	false 					},

										{	//"_id": 		ObjectId(), 
											"day": 		"Saturday",
											"opening": 	"7:00 AM",
											"closing": 	"9:00 PM",
											"closed": 	false 					},

										{	//"_id": 		ObjectId(), 
											"day": 		"Sunday",
											"opening": 	"9:00 AM",
											"closing": 	"8:00 PM",
											"closed": 	false 					}
									],
				"reviews": 			[
										{
											// Data Properties of each review
											//"_id": 			ObjectId(), 
											"author": 		"Matt",
											"rating": 		4,
											"reviewText": 	"Coava has some excellent coffee, but what distinguishes them from other Portland-based cafes is their made-to-order drip coffee that is filtered through re-usable, metal filters. This method is not only environmentally-aware, but also allows the natural oils of the beans to pass through the filter, providing a more unique earthy flavor. Great spot, great coffee, great people!",
											"dateCreated": 	Date.now
										},

										{
											// Data Properties of each review
											//"_id": 			ObjectId(), 
											"author": 		"Greta",
											"rating": 		3,
											"reviewText": 	"Simply put, hands down the best!",
											"dateCreated": 	Date.now
										},

										{
											// Data Properties of each review
											//"_id": 			ObjectId(), 
											"author": 		"Michleen",
											"rating": 		3,
											"reviewText": 	"Good coffee, but not too much seating at the original location which is housed in a shared space with a bamboo wood furnature and flooring company. Worth a look around but not ideal for parties of 4 or more looking for a place to sit. :(",
											"dateCreated": 	Date.now
										}
									] 								
			};
};

module.exports.test_location_reup_mongo = function() {
	if (TESTING_VERBOSE === true ) 
		console.log("****\tEnter app_server.testdata.test_locations.test_location_reup_mongo\t****");

	return {name:'Re-Up Brew',address:'15235 SE Hathhorne, Portland, OR 97214',phone:'(503) 894-8433',rating:5,facilities:['Hot Drinks','Food','Lightspeed Wifi','Developer Library'],distance:'250m',coords:[-122.6604369, 45.5134441],hoursOfOperation:[{	day:"Monday - Friday",opening:"5:00 AM",closing:"3:00 PM",closed:false},{day:"Saturday",opening:"7:00 AM",closing:"9:00 PM",closed:false},{day:"Sunday",opening:"",closing:"",closed:true}],reviews:[{_id: ObjectId(),author:"Matt",rating:5,reviewText:"This is my #1 coffee spot that I take all of my guests to see what they think...so far it's batting 100%!",dateCreated:Date.now},{_id: ObjectId(),author:"Greta",rating:4,reviewText:"Yummy!",dateCreated:Date.now},{_id: ObjectId(),author:"Michleen",rating:5,reviewText:"Good memories, better coffee!",dateCreated: 	Date.now}]};
};

module.exports.test_location_reup = function() {
	if (TESTING_VERBOSE === true ) 
		console.log("****\tEnter app_server.testdata.test_locations.test_location_reup\t****");

	return { 	//"_id": 			ObjectId(), 
				"name": 		'Re-Up Brew',
				"address": 		'15235 SE Hathhorne, Portland, OR 97214',
				"phone": 		'(503) 894-8134',
				"rating": 		5,
				"facilities": 	['Hot Drinks', 'Food', 'Lightspeed Wifi', 'Developer Library'],  
				"distance": 	'250m'																};
};

module.exports.test_location_cafe_evangalist_mongo = function() {
	if (TESTING_VERBOSE === true ) 
		console.log("****\tEnter app_server.testdata.test_locations.test_location_cafe_evangalist_mongo\t****");

	return {name:'Cafe Evangalist',address:'150 SE Main St, Portland, OR 97214',phone:'(503) 894-8134',rating:4,facilities:['Hot Drinks', 'Food', 'Premium Wifi'],distance:'360m',coords:[-122.6604369, 45.5134441],hoursOfOperation:[{	day:"Monday - Friday",opening:"5:00 AM",closing:"3:00 PM",closed:false},{day:"Saturday",opening:"7:00 AM",closing:"9:00 PM",closed:false},{day:"Sunday",opening:"",closing:"",closed:true}],reviews:[{_id: ObjectId(),author:"Tom",rating:4,reviewText:"This is a great place to get work done!",dateCreated:Date.now},{_id: ObjectId(),author:"Mark",rating:4,reviewText:"Can't get enough!",dateCreated:Date.now},{_id: ObjectId(),author:"Michleen",rating:5,reviewText:"Just like home!",dateCreated:Date.now}]};
}

module.exports.test_location_cafe_evangalist = function() {
	if (TESTING_VERBOSE === true ) 
		console.log("****\tEnter app_server.testdata.test_locations.test_location_cafe_evangalist\t****");
	
	return { 	//"_id": 			ObjectId(), 
				"name": 		'Cafe Evangalist',
				"address": 		'150 SE Main St, Portland, OR 97214',
				"phone": 		'(503) 894-8134',
				"rating": 		3,
				"facilities": 	['Hot Drinks', 'Food', 'Premium Wifi'],  
				"distance": 		'360m'										};
};