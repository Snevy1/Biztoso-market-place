
import React, { useState } from "react";
import { Pencil } from "lucide-react";

const ImageInput = ({ label, imageUrl, onImageChange, className = "col-span-full" }) => {
  const [isUploading, setIsUploading] = useState(false);

  const simulateImageUpload = async (file) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    return URL.createObjectURL(file); 
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const uploadedUrl = await simulateImageUpload(file);
        onImageChange(uploadedUrl); 
        console.log("Image URL set to:", uploadedUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label htmlFor="logo-image" className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => onImageChange("")} 
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <img src={imageUrl} alt="Item image" className="w-full h-64 object-cover" />
      ) : (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {isUploading && <p className="mt-2 text-sm text-gray-500">Uploading...</p>}
        </div>
      )}
    </div>
  );
};

export default ImageInput;
