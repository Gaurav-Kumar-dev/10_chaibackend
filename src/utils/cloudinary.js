import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

 
try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  } catch (configError) {
    console.error('Error configuring Cloudinary:', configError);
    throw new Error('Cloudinary configuration failed'); // Throw an error to stop execution
  }



  const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath || !fs.existsSync(localFilePath) || !fs.lstatSync(localFilePath).isFile()) {
      console.error('Invalid file path:', localFilePath);
      throw new Error('Invalid file path'); // Throw an error to stop execution
    }

    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
          });
          console.log(`File has been uploaded to Cloudinary: ${response.url}`);
          return response;
    } catch (error) {
        console.error(`Error uploading file to Cloudinary: ${error}`);
        try {
            await fs.promises.unlink(localFilePath); // Ensure local file is deleted
        } catch (unlinkError) {
            console.error(`Error removing local file: ${unlinkError}`);
          }
          throw new Error('Failed to upload file to Cloudinary'); // Throw an error to stop execution
        }
      };
      


export { uploadOnCloudinary };




