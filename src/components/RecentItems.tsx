
import { useState, useEffect } from 'react';
import { Item } from './ItemCard';
import ItemCard from './ItemCard';

interface RecentItemsProps {
  title: string;
  type?: 'lost' | 'found' | 'all';
  limit?: number;
}

const RecentItems = ({ title, type = 'all', limit = 8 }: RecentItemsProps) => {
  const [items, setItems] = useState<Item[]>([]);
  
  // In a real application, this would be an API call
  useEffect(() => {
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
      },
      {
        id: '7',
        name: 'Diamond Engagement Ring',
        type: 'lost',
        category: 'jewelry',
        location: 'Beach, Near Lifeguard Station',
        date: '2023-04-30',
        description: 'Lost my diamond engagement ring while swimming. It has huge sentimental value.'
      },
      {
        id: '8',
        name: 'Blue Backpack',
        type: 'found',
        category: 'bags',
        location: 'Train Station, Platform 2',
        date: '2023-04-29',
        description: 'Found a blue North Face backpack containing books and a water bottle.'
      }
    ];
    
    // Filter by type if specified
    let filteredItems = sampleItems;
    if (type !== 'all') {
      filteredItems = sampleItems.filter(item => item.type === type);
    }
    
    // Limit the number of items
    setItems(filteredItems.slice(0, limit));
  }, [type, limit]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RecentItems;
