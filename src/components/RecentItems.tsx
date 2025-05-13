
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
    // Updated sample data with more accurate descriptions matching the images
    const sampleItems: Item[] = [
      {
        id: '1',
        name: 'MacBook Pro with Stickers',
        type: 'lost',
        category: 'electronics',
        location: 'University Library, Room 202',
        date: '2023-05-06',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
        description: 'Lost my MacBook Pro with programming stickers on the cover. Last seen in the library study area.'
      },
      {
        id: '2',
        name: 'Golden Retriever - Max',
        type: 'lost',
        category: 'pets',
        location: 'Central Park, Near Playground',
        date: '2023-05-05',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
        description: 'My golden retriever Max went missing during our afternoon walk. He has a red collar with contact information.'
      },
      {
        id: '3',
        name: 'Black Leather Wallet',
        type: 'found',
        category: 'accessories',
        location: 'Coffee Shop, Main Street',
        date: '2023-05-04',
        image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
        description: 'Found a black leather wallet containing ID cards and credit cards. No cash inside.'
      },
      {
        id: '4',
        name: 'Modern Smartphone',
        type: 'found',
        category: 'electronics',
        location: 'Bus Station, Platform 3',
        date: '2023-05-03',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        description: 'Found a smartphone in a blue protective case at the bus station. Screen is intact, phone is locked.'
      },
      {
        id: '5',
        name: 'Designer Eyeglasses',
        type: 'lost',
        category: 'accessories',
        location: 'Shopping Mall, Food Court',
        date: '2023-05-02',
        description: 'Lost my prescription glasses with tortoise shell frames. I need them to see!'
      },
      {
        id: '6',
        name: 'Professional Camera Equipment',
        type: 'lost',
        category: 'electronics',
        location: 'City Park, Near Fountain',
        date: '2023-05-01',
        description: 'Left my expensive camera gear on a park bench. Black camera bag with Canon DSLR and several lenses.'
      },
      {
        id: '7',
        name: 'Family Heirloom Ring',
        type: 'lost',
        category: 'jewelry',
        location: 'Beach, Near Lifeguard Station',
        date: '2023-04-30',
        description: 'Lost my grandmother\'s engagement ring while swimming. It has huge sentimental value.'
      },
      {
        id: '8',
        name: 'Blue Backpack with Textbooks',
        type: 'found',
        category: 'bags',
        location: 'Train Station, Platform 2',
        date: '2023-04-29',
        description: 'Found a blue North Face backpack containing college textbooks and a water bottle.'
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
