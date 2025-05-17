import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import ItemCard, { Item } from '@/components/ItemCard';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SearchPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent');
  
  // New state variables for autocomplete filters
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [locationQuery, setLocationQuery] = useState('');

  // Types and categories for autocomplete
  const itemTypes = ['all', 'lost', 'found'];
  const itemCategories = ['all', 'electronics', 'pets', 'keys', 'accessories', 'documents', 'clothing', 'jewelry', 'other'];

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

  // Initial load - can be empty or show all items
  useEffect(() => {
    // Optional: Load all items initially
    // applyFiltersAndSearch('', 'all', 'all', '');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-echo-gray">
        <div className="echo-container py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Search Lost & Found Items</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Use our powerful search to find lost items or check if someone has found what you're looking for.
            </p>
            <div className="mt-6 flex justify-center">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
                        onClick={() => handleTypeChange(type)}
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
                        onClick={() => handleCategoryChange(category)}
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
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="w-full"
                />
              </div>
              
              {/* Keep the original FilterPanel for advanced filters */}
              <FilterPanel onFilter={applyFiltersAndSearch} />
            </div>
            
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-echo-blue mx-auto"></div>
                    <p className="mt-4 text-gray-600">Searching...</p>
                  </div>
                </div>
              ) : noResults ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Search className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No Results Found</h3>
                  <p className="text-gray-500 text-center mb-4">
                    We couldn't find any items matching your search or filters.
                  </p>
                  <Button onClick={() => {
                    setSelectedType('all');
                    setSelectedCategory('all');
                    setLocationQuery('');
                    setSearchQuery('');
                    applyFiltersAndSearch('', 'all', 'all', '');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : items.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-600">Showing {items.length} results</p>
                    <Select
                      value={sortOrder}
                      onValueChange={handleSortChange}
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
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <Search className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Start Your Search</h3>
                  <p className="text-gray-500 text-center">
                    Enter keywords or apply filters to find lost or found items.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
