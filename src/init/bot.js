// Modules
const path = require('path');

// Functions
const Telegraf = require('telegraf');
const logger = require(path.join(__dirname, 'logger'));

// Config
const config = require(path.join(__dirname, '..', '..', 'config', 'config'));

// Telegraf bot configure function
async function configure() {
	const token = config.token;
	const bot = new Telegraf(token);
	
	try {
		await bot.launch();
	} catch (err) {
		logger.fatal(`XXX Возникла ошибка инициализации бота! Текст ошибки: ${err.message}`);
		process.exit(1);
	}
	
	logger.trace('>>> Бот сконфигурирован');
	return bot;
}

// Exports
module.exports = {
	configure
};