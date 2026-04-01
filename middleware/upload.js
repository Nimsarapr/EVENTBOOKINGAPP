const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary Configuration (ඔයාගේ keys මෙතනට දාන්න)
cloudinary.config({
    cloud_name: 'dyl50yvgw',
    api_key: '799251821296737',
    api_secret: 'oOxbM1F0V7AccLRylkKHjNU0fA8'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'event_images', // Cloudinary එකේ folder එකේ නම
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});

const upload = multer({ storage: storage });

module.exports = upload;