var mongoose = require('mongoose');
const MessageSchema = require('../schemas/messageSchema');

module.exports = mongoose.model('Message', MessageSchema);