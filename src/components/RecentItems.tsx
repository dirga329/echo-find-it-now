
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
    // Updated sample data with names matching the images
    const sampleItems: Item[] = [
      {
        id: '1',
        name: 'White DJI Drone',
        type: 'lost',
        category: 'electronics',
        location: 'City Park, Near Lake',
        date: '2023-05-06',
        image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc',
        description: 'Lost my DJI drone while filming in the park. It was flying near the lake area when I lost control.'
      },
      {
        id: '2',
        name: 'Orange and White Tabby Cat',
        type: 'lost',
        category: 'pets',
        location: 'Residential Area, Oak Street',
        date: '2023-05-05',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
        description: 'My orange and white tabby cat went missing from our front yard. Very friendly and responds to "Whiskers".'
      },
      {
        id: '3',
        name: 'White Robot Toy',
        type: 'lost',
        category: 'toys',
        location: 'Community Center',
        date: '2023-05-04',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
        description: 'My son\'s favorite robot toy. It\'s white and about 8 inches tall. Last seen at the community center.'
      },
      {
        id: '4',
        name: 'Grey Tabby Kitten',
        type: 'found',
        category: 'pets',
        location: 'Near Elementary School',
        date: '2023-05-03',
        image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
        description: 'Found a small grey tabby kitten wandering near the elementary school. No collar, seems friendly and well-cared for.'
      },
      {
        id: '5',
        name: 'Brown Wild Deer',
        type: 'found',
        category: 'wildlife',
        location: 'Forest Edge, North Trail',
        date: '2023-05-02',
        image: 'https://images.unsplash.com/photo-1439886183900-e79ec0057170',
        description: 'Found two deer that seem to have wandered from the deeper forest. They\'re by the north trail entrance.'
      },
      {
        id: '6',
        name: 'Brown Horses',
        type: 'found',
        category: 'farm animals',
        location: 'Meadow Lane, Outside Fence',
        date: '2023-05-01',
        image: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2',
        description: 'Found four brown horses outside their enclosure on Meadow Lane. They appear to have escaped from a nearby farm.'
      },
      {
        id: '7',
        name: 'Designer Eyeglasses',
        type: 'lost',
        category: 'accessories',
        location: 'Shopping Mall, Food Court',
        date: '2023-04-30',
        description: 'Lost my prescription glasses with tortoise shell frames. I need them to see!'
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
