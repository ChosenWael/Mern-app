import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Setup the configuration needed to use multer
const upload = multer({
  storage: multer.memoryStorage(), // Use memory storage for Cloudinary uploads
  limits: {
    fileSize: 5000000, // maximum file size of 5 MB per file
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|webp|svg)$/)) {
      return cb(new Error('Unsupported file format'));
    }
    cb(null, true);
  },
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Check if a file is provided
    if (!req.file) {
      throw new Error('No file provided');
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.body.base64Image, {
      folder: 'mern',
    });

    // Handle the result
    console.log(result);

    // Send the Cloudinary URL in the response
    res.send(result.secure_url);
  } catch (error) {
    console.error(error);
    res.status(401).send('Invalid file type');
  }
});

export default router;
