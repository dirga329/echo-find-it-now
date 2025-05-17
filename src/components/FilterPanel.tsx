
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export interface FilterValues {
  type: string;
  category: string;
  date: Date | undefined;
  location: string;
}

interface FilterPanelProps {
  onFilter: (filters: FilterValues) => void;
}

const FilterPanel = ({ onFilter }: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    type: 'all',
    category: 'all',
    date: undefined,
    location: 'all',
  });

  const handleFilterChange = (key: keyof FilterValues, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      type: 'all',
      category: 'all',
      date: undefined,
      location: 'all',
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-4">Filter Options</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Type
            </label>
            <Select
              value={filters.type}
              onValueChange={(value) => handleFilterChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="found">Found</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="keys">Keys</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
                <SelectItem value="pets">Pets</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.date ? format(filters.date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.date}
                  onSelect={(date) => handleFilterChange('date', date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="locations">
              <AccordionTrigger className="text-sm font-medium text-gray-700">
                Location
              </AccordionTrigger>
              <AccordionContent>
                <Select
                  value={filters.location}
                  onValueChange={(value) => handleFilterChange('location', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="north">North District</SelectItem>
                    <SelectItem value="east">East District</SelectItem>
                    <SelectItem value="south">South District</SelectItem>
                    <SelectItem value="west">West District</SelectItem>
                    <SelectItem value="central">Central Park</SelectItem>
                    <SelectItem value="shopping">Shopping Mall</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex flex-col space-y-2 pt-2">
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleResetFilters}>
              Reset All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
