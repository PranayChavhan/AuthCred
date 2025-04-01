/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableCell, TableHeader, TableRow } from "../ui/table";
import { useNavigate } from "react-router";


interface Employee {
  profilePhoto: string;
  _id: string;
  firstName: string;
  email: string;
  verificationStatus: "Verified" | "Pending" | "Flagged";
  createdAt: string;
}

export default function EmployeeList() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const FILE_BASE_URL = import.meta.env.VITE_API_BASE_URL_FILE;
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/employees/all`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const sortedEmployees = response.data.employees.sort((a: Employee, b: Employee) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        
        setEmployees(sortedEmployees);
        setLoading(false);


      } catch (err) {
        setError('Failed to fetch employees');
        console.log(err);
        
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);


  const filteredData = filter 
    ? employees.filter((emp) => emp.verificationStatus === filter) 
    : employees;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  const handleRowClick = (employeeId: string) => {
    console.log('====================================');
    console.log(employeeId);
    console.log('====================================');
    navigate(`/employee/${employeeId}`);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Employee Verification</h3>
        <div className="flex items-center gap-8">
          <button onClick={() => setFilter(null)} className={`btn ${filter === null ? "bg-gray-200 p-2 rounded-md" : ""}`}>
            All Employees
          </button>
          <button onClick={() => setFilter("Verified")} className={`btn ${filter === "Verified" ? "bg-gray-200 p-2 rounded-md" : ""}`}>
            ✅ Verified
          </button>
          <button onClick={() => setFilter("Pending")} className={`btn ${filter === "Pending" ? "bg-gray-200 p-2 rounded-md" : ""}`}>
            ⚠️ Pending
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 text-gray-500 text-start">Employee</TableCell>
              <TableCell isHeader className="py-3 text-gray-500 text-start">Email</TableCell>
              <TableCell isHeader className="py-3 text-gray-500 text-start">Status</TableCell>
              <TableCell isHeader className="py-3 text-gray-500 text-start">Created At</TableCell>
            </TableRow>
          </TableHeader>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 w-full">
      {filteredData.map((employee) => (
        <tr
          key={employee._id}
          onClick={() => handleRowClick(employee._id)}
          className="cursor-pointer w-full hover:bg-gray-100 border rounded-b-2xl"
        >
          <td className="py-3 px-4 flex items-center gap-3 w-full">
            <img
              src={`${FILE_BASE_URL}${employee.profilePhoto}`}
              className="h-[50px] w-[50px] rounded-md"
              alt={employee.firstName}
            />
            <div>
              <p className="font-medium text-gray-800 dark:text-white/90">
                {employee.firstName} {' '}
                {`${FILE_BASE_URL}${employee.profilePhoto}`}
              </p>
            </div>
          </td>
          <td className="py-3 px-4 text-gray-500">{employee.email}</td>
          <td className="py-3 px-4 text-gray-500">
            <span
              className={`${
                employee.verificationStatus === "Verified"
                  ? "text-green-500"
                  : employee.verificationStatus === "Pending"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {employee.verificationStatus}
            </span>
          </td>
          <td className="py-3 px-4 text-gray-500">
            {new Date(employee.createdAt).toLocaleDateString()}
          </td>
        </tr>
      ))}
    </tbody>
        </Table>
      </div>
    </div>
  );
}