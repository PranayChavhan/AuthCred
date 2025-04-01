import { useState } from "react";
import { useNavigate } from "react-router";

export default function MonthlyTarget() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleRedirect = () => {
    navigate("/verification");
  };
  
  return (
    <div className="rounded-2xl border  bg-white  overflow-hidden">
      <div 
        className="p-6 sm:p-8 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
        onClick={handleRedirect}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 relative">
            <div className="absolute -inset-1 bg-indigo-600 rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-full shadow-xl">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            Start Verification Process
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-sm">
            Upload your resume to begin the verification process and unlock your full potential
          </p>
          
          <div className={`transition-all duration-300 ease-in-out transform ${isHovered ? "scale-105" : ""}`}>
            <button
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2 group transition-all duration-300"
            >
              Upload Resume
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 py-4 px-6 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Quick and secure verification process
          </p>
        </div>
      </div>
    </div>
  );
}