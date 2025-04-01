import Employee from '../models/employeeModel.js';
import path from 'path';
import fs from 'fs';
import mailSender from '../utils/mailSender.js';
import otpTemplate from '../mail/templates/emailVerificationTemplate.js'
import degreeVerificationTemplate from '../mail/templates/degreeVerificationTemplate.js';
import empVerificationTemplate from '../mail/templates/empVerificationTemplate.js';

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
        
        // await mailSender(email, 'Background verification', otpTemplate(employee._id, firstName));

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

        // await mailSender(updatedEmployee.educationBackground.email, 'Background verification', degreeVerificationTemplate(id, updatedEmployee.firstName, updatedEmployee.educationBackground.institutionName, updatedEmployee.educationBackground.yearOfPassing));

        // await mailSender(updatedEmployee.educationBackground.additionalStudies[0].email, 'Background verification', empVerificationTemplate("10th", id, updatedEmployee.firstName, updatedEmployee.educationBackground.additionalStudies[0].institutionName, updatedEmployee.educationBackground.additionalStudies[0].yearOfPassing));

        // await mailSender(updatedEmployee.educationBackground.additionalStudies[1].email, 'Background verification', empVerificationTemplate("12th", id, updatedEmployee.firstName, updatedEmployee.educationBackground.additionalStudies[1].institutionName, updatedEmployee.educationBackground.additionalStudies[1].yearOfPassing));

        // await mailSender(updatedEmployee.educationBackground.additionalStudies[2].email, 'Background verification', empVerificationTemplate("diploma", id, updatedEmployee.firstName, updatedEmployee.educationBackground.additionalStudies[2].institutionName, updatedEmployee.educationBackground.additionalStudies[2].yearOfPassing));

        // await mailSender(updatedEmployee.previousEmployment.hrEmail, 'Background verification', jobVerificationTemplate(id, updatedEmployee.firstName, updatedEmployee.previousEmployment.jobTitle, updatedEmployee.previousEmployment.companyName, updatedEmployee.previousEmployment.duration,));



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

// Get Employee By ID (GET)
export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.status(200).json({ message: 'Employee fetched successfully.', employee });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee.', error: error.message });
    }
};

// Update Employee Partial (PATCH)
export const updateEmployeePartial = async (req, res) => {
    try {
        const { id } = req.params;  // Get the employee ID from the URL
        const updateData = req.body; // Get the data to be updated from the request body

        // Find the employee by ID
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        // Update the verificationStatus of the top-level educationBackground
        if (updateData.educationBackground && updateData.educationBackground.verificationStatus) {
            employee.educationBackground.verificationStatus = updateData.educationBackground.verificationStatus;
        }

        // Update the verificationStatus of individual studies in additionalStudies
        if (updateData.educationBackground && updateData.educationBackground.additionalStudies) {
            updateData.educationBackground.additionalStudies.forEach((study) => {
                const studyToUpdate = employee.educationBackground.additionalStudies.find(
                    (existingStudy) => existingStudy._id.toString() === study._id
                );
                if (studyToUpdate && study.verificationStatus) {
                    studyToUpdate.verificationStatus = study.verificationStatus;
                }
            });
        }

        // Save the updated employee data
        const updatedEmployee = await employee.save();

        res.status(200).json({ message: 'Employee updated successfully.', updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee.', error: error.message });
    }
};
