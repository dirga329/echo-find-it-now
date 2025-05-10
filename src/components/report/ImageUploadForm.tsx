
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FormDescription, FormLabel } from '@/components/ui/form';

interface ImageUploadFormProps {
  onImageChange: (file: File | null) => void;
  imagePreview: string | null;
}

const ImageUploadForm = ({ onImageChange, imagePreview }: ImageUploadFormProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File too large. Maximum size is 5MB.");
        return;
      }
      
      onImageChange(file);
    }
  };

  return (
    <div>
      <FormLabel className="block mb-2">Item Photo</FormLabel>
      <div className="flex items-center space-x-4">
        <div className="w-1/2">
          <Input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
          />
          <FormDescription className="mt-1">
            Upload a clear photo of the item (Max: 5MB)
          </FormDescription>
        </div>
        <div className="w-1/2">
          {imagePreview ? (
            <div className="aspect-square w-32 rounded-md overflow-hidden bg-gray-100">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
            </div>
          ) : (
            <div className="aspect-square w-32 rounded-md bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadForm;
