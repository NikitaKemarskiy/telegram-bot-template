// Modules
const path = require('path');

// Functions
const logger = require(path.join(__dirname, '..', 'init', 'logger'));
const AdminMessage = require(path.join(__dirname, '..', 'controllers', 'admin'));
const { dismissAdmin, isAdmin } = require(path.join(__dirname, '..', 'helpers', 'functions'));

// Callback queries handler init function
function init(bot) {
	bot.action(/^dismiss>[0-9]+$/, async (ctx) => {
		if (await isAdmin(ctx.from.id)) {
			try {
				const id = parseInt(ctx.callbackQuery.data.split('>')[1]);
				await dismissAdmin(id, 10);
				ctx.answerCbQuery();
				ctx.reply('Админ успешно отстранён ✔️', AdminMessage.keyboard);
			} catch (err) {
				logger.error(`Ошибка: ${err.message}`);
				ctx.answerCbQuery();
				ctx.reply('Не удалось отстранить админа, приносим извинения', AdminMessage.keyboard);
			}
		}
	});
}

// Exports
module.exports = {
	init
};