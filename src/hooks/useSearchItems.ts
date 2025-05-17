
import { useState, useEffect } from 'react';
import { Item } from '@/components/ItemCard';
import { useToast } from '@/components/ui/use-toast';

// Sample data for demonstration
const sampleItems: Item[] = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    type: 'lost',
    category: 'electronics',
    location: 'Central Park, Near Fountain',
    date: '2023-05-06',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    description: 'Lost my iPhone 13 Pro with a blue case. Last seen near the central fountain.'
  },
  {
    id: '2',
    name: 'Golden Retriever Dog',
    type: 'lost',
    category: 'pets',
    location: 'Downtown, Main Street',
    date: '2023-05-05',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    description: 'Lost my golden retriever named Max. He has a red collar with contact information.'
  },
  {
    id: '3',
    name: 'Car Keys with Red Keychain',
    type: 'found',
    category: 'keys',
    location: 'Shopping Mall, Food Court',
    date: '2023-05-04',
    description: 'Found car keys with a distinctive red keychain and several keys attached.'
  },
  {
    id: '4',
    name: 'Black Wallet',
    type: 'found',
    category: 'accessories',
    location: 'Bus Station, Platform 3',
    date: '2023-05-03',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    description: 'Found a black leather wallet with credit cards and ID. No cash inside.'
  },
  {
    id: '5',
    name: 'Prescription Glasses',
    type: 'lost',
    category: 'accessories',
    location: 'Library, Second Floor',
    date: '2023-05-02',
    description: 'Lost my prescription glasses with tortoise shell frames. I need them to see!'
  },
  {
    id: '6',
    name: 'MacBook Pro Laptop',
    type: 'lost',
    category: 'electronics',
    location: 'Coffee Shop on 5th Avenue',
    date: '2023-05-01',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    description: 'Left my MacBook Pro (13-inch, 2019) at a coffee shop. It has stickers on the cover.'
  }
];

interface FilterValues {
  type: string;
  category: string;
  date: Date | undefined;
  location: string;
}

export const useSearchItems = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent');
  
  // Filter states
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [locationQuery, setLocationQuery] = useState('');

  // Types and categories for dropdowns
  const itemTypes = ['all', 'lost', 'found'];
  const itemCategories = ['all', 'electronics', 'pets', 'keys', 'accessories', 'documents', 'clothing', 'jewelry', 'other'];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFiltersAndSearch(query, selectedType, selectedCategory, locationQuery);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    applyFiltersAndSearch(searchQuery, type, selectedCategory, locationQuery);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFiltersAndSearch(searchQuery, selectedType, category, locationQuery);
  };
  
  const handleLocationChange = (location: string) => {
    setLocationQuery(location);
    applyFiltersAndSearch(searchQuery, selectedType, selectedCategory, location);
  };

  const handleAdvancedFilters = (filters: FilterValues) => {
    // Handle the advanced filters
    applyFiltersAndSearch(
      searchQuery, 
      filters.type !== 'all' ? filters.type : selectedType, 
      filters.category !== 'all' ? filters.category : selectedCategory, 
      filters.location || locationQuery
    );
  };

  const applyFiltersAndSearch = (query: string, type: string, category: string, location: string) => {
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      let results = sampleItems;
      
      // Filter by search query
      if (query.trim()) {
        results = results.filter(item => 
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Filter by item type
      if (type !== 'all') {
        results = results.filter(item => item.type === type);
      }
      
      // Filter by category
      if (category !== 'all') {
        results = results.filter(item => item.category === category);
      }
      
      // Filter by location
      if (location.trim()) {
        results = results.filter(item => 
          item.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      // Apply sorting
      if (sortOrder === 'recent') {
        results = [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else if (sortOrder === 'oldest') {
        results = [...results].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } else if (sortOrder === 'az') {
        results = [...results].sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOrder === 'za') {
        results = [...results].sort((a, b) => b.name.localeCompare(a.name));
      }
      
      setItems(results);
      setNoResults(results.length === 0);
      setLoading(false);
      
      // Show toast with results count
      toast({
        title: `Search Results: ${results.length}`,
        description: `Found ${results.length} items matching your criteria`,
      });
    }, 800);
  };
  
  const handleSortChange = (value: string) => {
    setSortOrder(value);
    
    let sortedItems = [...items];
    if (value === 'recent') {
      sortedItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (value === 'oldest') {
      sortedItems.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (value === 'az') {
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === 'za') {
      sortedItems.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setItems(sortedItems);
  };

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedCategory('all');
    setLocationQuery('');
    setSearchQuery('');
    applyFiltersAndSearch('', 'all', 'all', '');
  };

  return {
    items,
    loading,
    noResults,
    searchQuery,
    selectedType,
    selectedCategory,
    locationQuery,
    sortOrder,
    itemTypes,
    itemCategories,
    handleSearch,
    handleTypeChange,
    handleCategoryChange,
    handleLocationChange,
    handleAdvancedFilters,
    handleSortChange,
    clearFilters
  };
};
