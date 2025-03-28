import express from 'express';
import { uploadEmployee, updateEmployee, getAllEmployees } from '../controllers/employeeController.js';
import authMiddleware from "../middleware/authMiddleware.js"; // Import middleware

const router = express.Router();

router.post('/upload', authMiddleware, uploadEmployee);
router.put('/update/:id', updateEmployee);
router.get('/all', authMiddleware, getAllEmployees);

export default router;
