
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './ItemDetailsForm';

type FormValues = z.infer<typeof formSchema>;

interface ReportTypeFormProps {
  control: Control<FormValues>;
}

const ReportTypeForm = ({ control }: ReportTypeFormProps) => {
  return (
    <FormField
      control={control}
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
  );
};

export default ReportTypeForm;
