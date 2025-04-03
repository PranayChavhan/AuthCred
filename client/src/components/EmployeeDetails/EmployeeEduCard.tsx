import { Employee } from "../../types/employee";

interface EmployeeMetaCardProps {
  employee: Employee | null;
}

export default function EmployeeEduCard({ employee }: EmployeeMetaCardProps) {
  if (!employee) return null;

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Education background
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
<div className="flex flex-row align-middle items-center gap-2">
<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Highest Qualification
                </p>

                <span
  className={`inline-flex items-center px-5 h-7 rounded-4xl text-xs font-medium 
    ${employee.educationBackground?.verificationStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
    employee.educationBackground?.verificationStatus === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
    employee.educationBackground?.verificationStatus === 'Verified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''
  }`}
>
  {employee.educationBackground?.verificationStatus}
</span>

</div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.educationBackground?.highestQualification}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Institution Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.educationBackground?.institutionName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Year Of Passing
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.educationBackground?.yearOfPassing}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Educational Certificates
                </p>
                <a
                  href={`https://authcred.onrender.com${employee.educationBackground.educationalCertificates}`}
                  target="_blank"
                  className="text-sm font-medium text-blue-800 dark:text-white/90 underline"
                >
                  View document
                </a>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Institution/University Email
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.educationBackground?.email}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Phone (Optional)
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.educationBackground?.phoneNumber}
                </p>
              </div>
            </div>

            <h4 className="text-lg pt-10 font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Additional Studies
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
              <div className="flex flex-row align-middle items-center gap-2">
<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Level
                </p>

                <span
  className={`inline-flex items-center px-5 h-7 rounded-4xl text-xs font-medium 
    ${employee.educationBackground.additionalStudies[0].verificationStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
    employee.educationBackground.additionalStudies[0].verificationStatus === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
    employee.educationBackground.additionalStudies[0].verificationStatus === 'Verified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''
  }`}
>
  {employee.educationBackground.additionalStudies[0].verificationStatus}
</span>

</div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.educationBackground.additionalStudies[0].level}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Institution Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {
                    employee.educationBackground.additionalStudies[0]
                      .institutionName
                  }
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Year Of Passing
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {
                    employee.educationBackground.additionalStudies[0]
                      .yearOfPassing
                  }
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Educational Certificates
                </p>
                <a
                  href={`https://authcred.onrender.com${employee.educationBackground.additionalStudies[0].marksheet}`}
                  target="_blank"
                  className="text-sm font-medium text-blue-800 dark:text-white/90 underline"
                >
                  View document
                </a>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  College Email
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.educationBackground.additionalStudies[0].email}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Phone (Optional)
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {
                    employee.educationBackground.additionalStudies[0]
                      .phoneNumber
                  }
                </p>
              </div>
            </div>
            <hr className="my-5"></hr>
            <div className="grid grid-cols-1  gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
              <div className="flex flex-row align-middle items-center gap-2">
<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Level
                </p>

                <span
  className={`inline-flex items-center px-5 h-7 rounded-4xl text-xs font-medium 
    ${employee.educationBackground.additionalStudies[1].verificationStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
    employee.educationBackground.additionalStudies[1].verificationStatus === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
    employee.educationBackground.additionalStudies[1].verificationStatus === 'Verified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''
  }`}
>
  {employee.educationBackground.additionalStudies[1].verificationStatus}
</span>

</div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.educationBackground.additionalStudies[1].level}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Institution Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {
                    employee.educationBackground.additionalStudies[1]
                      .institutionName
                  }
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Year Of Passing
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {
                    employee.educationBackground.additionalStudies[1]
                      .yearOfPassing
                  }
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Educational Certificates
                </p>
                <a
                  href={`https://authcred.onrender.com${employee.educationBackground.additionalStudies[1].marksheet}`}
                  target="_blank"
                  className="text-sm font-medium text-blue-800 dark:text-white/90 underline"
                >
                  View document
                </a>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  College Email
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.educationBackground.additionalStudies[1].email}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Phone (Optional)
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {
                    employee.educationBackground.additionalStudies[1]
                      .phoneNumber
                  }
                </p>
              </div>
            </div>

            <hr className="my-5"></hr>

            <div className="grid grid-cols-1  gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
              <div className="flex flex-row align-middle items-center gap-2">
<p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Level
                </p>

                <span
  className={`inline-flex items-center px-5 h-7 rounded-4xl text-xs font-medium 
    ${employee.educationBackground.additionalStudies[2].verificationStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
    employee.educationBackground.additionalStudies[2].verificationStatus === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
    employee.educationBackground.additionalStudies[2].verificationStatus === 'Verified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''
  }`}
>
  {employee.educationBackground.additionalStudies[2].verificationStatus}
</span>

</div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.educationBackground.additionalStudies[2].level}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Institution Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {
                    employee.educationBackground.additionalStudies[2]
                      .institutionName
                  }
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Year Of Passing
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {
                    employee.educationBackground.additionalStudies[2]
                      .yearOfPassing
                  }
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Educational Certificates
                </p>
                <a
                  href={`https://authcred.onrender.com${employee.educationBackground.additionalStudies[2].marksheet}`}
                  target="_blank"
                  className="text-sm font-medium text-blue-800 dark:text-white/90 underline"
                >
                  View document
                </a>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  College Email
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {employee.educationBackground.additionalStudies[2].email}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Phone (Optional)
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {
                    employee.educationBackground.additionalStudies[2]
                      .phoneNumber
                  }
                </p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
}
