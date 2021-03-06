// Config object
const config = {
	dev: {
		token: '<TOKEN>',
		dbUrl: 'mongodb://127.0.0.1:27017/tsbot',
		port: 80
	},
	prod: {
		token: '<TOKEN>',
		dbUrl: 'mongodb://127.0.0.1:27017/tsbot',
		port: 8080
	}
};

// Exports
module.exports = process.env.NODE_ENV === 'production' ? config.prod : config.dev;
