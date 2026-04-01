const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    organizer: { type: String, required: true },
    image: { type: String }, // Event එකේ පින්තූරය සඳහා URL එක
    availableTickets: { type: Number, required: true }
});

module.exports = mongoose.model('Event', eventSchema);