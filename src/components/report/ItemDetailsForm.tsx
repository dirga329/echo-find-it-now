
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  type: z.enum(['lost', 'found']),
  name: z.string().min(2),
  category: z.string(),
  date: z.date(),
  time: z.string().optional(),
  location: z.string().min(5),
  description: z.string().min(10),
  contactName: z.string().min(2),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ItemDetailsFormProps {
  control: Control<FormValues>;
}

const ItemDetailsForm = ({ control }: ItemDetailsFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Item Details</h3>
      
      <FormField
        control={control}
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
        control={control}
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
          control={control}
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
          control={control}
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
        control={control}
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
        control={control}
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
    </div>
  );
};

export { formSchema };
export default ItemDetailsForm;
