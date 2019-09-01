// Modules
const path = require('path');

// Functions
const logger = require(path.join(__dirname, '..', 'init', 'logger'));
const User = require(path.join(__dirname, '..', 'models', 'user'));

// Get users list
async function getUsers() {
	return await User.find({});
}

// Get admins list
async function getAdmins() {
	return await User.find({ isAdmin: true });
}

// Check whether user is an admin
async function isAdmin(chatId) {
	const res = await User.find({ chatId: chatId, isAdmin: true });
	return res.length > 0
}

// Global mailing
async function sendGlobal(ctx) {
	const users = await User.find({});
	users.forEach(async (user) => {
		if (user.chatId === ctx.from.id) { return; }

		try {
			await ctx.telegram.sendCopy(user.chatId, ctx.message);
		} catch (err) {
			throw new Error(`Не удалось выполнить рассылку: ${err.message}`);
		}
	});
}

// Add an admin
async function addAdmin(chatId) {
	try {
		await User.findOneAndUpdate({ chatId }, { isAdmin: true }); // Make user an admin
	} catch (err) {
		throw new Error(`Ошибка при добавлении админа: ${err.message}`);
	}
}

// Dismiss an admin
async function dismissAdmin(chatId) {
	try {
		await User.findOneAndUpdate({ chatId }, { isAdmin: false }); // Dismiss admin
	} catch (err) {
		throw new Error(`Ошибка при отстранении админа: ${err.message}`);
	}
}

// Get number of users
async function getAllUsersCount() {
  const users = await User.find({});
  return users.length;
}