import { Employee } from "../../types/employee";

interface EmployeeMetaCardProps {
  employee: Employee;
}



export default function EmployeeInfoCard({ employee }: EmployeeMetaCardProps) {
  if (!employee) return null;

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employee.firstName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employee.lastName}
              </p>
            </div>

            

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employee.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employee.phoneNumber}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Date of birth
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employee.dateOfBirth}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Gender
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employee.gender}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Nationality
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employee.nationality}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Government Id Number
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employee.governmentIdNumber}
              </p>
            </div>


            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Government Id
              </p>
              <a href={`https://authcred.onrender.com${employee.governmentIdProof}`} target="_blank" className="text-sm font-medium text-blue-800 dark:text-white/90 underline">
              View document
              </a>
            </div>

          </div>
        </div>

       

      </div>

    </div>
  );
}
