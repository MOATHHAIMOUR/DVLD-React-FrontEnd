import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Button from "./Button";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
  onRemoveImage?: () => void;
  value?: string | null; // Integrate with react-hook-form
  onChange?: (file: File | null) => void; // Integrate with react-hook-form
  isReadOnly: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  onRemoveImage,
  value,
  onChange,
  isReadOnly,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    value || null
  );

  useEffect(() => {
    if (value) setSelectedImage(value);
  }, [value]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedImage(fileUrl);
      onChange?.(file); // react-hook-form handler
      onFileSelect?.(file); // Parent handler
    }
  };

  const handleRemoveImage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setSelectedImage(null);
    onChange?.(null); // react-hook-form handler
    onFileSelect?.(null); // Parent handler
    onRemoveImage?.();
  };

  return (
    <div className="flex items-center justify-center w-full">
      {selectedImage ? (
        <div className="relative h-64 w-full border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:bg-gray-700">
          <img
            src={selectedImage}
            alt="Selected"
            className="object-cover h-full w-full rounded-lg"
          />

          {!isReadOnly && (
            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <Button
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
                onClick={handleRemoveImage}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FiUpload size={20} className="text-gray-400 mb-2" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      )}
    </div>
  );
};

export default FileUploader;
