const  cloudinary =require('cloudinary').v2;
require("dotenv").config();
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret:process.env.CLOUD_API_SECRET
});



//////////////////////


const uploadToCloudinary = async (filePath:string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    console.log('Upload Result:', result);
  } catch (error) {
    console.error('Upload Error:', error);
  }
};

// Test file path
uploadToCloudinary('./uploads/test-file.jpg');

export{cloudinary};