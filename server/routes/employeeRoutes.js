import express from 'express';
import { uploadEmployee, updateEmployee, getAllEmployees } from '../controllers/employeeController.js';

const router = express.Router();

router.post('/upload', uploadEmployee);
router.put('/update/:id', updateEmployee);
router.get('/all', getAllEmployees);

export default router;
