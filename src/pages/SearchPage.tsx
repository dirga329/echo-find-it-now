
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import ItemCard, { Item } from '@/components/ItemCard';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SearchPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

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
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      if (!query.trim()) {
        setItems([]);
        setNoResults(false);
        setLoading(false);
        return;
      }
      
      // Filter items based on search query (case-insensitive)
      const results = sampleItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setItems(results);
      setNoResults(results.length === 0);
      setLoading(false);
      
      toast({
        title: `Search Results: ${results.length}`,
        description: `Found ${results.length} items matching "${query}"`,
      });
    }, 800);
  };
  
  const handleFilter = (filters: any) => {
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Apply filters to sample data
      let results = sampleItems;
      
      if (filters.type !== 'all') {
        results = results.filter(item => item.type === filters.type);
      }
      
      if (filters.category !== 'all') {
        results = results.filter(item => item.category === filters.category);
      }
      
      if (filters.location !== 'all') {
        results = results.filter(item => item.location.toLowerCase().includes(filters.location.toLowerCase()));
      }
      
      if (filters.date) {
        const filterDate = new Date(filters.date).toISOString().split('T')[0];
        results = results.filter(item => item.date === filterDate);
      }
      
      // If search query exists, also filter by that
      if (searchQuery.trim()) {
        results = results.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setItems(results);
      setNoResults(results.length === 0);
      setLoading(false);
      
      toast({
        title: `Filter Results: ${results.length}`,
        description: `Found ${results.length} items with the selected filters`,
      });
    }, 800);
  };

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
            <div className="lg:col-span-1">
              <FilterPanel onFilter={handleFilter} />
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
                  <Button onClick={() => handleFilter({ type: 'all', category: 'all', date: undefined, location: 'all' })}>
                    Clear Filters
                  </Button>
                </div>
              ) : items.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-600">Showing {items.length} results</p>
                    <Select
                      value="recent"
                      onValueChange={() => {}}
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

// Importing for the sorting dropdown
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default SearchPage;
