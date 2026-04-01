const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Routes import කරගන්න
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Connection Error: ", err));

// Routes පාවිච්චි කිරීම
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send("Event Booking API is working!");
});

// වැදගත්ම කොටස: PORT එක මුලින්ම හදන්න (පාවිච්චි කරන්න කලින්)
const PORT = process.env.PORT || 5000;

// Local එකේ run වෙනකොට විතරක් listen කරන්න
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Vercel එකට අනිවාර්යයෙන්ම මේක ඕනේ:
module.exports = app;