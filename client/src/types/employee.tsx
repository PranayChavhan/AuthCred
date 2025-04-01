// src/types/employee.ts
export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }
  
  export interface EducationBackground {
    email: string;
    phoneNumber: string;
    highestQualification: string;
    institutionName: string;
    yearOfPassing: string;
    educationalCertificates: File | null;
    additionalStudies: AdditionalStudy[];
    verificationStatus: string;
  }

  type AdditionalStudy = {
    _id: string;
    level: "10th" | "12th" | "Diploma";
    institutionName: string;
    yearOfPassing: string;
    marksheet: File | null;
    email: string;
    phoneNumber: string;
    verificationStatus: string;
  };
  type PreviousEmployment = {
    jobTitle: string;
    companyName: string;
    companyEmail: string;
    hrEmail: string;
    duration: string;
    reasonForLeaving: string;
    experienceCertificates: File | null;
    verificationStatus: string;
  };
  
  export interface Employee {
    _id?: string;
    email: string;
    verificationStatus: string;
    profilePhoto: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    governmentIdNumber: string;
    governmentIdProof: string;
    currentAddress: Address;
    permanentAddress: Address;
    educationBackground: EducationBackground;
    previousEmployment: PreviousEmployment;
  }