// Modules
const path = require('path');

// Functions
const simpleNodeLogger = require('simple-node-logger');

// Logger constructor
function loggerConstructor() {
	const loggerObj = simpleNodeLogger.createSimpleLogger(path.join(__dirname, '..', '..', 'logs', 'logfile.log'));

	this.trace = function(data) {
		loggerObj.log('trace', data);
	}

	this.debug = function(data) {
		loggerObj.log('debug', data);
	}

	this.error = function(data) {
		loggerObj.log('error', data);
	}

	this.warn = function(data) {
		loggerObj.log('warn', data);
	}

	this.fatal = function(data) {
		loggerObj.log('fatal', data);
	}

	this.notify = function(data) {
		loggerObj.info(data);
	}
}

const logger = new loggerConstructor();

// Exports
module.exports = logger;