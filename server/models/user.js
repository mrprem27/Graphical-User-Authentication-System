const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true, dropDups: true },
    authImages: [{ type: String, required: true }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;