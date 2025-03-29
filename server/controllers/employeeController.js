import Employee from '../models/employeeModel.js';
import path from 'path';
import fs from 'fs';
import mailSender from '../utils/mailSender.js';
import otpTemplate from '../mail/templates/emailVerificationTemplate.js'

// Upload File (POST)
export const uploadFile = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }
  
      // Get the file details
      const file = req.file;
      const fileUrl = `/uploads/${file.filename}`;
  
      res.status(200).json({
        message: 'File uploaded successfully.',
        filename: file.filename,
        url: fileUrl
      });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading file.', error: error.message });
    }
  };

  
// Upload Employee (POST)
export const uploadEmployee = async (req, res) => {
    try {
        const { firstName, email } = req.body;

        if (!firstName || !email) {
            return res.status(400).json({ message: 'Name and Email are required.' });
        }

        const employee = new Employee({ firstName, email });
        await employee.save();
        // send email to employee
        
        await mailSender(email, 'Background verification', otpTemplate(employee._id, firstName));

        res.status(201).json({ message: 'Employee uploaded successfully.', employee });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading employee.', error: error.message });
    }
};

// Update Employee (PUT)
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.status(200).json({ message: 'Employee updated successfully.', updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee.', error: error.message });
    }
};


// Get All Employees (GET)
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ message: 'Employees fetched successfully.', employees });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees.', error: error.message });
    }
};
