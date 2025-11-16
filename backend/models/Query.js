const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,

    category: { type: String, default: "general" },  
    priority: { type: String, default: "low" },     
    status: { type: String, default: "open" },       

    history: [
        {
            action: String,
            timestamp: { type: Date, default: Date.now }
        }
    ],

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Query", QuerySchema);
