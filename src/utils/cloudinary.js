import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

 
cloudinary.config({
    cloud_name: process.env.COLUDINARY_CLOUD_NAME,
    api_key: process.env.COLUDINARY_API_KEY,
    api_secret: process.env.COLUDINARY_API_SECRET,
  });



const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) return null;

    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });
        console.log("File has been uploaded to Cloudinary", response.url);
        return response;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        try {
            fs.unlinkSync(localFilePath); // Ensure local file is deleted
        } catch (unlinkError) {
            console.error("Error removing local file:", unlinkError);
        }
        return null;
    }
};


export {uploadOnCloudinary}




