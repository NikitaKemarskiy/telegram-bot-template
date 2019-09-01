// Modules
const path = require('path');

// Functions
const logger = require(path.join(__dirname, 'logger'));
const Admin = require(path.join(__dirname, '..', 'handlers', 'admin'));
const Start = require(path.join(__dirname, '..', 'handlers', 'start'));
const CallbackQuery = require(path.join(__dirname, '..', 'handlers', 'callbackQuery'));


// Handlers init function
async function init(bot) {
	try {
		Start.init(bot); // /start handler
		Admin.init(bot); // /admin handler
		CallbackQuery.init(bot); // Callback queries handler

		logger.trace('>>> Обработчики инициализированы');
	} catch (err) {
		logger.fatal(`XXX Произошла ошибка при инициализации обработчиков! Текст ошибки: ${err.message}`);
		process.exit(1); // Exit the process
	}
}

// Exports
module.exports = {
	init
};