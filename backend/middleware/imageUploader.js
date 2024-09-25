import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

const handleFileUpload = async (req, res, next) => {
    try {
        let uploadCount = 0;
        req.files.forEach((file, index) => {
            cloudinary.uploader.upload_stream({ folder: "products", transformation: [
                { width: 768, height: 1152, crop: "fill" }, 
              ] }, (error, result) => {
                if (error) {
                    return next(error);
                }
                file.cloudinary_public_id = result.public_id;
                file.cloudinary_url = result.secure_url;
                uploadCount++;
                if (uploadCount === req.files.length) {
                    next();
                }
            }).end(file.buffer);
        });
    } catch (error) {
        next(error);
    }
};

export default {
    upload,
    handleFileUpload
}