import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeMetaCard from "../../components/Verification/VerificationCard";
import EmployeeInfoCard from "../../components/EmployeeDetails/EmployeeInfoCard";
import EmployeeAddressCard from "../../components/EmployeeDetails/EmployeeAddressCard";
import { Employee } from "../../types/employee";
import EmployeePAddressCard from "../../components/EmployeeDetails/EmployeePAddressCard.";
import EmployeeEduCard from "../../components/EmployeeDetails/EmployeeEduCard";
import PreviousEmp from "../../components/EmployeeDetails/PreviousEmp";
import { useParams } from 'react-router';


export default function EmployeeDetails() {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
      
        const token = localStorage.getItem("token"); // Get token from localStorage
      
        const response = await axios.get(`${API_BASE_URL}/employees/emp/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Prefix the token with 'Bearer '
          }
        });
        // Assuming we want the first employee from the list
        setEmployeeData(response.data.employee);
        setLoading(false);


        // Check if employee is fully verified and trigger API call if true
        if (response.data.employee.verificationStatus === "Verified") {
          await triggerVerifiedAPI(response.data.employee);
          await triggerUploadResumeAPI(response.data.employee);
      }


      } catch (err) {
        console.log(err);
        
        setLoading(false);
      }
    };
    fetchEmployeeData();
  }, [id, API_BASE_URL]);


// Trigger API when employee is verified
const triggerVerifiedAPI = async (employee: Employee) => {
  try {

      // Prepare the data to be sent in the request body
      const requestBody = {
          name: `${employee.firstName} ${employee.lastName}`,
          mobile: employee.phoneNumber,
          aadhar: employee.governmentIdNumber,
          resumeIPFS: "http://localhost:5000/uploads/Resume.pdf"
      };

      const response = await axios.post(`http://localhost:3000/register`, requestBody, {
          headers: {
              'Content-Type': 'application/json'
          }
      });

      console.log('API Triggered Successfully: ', response.data);

  } catch (error) {
      console.log('Error triggering API:', error);
  }
};

const triggerUploadResumeAPI = async (employee: Employee) => {
  try {

      // Prepare the data to be sent in the request body
      const requestBody = {
          name: `${employee.firstName} ${employee.lastName}`,
          mobile: employee.phoneNumber,
          aadhar: employee.governmentIdNumber,
          resumeIPFS: "http://localhost:5000/uploads/Resume.pdf"
      };

      const response = await axios.post(`http://localhost:3000/updateResume`, requestBody, {
          headers: {
              'Content-Type': 'application/json'
          }
      });

      console.log('API Triggered Successfully: ', response.data);

  } catch (error) {
      console.log('Error triggering API:', error);
  }
};

  if (loading) return <div>Loading...</div>;
  if (!employeeData?.lastName) return <div>Employee has not filled the form yet........</div>;


  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Employee details
        </h3>
        <div className="space-y-6">
          <EmployeeMetaCard employee={employeeData} />
          <EmployeeInfoCard employee={employeeData} />
          <EmployeeAddressCard 
            employee={employeeData}
          />
          <EmployeePAddressCard 
            employee={employeeData}
          />
          <EmployeeEduCard 
            employee={employeeData}
          />
          <PreviousEmp
            employee={employeeData}
          />
        </div>
      </div>
    </>
  );
}