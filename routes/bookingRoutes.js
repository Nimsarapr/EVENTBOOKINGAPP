const express = require('express');
const { createBooking, getAllBookings, getUserBookings, updateBookingStatus, cancelBooking } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', createBooking);                 // Create Booking
router.get('/', getAllBookings);                // View All
router.get('/user/:userId', getUserBookings);   // User History
router.put('/:id', updateBookingStatus);       // Approve/Reject
router.delete('/:id', cancelBooking);           // Cancel

module.exports = router;