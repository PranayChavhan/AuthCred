import VerificationCard from "../../components/Verification/VerificationCard";
import { useEffect, useState } from "react";
import { Employee } from "../../types/employee";
import axios from "axios";
import { useParams } from "react-router";
import PreEmp from "../../components/Verification/PrevEmp";
import EduEmp from "../../components/Verification/EduEmp";
import Level1 from "../../components/Verification/Level1";
import Level2 from "../../components/Verification/Level2";
import Level3 from "../../components/Verification/Level3";

export default function VerificationPage() {
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { institute, id } = useParams();
console.log(id);



  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/employees/emp/67e85684b332c35860d1cf69`,
          {}
        );
        // Assuming we want the first employee from the list
        setEmployeeData(response.data.employee);
        // console.log("====================================");
        // console.log(response.data.employee);
        // console.log("====================================");
        // Set default selected document if employee has documents
        if (institute === "institute") {
          setSelectedDocument(
            response.data.employee.educationBackground.educationalCertificates
          );
        }
        if (institute === "company") {
          setSelectedDocument(
            response.data.employee.previousEmployment.experienceCertificates
          );
        }
        if (institute === "10th") {
          setSelectedDocument(
            response.data.employee.educationBackground.additionalStudies[0].marksheet
          );
        }
        if (institute === "12th") {
          setSelectedDocument(
            response.data.employee.educationBackground.additionalStudies[1].marksheet
          );
        }
        if (institute === "diploma") {
          setSelectedDocument(
            response.data.employee.educationBackground.additionalStudies[2].marksheet
          );
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!employeeData) return <div>No employee data found</div>;

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left side - Document Preview */}
      <div className="w-full lg:w-1/2 p-4 flex flex-col">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
            Document Preview
          </h3>

          {selectedDocument ? (
            <div className=" flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
              <img
                src={`http://localhost:5000${selectedDocument}`}
                alt="Document preview"
                className=""
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-document.png";
                }}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
              <p className="text-gray-500 dark:text-gray-400">
                No document selected
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right side - Employee Info Components */}
      <div className="w-full lg:w-2/2 p-4">
        <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Employee Profile
          </h3>
          <div className="space-y-6">
            <VerificationCard employee={employeeData} />
            {
              institute === "company" ?
              <>
              <PreEmp employee={employeeData} />
              </>
              :
              null
            }
             {
              institute === "institute" ?
              <>
              <EduEmp employee={employeeData} />
              </>
              :
              null
            }
            {
              institute === "10th" ?
              <>
              <Level1 employee={employeeData} />
              </>
              :
              null
            }
            {
              institute === "12th" ?
              <>
              <Level2 employee={employeeData} />
              </>
              :
              null
            }
            {
              institute === "diploma" ?
              <>
              <Level3 employee={employeeData} />
              </>
              :
              null
            }
          </div>
        </div>
      </div>
    </div>
  );
}
