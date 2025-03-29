import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PhoneInput from "../../components/form/group-input/PhoneInput";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { CalenderIcon, EnvelopeIcon } from "../../icons";
import Flatpickr from "react-flatpickr";
import Radio from "../../components/form/input/Radio";
import Select from "../../components/form/Select";
import FileInput from "../../components/form/input/FileInput";
import axios from "axios";
import { useParams } from 'react-router';
type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type EducationBackground = {
  highestQualification: string;
  institutionName: string;
  yearOfPassing: string;
  educationalCertificates: File | null;
  additionalStudies: AdditionalStudy[];
};

type AdditionalStudy = {
  level: "10th" | "12th" | "Diploma";
  institutionName: string;
  yearOfPassing: string;
  marksheet: File | null;
};

type PreviousEmployment = {
  jobTitle: string;
  companyName: string;
  companyEmail: string;
  hrEmail: string;
  duration: string;
  reasonForLeaving: string;
  experienceCertificates: File | null;
};
interface FormData {
  educationBackground: EducationBackground;
  previousEmployment: PreviousEmployment;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  governmentIdNumber: string;
  currentAddress: Address;
  permanentAddress: Address;
  middleName: string;
  firstName: string;
  profilePhoto: File | null;
  email: string;
  phoneNumber: string;
  nationality: string;
  governmentIdProof: File | null;
}

export default function EmployeeVerificationForm() {
  const { id } = useParams();
  // Country and Phone Number Setup
  const countries = [
    { code: "IN", label: "+91" },
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];

  // State Management
  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    profilePhoto: null,
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "Male",
    nationality: "",
    governmentIdNumber: "",
    governmentIdProof: null,

    // Address Information
    currentAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    permanentAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },

    // Educational Background
    educationBackground: {
      highestQualification: "",
      institutionName: "",
      yearOfPassing: "",
      educationalCertificates: null,
      additionalStudies: [
        {
          level: "10th",
          institutionName: "",
          yearOfPassing: "",
          marksheet: null,
        },
        {
          level: "12th",
          institutionName: "",
          yearOfPassing: "",
          marksheet: null,
        },
        {
          level: "Diploma",
          institutionName: "",
          yearOfPassing: "",
          marksheet: null,
        },
      ],
    },

    // Previous Employment
    previousEmployment: {
      jobTitle: "",
      companyName: "",
      companyEmail: "",
      hrEmail: "",
      duration: "",
      reasonForLeaving: "",
      experienceCertificates: null,
    },
  });

  // Handler Functions
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (
    addressType: "currentAddress" | "permanentAddress",
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [field]: value,
      },
    }));
  };

  const handleEducationChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      educationBackground: {
        ...prev.educationBackground,
        [field]: value,
      },
    }));
  };

  const handleAdditionalStudiesChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedStudies = [...formData.educationBackground.additionalStudies];
    updatedStudies[index] = {
      ...updatedStudies[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      educationBackground: {
        ...prev.educationBackground,
        additionalStudies: updatedStudies,
      },
    }));
  };

  const handlePreviousEmploymentChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      previousEmployment: {
        ...prev.previousEmployment,
        [field]: value,
      },
    }));
  };

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const file = e.target.files?.[0] || null;
    
  
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        // Upload file to backend
        const response = await fetch("http://localhost:5000/api/employees/upload-file", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || "File upload failed.");
        }
  
        const fileUrl = data.url; // Get file URL from API response
        console.log('====================================');
        console.log(fileUrl);
        console.log('====================================');

         // If the field is 'profilePhoto', update the preview
          if (field === "profilePhoto") {
            setPreview(`https://authcred.onrender.com${fileUrl}`);
          }
  
        setFormData((prevFormData) => {
          if (field === "educationalCertificates") {
            return {
              ...prevFormData,
              educationBackground: {
                ...prevFormData.educationBackground,
                educationalCertificates: fileUrl, // Store URL instead of file
              },
            };
          } else if (field === "marksheet" && index !== undefined) {
            const updatedStudies = [...prevFormData.educationBackground.additionalStudies];
            updatedStudies[index] = {
              ...updatedStudies[index],
              marksheet: fileUrl, // Store URL
            };
  
            return {
              ...prevFormData,
              educationBackground: {
                ...prevFormData.educationBackground,
                additionalStudies: updatedStudies,
              },
            };
          } else if (field === "experienceCertificates") {
            return {
              ...prevFormData,
              previousEmployment: {
                ...prevFormData.previousEmployment,
                experienceCertificates: fileUrl, // Store URL
              },
            };
          } else if (field === "profilePhoto") {
            // setPreview(fileUrl);
            return {
              ...prevFormData,
              profilePhoto: fileUrl, // Store URL
            };
          } else if (field === "governmentIdProof") {
            return {
              ...prevFormData,
              governmentIdProof: fileUrl, // Store URL
            };
          }
  
          return prevFormData;
        });
      } catch (error) {
        console.error("File upload error:", error);
      }
    }
  };
  

  const updateEmployee = async (formData: FormData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/employees/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Employee updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  };
  
  // Usage with your existing handleSubmit function:
  const handleSubmit = () => {
    console.log("====================================");
    console.log(formData);
    console.log("====================================");
    
    // Call the update function
    updateEmployee(formData)
      .then(result => {
        console.log('Update successful:', result);
        // Add any success handling here (e.g., redirect, show success message)
      })
      .catch(error => {
        console.error('Update failed:', error);
        // Add error handling here (e.g., show error message)
      });
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50">
      <ComponentCard
        className="w-full max-w-4xl"
        title="Employee Verification Form"
      >
        {/* Personal Information Section */}
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <label
              htmlFor="profile-upload"
              className="mt-4 cursor-pointer bg-brand-500 text-white px-4 py-2 rounded-lg"
            >
              Upload Photo
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange("profilePhoto", e)}
              className="hidden"
            />
          </div>

          <div className="flex flex-row justify-between">
            <div className="w-[30%]">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div className="w-[30%]">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                type="text"
                id="middleName"
                value={formData.middleName}
                onChange={(e) =>
                  handleInputChange("middleName", e.target.value)
                }
              />
            </div>
            <div className="w-[30%]">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
          </div>

          {/* Contact and Personal Details */}
          <div className="flex flex-row justify-between">
            <div className="w-[48%]">
              <Label>Email *</Label>
              <div className="relative">
                <Input
                  placeholder="info@gmail.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-[62px]"
                />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <EnvelopeIcon className="size-6" />
                </span>
              </div>
            </div>
            <div className="w-[48%]">
              <Label>Phone *</Label>
              <PhoneInput
                selectPosition="start"
                countries={countries}
                placeholder="+1 (555) 000-0000"
                onChange={(phone) => handleInputChange("phoneNumber", phone)}
              />
            </div>
          </div>

          {/* Date of Birth and Gender */}
          <div className="flex flex-row justify-between">
            <div className="w-[48%]">
              <Label htmlFor="datePicker">Date of Birth *</Label>
              <div className="relative w-full flatpickr-wrapper">
                <Flatpickr
                  value={formData.dateOfBirth}
                  onChange={(date) =>
                    handleInputChange(
                      "dateOfBirth",
                      date[0].toLocaleDateString()
                    )
                  }
                  options={{
                    dateFormat: "Y-m-d",
                    maxDate: "today",
                  }}
                  placeholder="Select Date of Birth"
                  className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <CalenderIcon className="size-6" />
                </span>
              </div>
            </div>
            <div className="w-[48%]">
              <ComponentCard title="Gender *">
                <div className="flex flex-wrap items-center gap-8">
                  <Radio
                    id="radio1"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={() => handleInputChange("gender", "Male")}
                    label="Male"
                  />
                  <Radio
                    id="radio2"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={() => handleInputChange("gender", "Female")}
                    label="Female"
                  />
                  <Radio
                    id="radio3"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={() => handleInputChange("gender", "Other")}
                    label="Other"
                  />
                </div>
              </ComponentCard>
            </div>
          </div>

          {/* Nationality and Government ID */}
          <div className="flex flex-row justify-between">
            <div className="w-[48%]">
              <Label>Nationality *</Label>
              <Select
                options={[
                  { value: "IN", label: "India" },
                  { value: "US", label: "United States" },
                  { value: "GB", label: "United Kingdom" },
                  { value: "CA", label: "Canada" },
                  { value: "AU", label: "Australia" },
                ]}
                placeholder="Select Option"
                onChange={(value) => handleInputChange("nationality", value)}
              />
            </div>
            <div className="w-[48%]">
              <Label>Government ID Number *</Label>
              <Input
                type="text"
                placeholder="PAN/SSN/Aadhaar"
                value={formData.governmentIdNumber}
                onChange={(e) =>
                  handleInputChange("governmentIdNumber", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <Label>Upload Government ID</Label>
            <FileInput
              onChange={(e) => handleFileChange("governmentIdProof", e)}
              className="custom-class"
            />
          </div>

          {/* More fields would continue similarly... */}
          {/* For brevity, I'll omit the rest of the form, but the structure would follow the same pattern */}

          {/* Address Information */}
          <div className="space-y-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Address Information</h2>

            {/* Current Address */}
            <div className="border-b pb-4 mb-4">
              <h3 className="text-lg font-medium mb-3">Current Address *</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Street Address *</Label>
                  <Input
                    type="text"
                    value={formData.currentAddress.street}
                    onChange={(e) =>
                      handleAddressChange(
                        "currentAddress",
                        "street",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <Label>City *</Label>
                  <Input
                    type="text"
                    value={formData.currentAddress.city}
                    onChange={(e) =>
                      handleAddressChange(
                        "currentAddress",
                        "city",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <Label>State *</Label>
                  <Input
                    type="text"
                    value={formData.currentAddress.state}
                    onChange={(e) =>
                      handleAddressChange(
                        "currentAddress",
                        "state",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Postal Code *</Label>
                  <Input
                    type="text"
                    value={formData.currentAddress.postalCode}
                    onChange={(e) =>
                      handleAddressChange(
                        "currentAddress",
                        "postalCode",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label>Country *</Label>
                  <Select
                    options={[
                      { value: "IN", label: "India" },
                      { value: "US", label: "United States" },
                      { value: "GB", label: "United Kingdom" },
                      { value: "CA", label: "Canada" },
                      { value: "AU", label: "Australia" },
                    ]}
                    //   value={formData.currentAddress.country}
                    onChange={(value) =>
                      handleAddressChange("currentAddress", "country", value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Permanent Address (Optional) */}
            <div>
              <h3 className="text-lg font-medium mb-3">
                Permanent Address (Optional)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Street Address</Label>
                  <Input
                    type="text"
                    value={formData.permanentAddress.street}
                    onChange={(e) =>
                      handleAddressChange(
                        "permanentAddress",
                        "street",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>City</Label>
                  <Input
                    type="text"
                    value={formData.permanentAddress.city}
                    onChange={(e) =>
                      handleAddressChange(
                        "permanentAddress",
                        "city",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <Label>State *</Label>
                  <Input
                    type="text"
                    value={formData.permanentAddress.state}
                    onChange={(e) =>
                      handleAddressChange(
                        "permanentAddress",
                        "state",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Postal Code *</Label>
                  <Input
                    type="text"
                    value={formData.permanentAddress.postalCode}
                    onChange={(e) =>
                      handleAddressChange(
                        "permanentAddress",
                        "postalCode",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label>Country *</Label>
                  <Select
                    options={[
                      { value: "IN", label: "India" },
                      { value: "US", label: "United States" },
                      { value: "GB", label: "United Kingdom" },
                      { value: "CA", label: "Canada" },
                      { value: "AU", label: "Australia" },
                    ]}
                    //   value={formData.permanentAddress.country}
                    onChange={(value) =>
                      handleAddressChange("permanentAddress", "country", value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Educational Background */}
          <div className="space-y-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Educational Background
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Highest Qualification *</Label>
                <Select
                  options={[
                    { value: "bachelor", label: "Bachelor's Degree" },
                    { value: "master", label: "Master's Degree" },
                    { value: "phd", label: "PhD" },
                    { value: "diploma", label: "Diploma" },
                    { value: "12th", label: "12th Standard" },
                  ]}
                  // value={formData.educationBackground.highestQualification}
                  onChange={(value) =>
                    handleEducationChange("highestQualification", value)
                  }
                />
              </div>
              <div>
                <Label>Institution/University Name *</Label>
                <Input
                  type="text"
                  value={formData.educationBackground.institutionName}
                  onChange={(e) =>
                    handleEducationChange("institutionName", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Year of Passing *</Label>
                <Input
                  type="text"
                  placeholder="YYYY"
                  value={formData.educationBackground.yearOfPassing}
                  onChange={(e) =>
                    handleEducationChange("yearOfPassing", e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <Label>Upload Certificate</Label>
              <FileInput
                onChange={(e) => handleFileChange("educationalCertificates", e)}
                className="custom-class"
              />
            </div>

            {/* Additional Studies */}
            {formData.educationBackground.additionalStudies.map(
              (study, index) => (
                <div key={study.level} className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label>{study.level} Level</Label>
                    <Input
                      type="text"
                      placeholder="Institution Name"
                      value={study.institutionName}
                      onChange={(e) =>
                        handleAdditionalStudiesChange(
                          index,
                          "institutionName",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Year of Passing</Label>
                    <Input
                      type="text"
                      placeholder="YYYY"
                      value={study.yearOfPassing}
                      onChange={(e) =>
                        handleAdditionalStudiesChange(
                          index,
                          "yearOfPassing",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <Label>Upload Marksheet</Label>
                    <FileInput
                      onChange={(e) => handleFileChange("marksheet", e, index)}
                      className="custom-class"
                    />
                  </div>
                </div>
              )
            )}
          </div>

          {/* Previous Employment */}
          <div className="space-y-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Previous Employment</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Job Title *</Label>
                <Input
                  type="text"
                  value={formData.previousEmployment.jobTitle}
                  onChange={(e) =>
                    handlePreviousEmploymentChange("jobTitle", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Company Name *</Label>
                <Input
                  type="text"
                  value={formData.previousEmployment.companyName}
                  onChange={(e) =>
                    handlePreviousEmploymentChange(
                      "companyName",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label>Company Email</Label>
                <Input
                  type="email"
                  value={formData.previousEmployment.companyEmail}
                  onChange={(e) =>
                    handlePreviousEmploymentChange(
                      "companyEmail",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label>HR Email</Label>
                <Input
                  type="email"
                  value={formData.previousEmployment.hrEmail}
                  onChange={(e) =>
                    handlePreviousEmploymentChange("hrEmail", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Duration of Employment *</Label>
                <Input
                  type="text"
                  placeholder="e.g., Jan 2020 - Dec 2022"
                  value={formData.previousEmployment.duration}
                  onChange={(e) =>
                    handlePreviousEmploymentChange("duration", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Reason for Leaving</Label>
                <Input
                  type="text"
                  value={formData.previousEmployment.reasonForLeaving}
                  onChange={(e) =>
                    handlePreviousEmploymentChange(
                      "reasonForLeaving",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div>
              <Label>Upload Experience Certificates</Label>
              <FileInput
                onChange={(e) => handleFileChange("experienceCertificates", e)}
                className="custom-class"
              />
            </div>
          </div>

          {/* Form Submission */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
            >
              Submit Verification Form
            </button>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
