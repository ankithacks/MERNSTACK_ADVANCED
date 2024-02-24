// In cloudinary go to Programmable Media then to Dashboard then see the API SECRET and the API KEy and the Cloud NAME

// Require and configure dotenv
require('dotenv').config();

const cloudinary = require('cloudinary');

// Access environment variables using process.env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


module.exports=cloudinary