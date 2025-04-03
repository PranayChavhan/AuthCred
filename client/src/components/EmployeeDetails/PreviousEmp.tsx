import { Employee } from "../../types/employee";

interface EmployeeMetaCardProps {
  employee: Employee;
}

export default function PreviousEmp({
  employee,
}: EmployeeMetaCardProps) {
  if (!employee) return null;

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-row gap-5 align-middle justify-start">

            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Previous Employment
            </h4>
            <span
  className={`inline-flex items-center px-6 h-8 rounded-4xl text-xs font-medium 
    ${employee.previousEmployment.verificationStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
    employee.previousEmployment.verificationStatus === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
    employee.previousEmployment.verificationStatus === 'Verified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''
  }`}
>
  {employee.previousEmployment.verificationStatus}
</span>

            </div>

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

              <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Experience Certificate
              </p>
              <a href={`https://authcred.onrender.com${employee.previousEmployment.experienceCertificates}`} target="_blank" className="text-sm font-medium text-blue-800 dark:text-white/90 underline">
              View document
              </a>
            </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
}
