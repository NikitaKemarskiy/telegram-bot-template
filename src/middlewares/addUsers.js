// Modules
const path = require('path');

// Functions
const User = require(path.join(__dirname, '..', 'models', 'user'));

// Add new users middleware
async function addUsers(ctx, next) {
	// Get info about user from context
	const chatId = ctx.from.id;
	const username = ctx.from.username;

	// Make up a name depending of presence of a surname
	const name = ctx.from.last_name !== undefined ? 
			   ctx.from.first_name + ' ' + ctx.from.last_name : 
			   ctx.from.first_name;

	// Add admin @kemarskiy and @vilkup
	const isAdmin = [300922262, 461738219].includes(chatId);

	const insertDoc = {
		name,
		isAdmin
	};

	if (username) { insertDoc.username = username; }

	await User.findOneAndUpdate({ chatId }, insertDoc, { upsert: true });

	await next();
}

// Exports
module.exports = addUsers;