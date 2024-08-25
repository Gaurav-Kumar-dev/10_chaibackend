import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

 // Configuration
 cloudinary.config({ 
    cloud_name: COLUDINARY_CLOUD_NAME, 
    api_key: COLUDINARY_API_KEY, 
    api_secret: COLUDINARY_API_SECRET
});


const uploadOnCloudinary = await (localFilePath) => {
    try {
        if(!localFilePath) return null
        // Upload an image
        const respose = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        //file has been uploded succesfully
        console.log("file has been uploaded on cloudinary", respose.url);
        return respose;
        

    } catch (error) {
        fs.unlinkSync(localFilePath)  // remove locally saved temp files as the upload operation got failed
        return null
    }   
}

export {uploadOnCloudinary}




