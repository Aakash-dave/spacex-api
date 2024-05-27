import mongoose from 'mongoose';

const launchSchema = new mongoose.Schema({
    flight_number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date_utc: {
        type: String,
        required: true
    },
    id: {
        type: String, // no _id overwrite
        required: true,
        index: true,
        unique: true
    }
});

module.exports = mongoose.model('Launch', launchSchema);    