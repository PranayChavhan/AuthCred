/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import { useState, useEffect } from 'react';
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { EnvelopeIcon } from "../../../icons";

export default function EmployeeInput() {
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


  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...storedInfo, [name]: value };
    
    // Update local state
    setStoredInfo(updatedData);
    
    // Update localStorage
    localStorage.setItem('resumeInfo', JSON.stringify(updatedData));
  };


  return (
    <ComponentCard title="Employee Details">
      <div className="space-y-6">
        <div>
          <Label>Employee Name</Label>
          <Input
            type="text"
            value={storedInfo.name || ''}
            onChange={handleInputChange}
            className="bg-gray-100 dark:bg-gray-800"
          />
        </div>
        <div>
          <Label>Email</Label>
          <div className="relative">
            <Input
              type="email"
              value={storedInfo.email || ''}
              onChange={handleInputChange}
              className="pl-[62px] bg-gray-100 dark:bg-gray-800"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6" />
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-brand-500 text-white px-6 py-2 rounded-lg my-6">
            Get Started
          </button>
        </div>
      </div>
    </ComponentCard>
  );
}