/* GET 'home' page */
module.exports.homelist = function(req, res) {
	res.render('list-locations', test_data());
};

/* GET 'Location' page */
module.exports.locationInfo = function(req, res) {
	res.render('detail-location', { title: 		'Location Info',
									location:  	test_location_barista()	});
};

/* GET 'Add Review' page */
module.exports.addReview = function(req, res) {
	res.render('form-location-review', { title: 'Add Review' });
};


/* TESTING */
/* Function to hand test data to controller code */
var test_data = function() {
	return { 	title: 			'Loc8r - find a place to work with wifi',

				pageHeader: 	{	title: 		'Loc8r',
									strapline: 	'Find a place to work with wifi near you!'	},

				sidebar: 	'Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.', 

				locations: [	test_location_barista(),
								test_location_coava(),
								test_location_reup(),
								test_location_cafe_evangalist()	]
			};
}

/* SAMPLE LOCATIONS AS JSON OBJECTS */
var test_location_barista = function(){
	return { 	name: 			'BARista',
				address: 		'1865 Lincoln Ave, Portland, OR 97214',
				map: 			{	center: 	{	longitude: 	- 0.9690884,
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
				phone: 			'(503) 894-8134',
				rating: 		5,
				coords: 		[-122.1596140, 37.4476324],
				facilities: 	['Hot Drinks', 'Food', 'Premium Wifi'],  
				distance: 		'100m'										};
}



var test_location_coava_mongo = function() {
	return {name:'Coava Coffee Roasters',address:'1300 SE Grand Ave, Portland, OR 97214',phone:'(503) 894-8134',rating:4,facilities:['Hot Drinks', 'Food', 'Premium Wifi'],distance:'100m',coords:[-122.6604370, 45.5134440],hoursOfOperation:[{day:"Monday - Friday",opening:"6:00 AM",closing:"9:00 PM",closed:false},{day:"Saturday",opening:"7:00 AM",closing:"9:00 PM",closed:false},{day:"Sunday",opening:"9:00 AM",closing:"8:00 PM",closed:false}],reviews:[{author:"Matt",rating:4,reviewText:"Coava has some excellent coffee, but what distinguishes them from other Portland-based cafes is their made-to-order drip coffee that is filtered through re-usable, metal filters. This method is not only environmentally-aware, but also allows the natural oils of the beans to pass through the filter, providing a more unique earthy flavor. Great spot, great coffee, great people!",dateCreated:Date.now},{author:"Greta",rating:3,reviewText:"Simply put, hands down the best!",dateCreated:Date.now},{author:"Michleen",rating:3,reviewText:"Good coffee, but not too much seating at the original location which is housed in a shared space with a bamboo wood furnature and flooring company. Worth a look around but not ideal for parties of 4 or more looking for a place to sit. :(",dateCreated: 	Date.now}]};
}

var test_location_coava = function() {
	return { 	name: 				'Coava Coffee Roasters',
				address: 			'1300 SE Grand Ave, Portland, OR 97214',
				phone: 				'(503) 894-8134',
				rating: 			4,

				facilities: 		['Hot Drinks', 'Food', 'Premium Wifi'],  
				distance: 			'100m',
				coords: 			[-122.6604370, 45.5134440],
				hoursOfOperation: 	[
										{	day: 		"Monday - Friday",
											opening: 	"6:00 AM",
											closing: 	"9:00 PM",
											closed: 	false 					},

										{	day: 		"Saturday",
											opening: 	"7:00 AM",
											closing: 	"9:00 PM",
											closed: 	false 					},

										{	day: 		"Sunday",
											opening: 	"9:00 AM",
											closing: 	"8:00 PM",
											closed: 	false 					}
									],
				reviews: 			[
										{
											// Data Properties of each review
											author: 		"Matt",
											rating: 		4,
											reviewText: 	"Coava has some excellent coffee, but what distinguishes them from other Portland-based cafes is their made-to-order drip coffee that is filtered through re-usable, metal filters. This method is not only environmentally-aware, but also allows the natural oils of the beans to pass through the filter, providing a more unique earthy flavor. Great spot, great coffee, great people!",
											dateCreated: 	Date.now
										},

										{
											// Data Properties of each review
											author: 		"Greta",
											rating: 		3,
											reviewText: 	"Simply put, hands down the best!",
											dateCreated: 	Date.now
										},

										{
											// Data Properties of each review
											author: 		"Michleen",
											rating: 		3,
											reviewText: 	"Good coffee, but not too much seating at the original location which is housed in a shared space with a bamboo wood furnature and flooring company. Worth a look around but not ideal for parties of 4 or more looking for a place to sit. :(",
											dateCreated: 	Date.now
										}
									] 								
			};
}

var test_location_reup = function() {
	return { 	name: 			'Re-Up Brew',
				address: 		'15235 SE Hathhorne, Portland, OR 97214',
				phone: 			'(503) 894-8134',
				rating: 		5,
				facilities: 	['Hot Drinks', 'Food', 'Lightspeed Wifi', 'Developer Library'],  
				distance: 		'250m'																};
}

var test_location_cafe_evangalist = function() {
	return { 	name: 			'Cafe Evangalist',
				address: 		'150 SE Main St, Portland, OR 97214',
				phone: 			'(503) 894-8134',
				rating: 		3,
				facilities: 	['Hot Drinks', 'Food', 'Premium Wifi'],  
				distance: 		'360m'										};
}


