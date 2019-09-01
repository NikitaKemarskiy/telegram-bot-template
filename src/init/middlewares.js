// Modules
const path = require('path');
const { TelegrafMongoSession } = require('telegraf-session-mongodb');

// Functions
const logger = require(path.join(__dirname, 'logger'));
const addUsers = require(path.join(__dirname, '..', 'middlewares', 'addUsers'));
const chatLogging = require(path.join(__dirname, '..', 'middlewares', 'chatLogging'));

// Config
const config = require(path.join(__dirname, '..', '..', 'config', 'config'));

// Middlewares init function
function init(bot) {
	try {
		bot.use(addUsers);
		bot.use(chatLogging);
		const url = config.dbUrl;
		TelegrafMongoSession.setup(bot, url);
		
		logger.trace('>>> Прослойки инициализированы');
	} catch (err) {
		logger.fatal(`XXX Произошла ошибка при инициализации прослоек! Текст ошибки: ${err.message}`);
		process.exit(1); // Exit the process
	}
}

// Exports
module.exports = {
	init
};
