import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    // Basic Information
    email: { type: String, required: true, unique: true },
    verificationStatus: { type: String, default: 'Pending' },

    // Personal Information
    profilePhoto: { type: String, default: null },
    firstName: { type: String, default: "" },
    middleName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    dateOfBirth: { type: String, default: "" },
    gender: { type: String, default: "Male" },
    nationality: { type: String, default: "" },
    governmentIdNumber: { type: String, default: "" },
    governmentIdProof: { type: String, default: null },

    // Address Information
    currentAddress: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "" }
    },
    permanentAddress: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "" }
    },

    // Educational Background
    educationBackground: {
      highestQualification: { type: String, default: "" },
      institutionName: { type: String, default: "" },
      yearOfPassing: { type: String, default: "" },
      educationalCertificates: { type: String, default: null },
      email: { type: String },
      phoneNumber: { type: String, default: "" },
      verificationStatus: { type: String, default: 'Pending' },
      additionalStudies: [
        {
          level: { type: String },
          institutionName: { type: String, default: "" },
          yearOfPassing: { type: String, default: "" },
          marksheet: { type: String, default: null },
          email: { type: String },
          phoneNumber: { type: String, default: "" },
          verificationStatus: { type: String, default: 'Pending' },
        }
      ]
    },

    // Previous Employment
    previousEmployment: {
      jobTitle: { type: String, default: "" },
      companyName: { type: String, default: "" },
      companyEmail: { type: String, default: "" },
      hrEmail: { type: String, default: "" },
      duration: { type: String, default: "" },
      reasonForLeaving: { type: String, default: "" },
      experienceCertificates: { type: String, default: null },
      verificationStatus: { type: String, default: 'Pending' },
    }

}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
