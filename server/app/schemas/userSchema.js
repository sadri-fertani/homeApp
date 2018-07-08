var mongoose = require('mongoose');
var MessageSchema = require('./messageSchema');
var Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        _id: Schema.ObjectId,
        name: String,
        email: String,
        password: String,
        admin: Boolean,
        messages: {
            in: [MessageSchema],
            out: [MessageSchema]
        }
    }
);

module.exports = UserSchema;