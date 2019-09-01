// Modules
const path = require('path');

// Functions
const Bot = require(path.join(__dirname, 'init', 'bot'));
const DB = require(path.join(__dirname, 'init', 'db'));
const Handlers = require(path.join(__dirname, 'init', 'handlers'));
const Middlewares = require(path.join(__dirname, 'init', 'middlewares'));
const Scenes = require(path.join(__dirname, 'init', 'scenes'));

// Main function
async function main() {
	await DB.connect(); // Connect database
	const bot = await Bot.configure(); // Configure messenger bot	
	Middlewares.init(bot); // Init middlewares
	Scenes.init(bot); // Init scenes
	Handlers.init(bot); // Init handlers
}

main();