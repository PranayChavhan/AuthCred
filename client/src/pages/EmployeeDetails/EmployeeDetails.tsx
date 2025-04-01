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
      } catch (err) {
        console.log(err);
        
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

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