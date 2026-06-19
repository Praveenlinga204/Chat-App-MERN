const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: { type: String, require: true },
    receiver: { type: String, require: true },
    text: { type: String, require: true },
},
    { timestamps: true }

);
module.exports = mongoose.model("message",messageSchema); 