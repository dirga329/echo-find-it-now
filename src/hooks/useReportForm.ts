
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { formSchema } from '@/components/report/ItemDetailsForm';

type FormValues = z.infer<typeof formSchema>;

export const useReportForm = (initialType: 'lost' | 'found') => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: initialType,
      name: "",
      category: "",
      time: "",
      location: "",
      description: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      let imageUrl = null;
      
      // Upload image if available
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `${uuidv4()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('item-images')
          .upload(filePath, imageFile);
          
        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }
        
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('item-images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrlData.publicUrl;
      }
      
      // Insert item into database
      const { error } = await supabase
        .from('items')
        .insert({
          type: data.type,
          name: data.name,
          category: data.category,
          date: format(data.date, 'yyyy-MM-dd'),
          time: data.time || null,
          location: data.location,
          description: data.description,
          image_url: imageUrl,
          user_id: user?.id || null,
          contact_name: data.contactName,
          contact_email: data.contactEmail,
          contact_phone: data.contactPhone || null,
        });
        
      if (error) {
        throw new Error(`Error submitting report: ${error.message}`);
      }
      
      toast({
        title: "Report Submitted Successfully!",
        description: "Thank you for your report. We've logged the details and will notify you of any matches.",
      });
      
      // Reset form
      form.reset();
      setImageFile(null);
      setImagePreview(null);
      
      // Redirect to homepage after successful submission
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error Submitting Report",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    imagePreview,
    handleImageChange,
    onSubmit
  };
};

// Import this separately to avoid circular dependency
import { format } from 'date-fns';
