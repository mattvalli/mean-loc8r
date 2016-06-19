/* GET 'home' page */
module.exports.homelist = function(req, res) {
	res.render('list-locations', 	{ 	title: 'Loc8r - find a place to work with wifi',
										pageHeader: {	title: 		'Loc8r',
														strapline: 	'Find a place to work with wifi near you!'	},
										locations: [
											{ 	name: 		'BARista',
												address: 	'1865 Lincoln Ave, Portland, OR 97214',
												phone: 		'(503) 894-8134',
												rating: 	5,
												facilities: ['Hot Drinks', 'Food', 'Premium Wifi'],  
												distance: 	'100m'										},


											{ 	name: 		'Coava Coffee Roasters',
												address: 	'1300 SE Grand Ave, Portland, OR 97214',
												phone: 		'(503) 894-8134',
												rating: 	4,
												facilities: ['Hot Drinks', 'Food', 'Premium Wifi'],  
												distance: 	'100m'										},
											 
											 { 	name: 		'Re-Up Brew',
												address: 	'15235 SE Hathhorne, Portland, OR 97214',
												phone: 		'(503) 894-8134',
												rating: 	5,
												facilities: ['Hot Drinks', 'Food', 'Lightspeed Wifi', 'Developer Library'],  
												distance: 	'250m'										},

											{ 	name: 		'Cafe Evangalist',
												address: 	'150 SE Main St, Portland, OR 97214',
												phone: 		'(503) 894-8134',
												rating: 	3,
												facilities: ['Hot Drinks', 'Food', 'Premium Wifi'],  
												distance: 	'360m'										}
										]
									});
};

/* GET 'Location' page */
module.exports.locationInfo = function(req, res) {
	res.render('detail-location', { title: 'Location Info' });
};

/* GET 'Add Review' page */
module.exports.addReview = function(req, res) {
	res.render('form-location-review', { title: 'Add Review' });
};