// Modules
const path = require('path');
const mongoose = require('mongoose');

// Functions
const logger = require(path.join(__dirname, 'logger'));

// Config
const config = require(path.join(__dirname, '..', '..', 'config', 'config'));

// MongoDB connect function
async function connect() {
	const url = config.dbUrl;
	try {
		await mongoose.connect(url, { useNewUrlParser: true, keepAlive: true, useCreateIndex: true })			
		logger.trace('>>> База данных подключена');
	} catch (err) {
		logger.fatal(`XXX Возникла ошибка при подключении к MongoDB! Текст ошибки: ${err.message}`);
		process.exit(1); // Exit the process
	}
}

// Exports
module.exports = {
	connect
};