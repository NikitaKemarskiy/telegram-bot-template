// Modules
const path = require('path');

// Functions
const logger = require(path.join(__dirname, '..', 'init', 'logger'));

// Chat logging middleware
async function chatLogging(ctx, next) {
	// Get info about user from context
	const username = ctx.from.username;

	// Make up a name depending of presence of a surname
	const name = ctx.from.last_name !== undefined ? 
			   ctx.from.first_name + ' ' + ctx.from.last_name : 
			   ctx.from.first_name;

	// Log a message
	if (ctx.updateType === 'callback_query') {
		if (username) { // User has a username
			logger.notify(`${name} (@${username}) выбрал(а): "${ctx.callbackQuery.data}"`);
		} else { // User doesn't have a username
			logger.notify(`${name} выбрал(а): "${ctx.callbackQuery.data}"`);
		}
	} else if (ctx.updateType === 'message') {
		if (username) { // User has a username
			logger.notify(`Сообщение от ${name} (@${username}): "${ctx.message.text}"`);
		} else { // User doesn't have a username
			logger.notify(`Сообщение от ${name}: "${ctx.message.text}"`);
		}
	}

	await next();
}