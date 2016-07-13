
// Methods accessible by requiring main.js
module.exports.about = function(req, res, next) {
  res.render('generic-text', { 	title: 	'About',
  								body: 	'Loc8r was created to help people find places to sit down and get a little bit of work done.<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan.'  	});
};