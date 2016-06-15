
// Methods accessible by requiring main.js
module.exports.index = function(req, res, next) {
  res.render('index', { title: 'Express' });
};