var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        _id: Schema.ObjectId,
        sender: String,
        _idSender: Schema.ObjectId,
        target: String,
        _idTarget: Schema.ObjectId,
        title: String,
        body: String,
        date: Date,
        readed: Boolean
    }
);

module.exports = MessageSchema;