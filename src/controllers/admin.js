// Modules
const Markup = require('telegraf/markup')

// Admin keyboard
const keyboard = Markup.keyboard([
	['Рассылка 📡', 'Статистика 📊'],
	['Добавить админа 👔'],
	['Список админов 📃', 'Справка админа 💡']
]).oneTime().resize().extra();

// Send admin keyboard function
async function send(ctx) {
	await ctx.reply('Hello, admin!', keyboard);
}


// Exports
module.exports = {
	send
};