// Modules
const path = require('path');
const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');

// Functions
const logger = require(path.join(__dirname, '..', 'init', 'logger'));
const AdminMessage = require(path.join(__dirname, '..', 'controllers', 'admin'));
const { sendGlobal } = require(path.join(__dirname, '..', 'helpers', 'functions'));

// Global send scene
const gsend = new Scene('gsend');

gsend.command('start', async (ctx) => {
	await ctx.scene.leave();
	await AdminMessage.send(ctx);
	ctx.session = {};
});

// Entrance into the scene
gsend.enter(async (ctx) => {
	let keyboard = Markup.inlineKeyboard([
		Markup.callbackButton('Назад', 'back')
	]).extra();
	
	await ctx.replyWithMarkdown('Введите сообщение для рассылки\n\nПри форматировании используйте *два знака разметки* вместо одного', keyboard);
});

gsend.on('message', async (ctx) => {
	try {
		await sendGlobal(ctx);
		await ctx.reply('Рассылка успешно проведена! 🎉', AdminMessage.keyboard);
		logger.notify(`Рассылка успешно проведена! 🎉 Админ: @${ctx.from.username}; Сообщение: "${ctx.message.text}"`);
	} catch (err) {
		await ctx.reply('Не удалось выполнить рассылку, приносим извинения', AdminMessage.keyboard);
		logger.error(err.message);
	}
	await ctx.scene.leave();
});

gsend.on('callback_query', async (ctx) => {
	switch (ctx.callbackQuery.data) {
		case 'back': {
			await ctx.scene.leave();
			await AdminMessage.send(ctx);
			break;
		}
	}
});

// Exports
module.exports = gsend;