// /start handler init function
function init(bot) {
	bot.start(async (ctx) => {
		await ctx.reply(`Let's start!`);
	});
}

// Exports
module.exports = {
	init
};