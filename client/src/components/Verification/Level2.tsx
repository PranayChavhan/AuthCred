/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { Employee } from "../../types/employee";
import { useParams } from "react-router";
import { useState } from "react";


interface EmployeeMetaCardProps {
  employee: Employee;
}


export default function Level2({
  employee,
}: EmployeeMetaCardProps) {
  if (!employee) return null;
  const { id } = useParams();
    const [showSuccessModal, setShowSuccessModal] = useState(false); 
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const updateEmployee = async (studyId: string, verificationStatus: string) => {
      try {
        const response = await axios.patch(
          `${API_BASE_URL}/employees/update/${id}`, // Make sure this URL is correct
          {
            educationBackground: {
              additionalStudies: [
                {
                  _id: studyId,  // specify the study ID that you want to update
                  verificationStatus: verificationStatus,  // update the verificationStatus of that study
                },
              ],
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        console.log('Employee updated successfully:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
      }
    };
    
  
  const handleSubmit = () => {

    // Call the update function
    updateEmployee(employee.educationBackground.additionalStudies[1]._id, "Verified")
      .then(result => {
        console.log('Update successful:', result);

        setShowSuccessModal(true);
      })
      .catch(error => {
        console.error('Update failed:', error);
        // Add error handling here (e.g., show error message)
      });
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);

    // Close the current page by redirecting to a blank page
    window.location.href = 'about:blank';
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      {showSuccessModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-600">🎉 Success!</h2>
            <p className="text-center mb-6 text-gray-700">Employee verified successfully.</p>
            <button 
              onClick={handleCloseModal}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Education background
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Institution Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.educationBackground.additionalStudies[1].institutionName}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Year Of Passing
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {employee.educationBackground.additionalStudies[1].yearOfPassing}
                </p>
              </div>

             

              <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md">
                Verify
            </button>

            </div>
          </div>


        </div>
      </div>
    </>
  );
}
