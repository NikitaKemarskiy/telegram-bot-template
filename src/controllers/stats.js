// Modules
const path = require('path');

// Functions
const AdminMessage = require(path.join(__dirname, '..', 'controllers', 'admin'));
const { getAllUsersCount } = require(path.join(__dirname, '..', 'helpers', 'functions'));

async function send(ctx) {
	const allUsersCount = await getAllUsersCount();
	await ctx.replyWithMarkdown(`*Статистика 📊*\n\nКол-во пользователей: *${allUsersCount}*`, AdminMessage.keyboard);
}

// Exports
module.exports = {
	send
};