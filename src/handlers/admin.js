// Modules
const path = require('path');

// Functions
const AdminMessage = require(path.join(__dirname, '..', 'controllers', 'admin'));
const AdminHelpMessage = require(path.join(__dirname, '..', 'controllers', 'adminHelp'));
const AdminListMessage = require(path.join(__dirname, '..', 'controllers', 'adminList'));
const StatsMessage = require(path.join(__dirname, '..', 'controllers', 'stats'));
const { isAdmin } = require(path.join(__dirname, '..', 'helpers', 'functions'));

// Admin handler init function
function init(bot) {
	// /admin handler
	bot.command('admin', async (ctx) => {
		if (await isAdmin(ctx.from.id)) {
			await AdminMessage.send(ctx);
		}
	});

	// Рассылка 📡 handler
	bot.hears('Рассылка 📡', async (ctx) => {
		if (await isAdmin(ctx.from.id)) {
			await ctx.scene.enter('gsend');
		}
	});

	// Статистика 📊 handler
	bot.hears('Статистика 📊', async (ctx) => {
		if (await isAdmin(ctx.from.id)) {
			await StatsMessage.send(ctx);
		}
	});

	// Добавить админа 👔 handler
	bot.hears('Добавить админа 👔', async (ctx) => {
		if (await isAdmin(ctx.from.id)) {
			await ctx.scene.enter('addAdmins');
		}
	});

	// Список админов 📃 handler
	bot.hears('Список админов 📃', async (ctx) => {
		if (await isAdmin(ctx.from.id)) {
			await AdminListMessage.send(ctx);
		}
	});

	// Справка админа 💡 handler
	bot.hears('Справка админа 💡', async (ctx) => {
		if (await isAdmin(ctx.from.id)) {
			await AdminsHelpMessage.send(ctx);
		}
	});
}

// Exports
module.exports = {
	init
};