const mongoose = require("mongoose");

const linktreeSchema = new mongoose.Schema({
    title: String,
    logoImage: String,
    slogan: String,
    bgColor: String,
    icons: [],
    buttons: [],
    images: [],
    createdAt: {
        type: Date,
        default: new Date()
    },
    url: { 
        type: String,
        unique: true,
        required: true
    },
    metaTitle: String,
    metaDescription : String
});

const Linktree = mongoose.model("Linktree", linktreeSchema);

module.exports = Linktree;
