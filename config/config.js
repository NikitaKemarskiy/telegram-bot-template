// Config object
const config = {
	dev: {
		token: '795244132:AAGiiYkdrq9fGTq5GaBDe3UKL76iiNgjM5w',
		dbUrl: 'mongodb://127.0.0.1:27017/tsbot',
		port: 8080
	},
	prod: {
		token: '<TOKEN>',
		dbUrl: 'mongodb://127.0.0.1:27017/tsbot',
		port: 80
	}
};

// Exports
module.exports = process.env.NODE_ENV === 'production' ? config.prod : config.dev;
