const express = require('express');
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');

// අලුතින් එක්කළා (මතක ඇතුව middleware/upload.js එක හදලා තියෙන්න ඕනේ)
const upload = require('../middleware/upload'); 

const router = express.Router();

// මෙන්න මෙතනට 'upload.single('image')' කොටස දාන්න
// මෙතන 'image' කියන්නේ අපි Postman එකෙන් පින්තූරය එවන Key එකේ නමයි.
router.post('/', upload.single('image'), createEvent);        

router.get('/', getAllEvents);        
router.get('/:id', getEventById);     
router.put('/:id', updateEvent);      
router.delete('/:id', deleteEvent);   

module.exports = router;