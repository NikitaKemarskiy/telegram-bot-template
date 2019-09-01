// Modules
const path = require('path');
const Markup = require('telegraf/markup');

// Functions
const AdminMessage = require(path.join(__dirname, 'admin'));
const { getAdmins } = require(path.join(__dirname, '..', 'helpers', 'functions'));

async function send(ctx) {
	const admins = await getAdmins();

	admins.forEach(async (admin) => {
		const name = admin.name;
		const chatId = admin.chatId;
		const username = admin.username !== undefined ? admin.username : 'не указано';

		const keyboard = Markup.inlineKeyboard([
			Markup.callbackButton('Отстранить ❌ ', `dismiss>${chatId}`)
		]).extra();

		await ctx.replyWithMarkdown(`*Имя*: ${name}\n*Юзернейм*: @${username}\n*ChatId*: ${chatId}`, keyboard);
	});

	await AdminMessage.send(ctx);
}

// Exports
module.exports = {
	send
};