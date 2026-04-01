const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Routes Import කිරීම
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// 2. App එක Initialize කිරීම
const app = express();

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Routes භාවිතය
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// 5. Database එකට Connect වීම
// .env file එකේ තියෙන MONGO_URI එක පාවිච්චි කිරීම වඩාත් සුදුසුයි
const mongoURI = process.env.MONGO_URI || "mongodb+srv://Nimsara:1234@cluster1.zrwfh25.mongodb.net/eventDB?retryWrites=true&w=majority"; 
PORT=5000
JWT_SECRET=mysecretkey123

mongoose.connect(mongoURI)
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch(err => console.log("❌ Database Error: ", err));

// 6. Server එක Run කිරීම
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    module.exports = app; 
});