import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { uploadEmployee, updateEmployee, getAllEmployees, uploadFile } from '../controllers/employeeController.js';
import authMiddleware from "../middleware/authMiddleware.js"; // Import middleware


const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const uploadDir = 'uploads/';
      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
      // Keep the original filename as requested
      cb(null, file.originalname);
    }
  });
  
  // Set up multer upload
  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB file size limit
  });


router.post('/upload', authMiddleware, uploadEmployee);
router.put('/update/:id', updateEmployee);
router.get('/all', authMiddleware, getAllEmployees);
router.post('/upload-file', upload.single('file'), uploadFile);


export default router;
