// Import Mongoose
var mongoose = require('mongoose');

// CONSTANTS
var EVENT_SHUTDOWN_NODE		= 'SIGINT';
var EVENT_SHUTDOWN_NODEMON	= 'SIGUSR2';
var EVENT_SHUTDOWN_HIROKU 	= 'SIGTERM';

//
var MSG_SHUTDOWN_NODEMON 	= "Nodemon restarting...";
var MSG_SHUTDOWN_NODE 		= "Node Application Terminated";
var MSG_SHUTDOWN_HIROKU		= "Heroku Application Shutdown";

// Unix/Linux Flag on Process Termination
var FLAG_EXIT_CLEAN = 0;

// Database URL
	// Local Testing Environment
	var dbURL 					= "mongodb://localhost/Loc8r";
	// Production Environment
	if (process.env.NODE_ENV === 'production') {
		console.log("process.env.MONGOLAB_URI: " + process.env.MONGOLAB_URI);
		dbURL = process.env.MONGOLAB_URI;
	}

// Connect to MongoDB
mongoose.connect(dbURL);

/* Respond via callbacks to MongoDb Events */
mongoose.connection.on('connected',function() {
	console.log('Mongoose connected to MongoDb on ' + dbURL);
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected');
});

/* Callback for SYSTEM & DATABASE SHUTDOWN */
var gracefulShutdown = function(msg, callback) {
	// Close the Current Connection to MongoDB
	mongoose.connection.close(function() {
		// Log to console that the connection is closing
		console.log("Mongoose disconnected through " + msg);
		callback();
	});
};

/* Handle Shutdown Events */
/* Nodemon Shutdown */
process.once(EVENT_SHUTDOWN_NODEMON, function() {
	gracefulShutdown(MSG_SHUTDOWN_NODEMON, function() {
		process.kill(process.pid, EVENT_SHUTDOWN_NODEMON);
	});
});

/* Node Shutdown */
process.on(EVENT_SHUTDOWN_NODE, function() {
	gracefulShutdown(MSG_SHUTDOWN_NODE, function() {
		process.exit(FLAG_EXIT_CLEAN);
	});
});

/* Heroku Shutdown */
process.on(EVENT_SHUTDOWN_HIROKU, function() {
	gracefulShutdown(MSG_SHUTDOWN_HIROKU, function() {
		process.exit(FLAG_EXIT_CLEAN);
	});
});



/* IMPORT THE MODEL SCHEMA */
var locations = require( './locations' );