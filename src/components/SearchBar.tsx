
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
}

const SearchBar = ({ onSearch, onSuggestionClick }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Generate suggestions based on the query
  useEffect(() => {
    if (query.trim().length > 0) {
      // This is a simple implementation - in a real app, you might fetch suggestions from an API
      const demoSuggestions = [
        `${query} in electronics`,
        `lost ${query}`,
        `found ${query}`,
        `${query} near downtown`,
      ];
      setSuggestions(demoSuggestions);
      setOpen(true);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setOpen(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl">
      <div className="relative w-full">
        <Popover open={open && suggestions.length > 0} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-8 pr-10 rounded-r-none"
                type="text"
                placeholder="Search for lost or found items..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
            <Command>
              <CommandList>
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {suggestions.map((suggestion, index) => (
                    <CommandItem 
                      key={index}
                      onSelect={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit" className="rounded-l-none">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
