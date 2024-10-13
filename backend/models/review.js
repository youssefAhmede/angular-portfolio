const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // إضافة حقل createdAt
});

module.exports = mongoose.model('Review', reviewSchema);
