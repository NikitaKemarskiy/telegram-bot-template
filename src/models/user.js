// Modules
const mongoose = require('mongoose');
const { Document, Schema } = mongoose;

// User schema
const UserSchema = new Schema({
	chatId: { type: Number, required: true, unique: true },
	username: { type: String },
	name: { type: String },
	phoneNumber: { type: String },
	isAdmin: { type: Boolean }
});

module.exports = mongoose.model('user', UserSchema, 'users');
