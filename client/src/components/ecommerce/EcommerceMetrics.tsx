/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import {
  // ArrowDownIcon,
  // ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import { useEffect, useState } from "react";
// import Badge from "../ui/badge/Badge";



export default function EcommerceMetrics() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [totalVerified, setTotalVerified] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${API_BASE_URL}/employees/all`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const employees = response.data.employees;

          let verifiedCount = 0;
          let pendingCount = 0;

          employees.forEach((employee: { verificationStatus: string; }) => {
  
            if (employee.verificationStatus === 'Verified') {
              verifiedCount++;
            } else if (employee.verificationStatus === 'Pending') {
              pendingCount++;
            }else if (employee.verificationStatus === 'Rejected') {
              pendingCount++;
            }

          });
  
          setTotalVerified(verifiedCount);
          setTotalPending(pendingCount);
  
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchEmployees();
    }, []);
  


  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Background Checks Completed
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totalVerified}
            </h4>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
            Pending Verifications
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totalPending}
            </h4>
          </div>

          {/* <Badge color="error">
            <ArrowDownIcon />
            9.05%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
