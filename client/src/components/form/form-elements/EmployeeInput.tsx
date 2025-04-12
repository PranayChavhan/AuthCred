/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import { useState, useEffect } from 'react';
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { EnvelopeIcon } from "../../../icons";
import axios from 'axios';

export default function EmployeeInput() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [storedInfo, setStoredInfo] = useState<{name: string, email: string}>(() => {
    const savedInfo = localStorage.getItem('resumeInfo');
    return savedInfo ? JSON.parse(savedInfo) : { name: '', email: '' };
  });

  useEffect(() => {
    const handleResumeInfoUpdate = (event: CustomEvent) => {
      setStoredInfo(event.detail);
    };
    window.addEventListener('resumeInfoUpdated', handleResumeInfoUpdate as EventListener);
    return () => {
      window.removeEventListener('resumeInfoUpdated', handleResumeInfoUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      if (key === 'resumeInfo') {
        const event = new CustomEvent('resumeInfoUpdated', { 
          detail: JSON.parse(value) 
        });
        window.dispatchEvent(event);
      }
      originalSetItem.apply(this, arguments as any);
    };

    return () => {
      localStorage.setItem = originalSetItem;
    };
  }, []);


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.post(`${API_BASE_URL}/employees/upload`,{ 
          firstName: storedInfo.name, 
          email: storedInfo.email 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      if (response.data) {
        localStorage.removeItem('resumeInfo');
        setStoredInfo({ name: '', email: '' });
        setShowSuccessPopup(true);
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload employee data');
    }
  };
  
  // const handleSendEmail = async (email: string) => {
  //   try {
  //     await axios.post("http://localhost:5000/send-email", { email });
  //     alert(`Email sent successfully to ${email}`);
  //   } catch (error) {
  //     alert("Failed to send email. Please try again.");
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <ComponentCard title="Employee Details">
        <div className="space-y-6">
          <div>
            <Label>Employee Name</Label>
            <Input
              type="text"
              value={storedInfo.name || ''}
              className="bg-gray-100 dark:bg-gray-800"
            />
          </div>
          <div>
            <Label>Email</Label>
            <div className="relative">
              <Input
                type="email"
                value={storedInfo.email || ''}
                className="pl-[62px] bg-gray-100 dark:bg-gray-800"
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <EnvelopeIcon className="size-6" />
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={handleSubmit} className="bg-brand-500 text-white px-6 py-2 rounded-lg my-6">
              Get Started
            </button>
          </div>
        </div>
      </ComponentCard>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl transform transition-all">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Success!</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                Employee data has been uploaded successfully.
              </p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}