import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import FilterPanel from '@/components/FilterPanel';

interface QuickFiltersProps {
  selectedType: string;
  selectedCategory: string;
  locationQuery: string;
  itemTypes: string[];
  itemCategories: string[];
  onTypeChange: (type: string) => void;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  onApplyAdvancedFilters: (filters: any) => void;
}

const QuickFilters = ({
  selectedType,
  selectedCategory,
  locationQuery,
  itemTypes,
  itemCategories,
  onTypeChange,
  onCategoryChange,
  onLocationChange,
  onApplyAdvancedFilters
}: QuickFiltersProps) => {
  return (
    <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow">
      <h2 className="font-semibold text-lg mb-4">Quick Filters</h2>
      
      {/* Type Filter with Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Item Type</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedType === 'all' ? 'All Types' : selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {itemTypes.map((type) => (
              <DropdownMenuItem 
                key={type}
                onClick={() => onTypeChange(type)}
              >
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Category Filter with Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Category</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedCategory === 'all' ? 'All Categories' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {itemCategories.map((category) => (
              <DropdownMenuItem 
                key={category}
                onClick={() => onCategoryChange(category)}
              >
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Location Filter with Text Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Location</label>
        <Input
          type="text"
          placeholder="Enter location..."
          value={locationQuery}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full"
        />
      </div>
      
      {/* Keep the original FilterPanel for advanced filters */}
      <FilterPanel onFilter={onApplyAdvancedFilters} />
    </div>
  );
};

export default QuickFilters;
