const Booking = require('../models/Booking');
const Event = require('../models/Event');

// 1. Create Booking Request (User කෙනෙක් book කරන එක)
exports.createBooking = async (req, res) => {
    try {
        const { userId, eventId, numberOfTickets } = req.body;

        // මුලින්ම බලන්න ඕනේ ඒ event එකේ tickets ඉතුරුද කියලා
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        if (event.availableTickets < numberOfTickets) {
            return res.status(400).json({ message: "Not enough tickets available!" });
        }

        const newBooking = new Booking({ userId, eventId, numberOfTickets });
        await newBooking.save();

        // Event එකේ තියෙන ටිකට් ගණන අඩු කරන්න
        event.availableTickets -= numberOfTickets;
        await event.save();

        res.status(201).json({ message: "Booking request sent!", newBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. View All Bookings (Admin ට ඔක්කොම බලන්න)
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId').populate('eventId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. View Booking History for a Specific User (User කෙනෙකුට තමන්ගේ විස්තර බැලීමට)
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId }).populate('eventId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Update Status (Admin approval/rejection)
exports.updateBookingStatus = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true }
        );
        res.json({ message: "Booking status updated!", updatedBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Cancel Booking
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        // කැන්සල් කරනකොට ආපහු ටිකට් ටික event එකට එකතු කරන්න
        const event = await Event.findById(booking.eventId);
        event.availableTickets += booking.numberOfTickets;
        await event.save();

        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: "Booking cancelled successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};