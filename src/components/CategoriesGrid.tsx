
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '🔌',
    description: 'Phones, laptops, cameras and more'
  },
  {
    id: 'keys',
    name: 'Keys',
    icon: '🔑',
    description: 'House keys, car keys, office keys'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    icon: '👕',
    description: 'Jackets, hats, scarves, gloves'
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    icon: '💍',
    description: 'Rings, watches, necklaces, earrings'
  },
  {
    id: 'pets',
    name: 'Pets',
    icon: '🐾',
    description: 'Lost or found animals'
  },
  {
    id: 'documents',
    name: 'Documents',
    icon: '📄',
    description: 'IDs, passports, licenses'
  },
  {
    id: 'bags',
    name: 'Bags',
    icon: '👜',
    description: 'Backpacks, purses, luggage'
  },
  {
    id: 'other',
    name: 'Other',
    icon: '📦',
    description: 'Miscellaneous items'
  }
];

const CategoriesGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link to={`/search?category=${category.id}`} key={category.id}>
          <Card className="echo-card h-full hover:border-echo-blue transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-medium text-gray-800">{category.name}</h3>
              <p className="text-xs text-gray-500 mt-1 hidden sm:block">{category.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesGrid;
