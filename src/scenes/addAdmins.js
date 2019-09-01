// Modules
const path = require('path');
const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');

// Functions
const logger = require(path.join(__dirname, '..', 'init', 'logger'));
const AdminMessage = require(path.join(__dirname, '..', 'controllers', 'admin'));
const { addAdmin } = require(path.join(__dirname, '..', 'helpers', 'functions'));

// Add admin scene
const addAdmins = new Scene('addAdmins');

addAdmins.command('start', async (ctx) => {
	await ctx.scene.leave();
	await AdminMessage.send(ctx);
	ctx.session = {};
});

// Entrance into the scene
addAdmins.enter(async (ctx) => {
	const keyboard = Markup.inlineKeyboard([
		Markup.callbackButton('Назад', 'back')
	]).extra();
	
	await ctx.replyWithMarkdown('Перешлите мне сообщение от будущего админа ⏩\n*Он должен быть пользователем бота!*', keyboard); 
});

addAdmins.on('message', async (ctx) => {
	try {
		const adminId = ctx.message.forward_from.id;
		await addAdmin(adminId); // Add new admin
		await ctx.reply('Операция прошла успешно! 🎉', AdminMessage.keyboard);
		logger.notify(`Новый админ(${adminId}) добавлен! 🎉 Админ: @${ctx.from.username}`);
	}
	catch (err) {
		await ctx.reply('Не удалось добавить новых админов, приносим извинения.\nВозможно, Вы ввели некорректные данные', AdminMessage.keyboard);
		logger.error(err.message);
	}
	return ctx.scene.leave();
});

addAdmins.on('callback_query', async (ctx) => {
	switch (ctx.callbackQuery.data) {
		case 'back': {
			await ctx.scene.leave();
			await AdminMessage.send(ctx);
			break;
		}
	}
})

// Exports
module.exports = addAdmins;