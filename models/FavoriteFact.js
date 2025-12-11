const mongoose = require("mongoose");

const favoriteFactSchema = new mongoose.Schema({
    text: { type: String, required: true },
    language: { type: String, enum: ["en", "de"], default: "en" },
    type: { type: String, enum: ["random", "today"], default: "random" },
    source: { type: String },
    sourceUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FavoriteFact", favoriteFactSchema);
