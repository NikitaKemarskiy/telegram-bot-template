// Modules
const path = require('path');

// Functions
const AdminMessage = require(path.join(__dirname, 'admin'));

// Texts
const texts = require(path.join(__dirname, '..', 'texts.json'));

// Send markdown function
async function send(ctx) {
	await ctx.replyWithMarkdown(texts.adminHelp, AdminMessage.keyboard);
}

// Exports
module.exports = {
	send
};