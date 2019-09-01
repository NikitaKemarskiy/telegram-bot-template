// Modules
const path = require('path');
const Stage = require('telegraf/stage')

// Functions
const logger = require(path.join(__dirname, 'logger'));
const addAdmins = require(path.join(__dirname, '..', 'scenes', 'addAdmins'));
const gsend = require(path.join(__dirname, '..', 'scenes', 'gsend'));

// Config
const config = require(path.join(__dirname, '..', '..', 'config', 'config'));

// Middlewares init function
function init(bot) {
	try {
		const stage = new Stage(); // Create scenes manager
		stage.register(gsend);
		stage.register(addAdmins);
		bot.use(stage.middleware());

		logger.trace('>>> Сцены зарегистрированы');
	} catch (err) {
		logger.fatal(`XXX Произошла ошибка при регистрации сцен! Текст ошибки: ${err.message}`);
		process.exit(1); // Exit the process
	}
}

// Exports
module.exports = {
	init
};