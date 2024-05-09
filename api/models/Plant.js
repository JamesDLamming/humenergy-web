const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    wateringFrequency: { type: Number, required: true },
    wateringAmount: { type: Number, required: true },
    lastWateredDate: { type: Date, default: Date.now },
    nextWaterDate: { type: Date , required: true}, 
    photo: { type: String }
});

module.exports = mongoose.model('Plant', PlantSchema);
