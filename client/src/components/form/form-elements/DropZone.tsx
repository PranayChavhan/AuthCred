/* eslint-disable @typescript-eslint/no-unused-vars */
import ComponentCard from "../../common/ComponentCard";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

const DropzoneComponent: React.FC = () => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [previewPdf, setPreviewPdf] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setPdfFiles(acceptedFiles);
    if (acceptedFiles.length > 0) {
      const previewUrl = URL.createObjectURL(acceptedFiles[0]);
      setPreviewPdf(previewUrl);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: true,
  });

  return (
    <ComponentCard title="PDF Dropzone">
      <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
        {previewPdf ? (
          <iframe
            src={previewPdf}
            className="w-full h-96 rounded-xl border border-gray-300 dark:border-gray-700"
            title="PDF Preview"
          ></iframe>
        ) : (
          <form
            {...getRootProps()}
            className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
              ${isDragActive ? "border-brand-500 bg-gray-100 dark:bg-gray-800" : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"}
            `}
          >
            <input {...getInputProps()} />
            <div className="dz-message flex flex-col items-center m-0!">
              <div className="mb-[22px] flex justify-center">
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg
                    className="fill-current"
                    width="29"
                    height="28"
                    viewBox="0 0 29 28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5 3.917c-.217 0-.412.092-.549.239l-5.38 5.376c-.293.293-.293.768 0 1.061.293.293.768.293 1.061 0l4.118-4.116V18.667c0 .415.336.75.75.75s.75-.335.75-.75V6.482l4.114 4.11c.293.293.768.293 1.061 0 .293-.293.293-.768 0-1.061l-5.342-5.338A.75.75 0 0014.5 3.917zM5.916 18.667c0-.414-.336-.75-.75-.75s-.75.336-.75.75v3.167c0 1.242 1.007 2.25 2.25 2.25h15.667c1.243 0 2.25-1.008 2.25-2.25v-3.167c0-.414-.336-.75-.75-.75s-.75.336-.75.75v3.167c0 .414-.336.75-.75.75H6.666a.75.75 0 01-.75-.75v-3.167z"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                {isDragActive ? "Drop PDFs Here" : "Drag & Drop PDF Files Here"}
              </h4>
              <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
                Drag and drop your PDF files here or browse
              </span>
              <span className="font-medium underline text-theme-sm text-brand-500">
                Browse File
              </span>
            </div>
          </form>
        )}
      </div>
    </ComponentCard>
  );
};

export default DropzoneComponent;