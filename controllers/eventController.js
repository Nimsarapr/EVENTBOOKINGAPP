const Event = require('../models/Event');

// 1. Create Event (පින්තූරයත් එක්ක Event එකක් ඇතුළත් කිරීම)
exports.createEvent = async (req, res) => {
    try {
        // Request එකේ body එකෙන් දත්ත ටික වෙන් කරගන්නවා
        const { title, description, date, location, category, price, organizer, availableTickets } = req.body;
        
        // පින්තූරයක් upload කරලා තියෙනවා නම් ඒකේ URL එක ගන්නවා, නැත්නම් හිස්ව තියනවා
        const imageUrl = req.file ? req.file.path : "";

        const newEvent = new Event({
            title, 
            description, 
            date, 
            location, 
            category, 
            price, 
            organizer, 
            availableTickets,
            image: imageUrl // පින්තූරයේ URL එක මෙතනට වැටෙනවා
        });

        await newEvent.save();
        res.status(201).json({ message: "Event created successfully with image!", newEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Get All Events (සෑම Event එකක්ම පෙන්වීම)
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Get Single Event (එක Event එකක විස්තර බැලීම)
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Update Event (විස්තර වෙනස් කිරීම)
exports.updateEvent = async (req, res) => {
    try {
        // Update කරනකොටත් පින්තූරයක් අලුතින් දානවා නම් ඒකත් බලන්න පුළුවන්
        let updateData = req.body;
        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json({ message: "Event updated!", updatedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Delete Event (මකා දැමීම)
exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};