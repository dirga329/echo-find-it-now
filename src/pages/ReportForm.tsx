
import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ArrowLeft, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  type: z.enum(['lost', 'found'], {
    required_error: "Please select if the item was lost or found",
  }),
  name: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string().optional(),
  location: z.string().min(5, {
    message: "Location must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  contactName: z.string().min(2, {
    message: "Your name must be at least 2 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().optional(),
});

const ReportForm = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Get the type from URL params or default to 'lost'
  const typeFromParams = searchParams.get('type');
  const initialType = typeFromParams === 'lost' || typeFromParams === 'found'
    ? typeFromParams
    : 'lost';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: initialType as 'lost' | 'found',
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

  // Pre-fill contact info if user is logged in
  useEffect(() => {
    if (user) {
      const email = user.email;
      if (email) {
        form.setValue('contactEmail', email);
      }
    }
  }, [user, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-echo-gray">
        <div className="echo-container py-8">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-echo-blue hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Link>
          </div>
          
          <Card className="max-w-3xl mx-auto shadow-md">
            <CardHeader className="bg-white rounded-t-lg">
              <CardTitle className="text-2xl">
                Report {form.watch('type') === 'lost' ? 'a Lost' : 'a Found'} Item
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>What are you reporting?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="lost" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                I lost an item
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="found" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                I found an item
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Item Details</h3>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Item Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. iPhone 13 Pro, Black Wallet" {...field} />
                          </FormControl>
                          <FormDescription>
                            Provide a clear, descriptive name for the item.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="electronics">Electronics</SelectItem>
                              <SelectItem value="keys">Keys</SelectItem>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="jewelry">Jewelry</SelectItem>
                              <SelectItem value="pets">Pets</SelectItem>
                              <SelectItem value="documents">Documents</SelectItem>
                              <SelectItem value="bags">Bags</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date*</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className="w-full pl-3 text-left font-normal"
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Approximate Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location*</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. Central Park, Near Fountain" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Be as specific as possible about where the item was lost or found.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description*</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide detailed description including color, size, brand, distinguishing features, etc." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            The more details you provide, the easier it will be to match items.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
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
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Your Contact Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name*</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address*</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="border-t pt-4 flex justify-end space-x-4">
                    <Button type="button" variant="outline" asChild>
                      <Link to="/">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Report'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportForm;
