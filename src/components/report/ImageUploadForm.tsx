
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FormDescription, FormLabel } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { Loader2, Image } from 'lucide-react';

interface ImageUploadFormProps {
  onImageChange: (file: File | null) => void;
  imagePreview: string | null;
  uploadProgress?: number;
  isUploading?: boolean;
}

const ImageUploadForm = ({ 
  onImageChange, 
  imagePreview, 
  uploadProgress = 0, 
  isUploading = false 
}: ImageUploadFormProps) => {
  const [dragOver, setDragOver] = useState(false);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
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
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2">
          <div 
            className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
              dragOver ? 'border-primary bg-primary/5' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
              disabled={isUploading}
            />
            <FormDescription className="mt-1 text-center">
              Upload a clear photo or drag and drop here<br />
              (Max: 5MB)
            </FormDescription>
          </div>

          {isUploading && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Uploading...</span>
                <span className="text-sm font-medium">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center">
          {imagePreview ? (
            <div className="relative overflow-hidden rounded-md border border-gray-200">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-40 h-40 object-cover" 
              />
            </div>
          ) : isUploading ? (
            <div className="flex items-center justify-center w-40 h-40 bg-gray-100 rounded-md">
              <Loader2 className="h-10 w-10 text-gray-400 animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-40 h-40 bg-gray-100 rounded-md">
              <Image className="h-10 w-10 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Image preview</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadForm;
