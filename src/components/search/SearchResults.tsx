
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ItemCard, { Item } from '@/components/ItemCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchResultsProps {
  items: Item[];
  loading: boolean;
  noResults: boolean;
  onClearFilters: () => void;
  sortOrder: string;
  onSortChange: (value: string) => void;
}

const SearchResults = ({
  items,
  loading,
  noResults,
  onClearFilters,
  sortOrder,
  onSortChange
}: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-echo-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching...</p>
        </div>
      </div>
    );
  }

  if (noResults) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Search className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">No Results Found</h3>
        <p className="text-gray-500 text-center mb-4">
          We couldn't find any items matching your search or filters.
        </p>
        <Button onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Search className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">Start Your Search</h3>
        <p className="text-gray-500 text-center">
          Enter keywords or apply filters to find lost or found items.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">Showing {items.length} results</p>
        <Select
          value={sortOrder}
          onValueChange={onSortChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="az">A-Z</SelectItem>
            <SelectItem value="za">Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default SearchResults;
