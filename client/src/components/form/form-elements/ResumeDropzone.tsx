import { useState, useCallback } from 'react';

const ResumeDropzone = ({ onFileUrlChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: { preventDefault: () => void; stopPropagation: () => void; }) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: { preventDefault: () => void; stopPropagation: () => void; }) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: { preventDefault: () => void; stopPropagation: () => void; }) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: { preventDefault: () => void; stopPropagation: () => void; dataTransfer: { files: string | any[]; }; }) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        const fileUrl = URL.createObjectURL(file);
        onFileUrlChange(fileUrl);
      }
    }
  }, [onFileUrlChange]);

  const handleFileChange = useCallback((e: { target: { files: string | any[]; }; }) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        const fileUrl = URL.createObjectURL(file);
        onFileUrlChange(fileUrl);
      }
    }
  }, [onFileUrlChange]);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        id="fileInput"
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <svg
          className="w-10 h-10 text-gray-400 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3-3m0 0l3 3m-3-3v12"
          ></path>
        </svg>
        <p className="text-sm text-gray-600">
          Drag & drop your resume PDF here or <span className="text-blue-500">browse</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Only PDF files are supported
        </p>
      </label>
    </div>
  );
};

export default ResumeDropzone;