import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";

// Simple icon components to replace Lucide icons
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default function Notification() {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl  border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-primary-500"><BellIcon /></span>
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Notifications
          </h5>
        </div>
        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-white bg-primary-500 rounded-full">
          8
        </span>
      </div>
      
      <ul className="flex flex-col h-auto max-h-[480px] overflow-y-auto custom-scrollbar space-y-8">
        {/* Notification items */}
        <li>
          <DropdownItem className="flex gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="relative flex-shrink-0">
              <img
                width={40}
                height={40}
                src="/images/user/user-02.jpg"
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success-500 dark:border-gray-800"></span>
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  Terry Franci
                </span>{" "}
                requests permission to change{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  Project - Nganter App
                </span>
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Project</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400"><ClockIcon /></span>
                  <span>5 min ago</span>
                </div>
              </div>
            </div>
          </DropdownItem>
        </li>

        <li>
          <DropdownItem className="flex gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="relative flex-shrink-0">
              <img
                width={40}
                height={40}
                src="/images/user/user-03.jpg"
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success-500 dark:border-gray-800"></span>
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  Alena Franci
                </span>{" "}
                requests permission to change{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  Project - Nganter App
                </span>
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Project</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400"><ClockIcon /></span>
                  <span>8 min ago</span>
                </div>
              </div>
            </div>
          </DropdownItem>
        </li>

        <li>
          <DropdownItem className="flex gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="relative flex-shrink-0">
              <img
                width={40}
                height={40}
                src="/images/user/user-04.jpg"
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success-500 dark:border-gray-800"></span>
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  Jocelyn Kenter
                </span>{" "}
                requests permission to change{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  Project - Nganter App
                </span>
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Project</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400"><ClockIcon /></span>
                  <span>15 min ago</span>
                </div>
              </div>
            </div>
          </DropdownItem>
        </li>

        <li>
          <DropdownItem className="flex gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="relative flex-shrink-0">
              <img
                width={40}
                height={40}
                src="/images/user/user-05.jpg"
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-error-500 dark:border-gray-800"></span>
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  Brandon Philips
                </span>{" "}
                requests permission to change{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  Project - Nganter App
                </span>
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Project</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400"><ClockIcon /></span>
                  <span>1 hr ago</span>
                </div>
              </div>
            </div>
          </DropdownItem>
        </li>

        <li>
          <DropdownItem className="flex gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="relative flex-shrink-0">
              <img
                width={40}
                height={40}
                src="/images/user/user-02.jpg"
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success-500 dark:border-gray-800"></span>
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  Terry Franci
                </span>{" "}
                requests permission to change{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  Project - Nganter App
                </span>
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Project</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400"><ClockIcon /></span>
                  <span>5 min ago</span>
                </div>
              </div>
            </div>
          </DropdownItem>
        </li>
      </ul>

    </div>
  );
}