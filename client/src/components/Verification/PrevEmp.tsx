/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { Employee } from "../../types/employee";
import { useParams } from "react-router";
import { useState } from "react";


interface EmployeeMetaCardProps {
  employee: Employee;
}


export default function PreEmp({
  employee,
}: EmployeeMetaCardProps) {
  if (!employee) return null;
  const { id } = useParams();
    const [showSuccessModal, setShowSuccessModal] = useState(false); 
  
  const updateEmployee = async (verificationStatus: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/employees/update/${id}`,
        {
            previousEmployment: { verificationStatus },
        },
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
  
  const handleSubmit = () => {

    // Call the update function
    updateEmployee("Verified")
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
            Previous Employment
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Job Title
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.previousEmployment?.jobTitle}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Company Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.previousEmployment?.companyName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Company Email
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.previousEmployment?.companyEmail}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                HR Email
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.previousEmployment?.hrEmail}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Duration
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.previousEmployment?.duration}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Reason For Leaving
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.previousEmployment?.reasonForLeaving}
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
