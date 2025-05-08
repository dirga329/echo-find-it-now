
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, Calendar } from 'lucide-react';

export interface Item {
  id: string;
  name: string;
  type: 'lost' | 'found';
  category: string;
  location: string;
  date: string;
  image?: string;
  description: string;
}

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Link to={`/items/${item.id}`}>
      <Card className="echo-card overflow-hidden h-full hover:border-echo-blue transition-colors">
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-echo-gray">
              <span className="text-echo-darkGray">No image available</span>
            </div>
          )}
          <Badge 
            className={item.type === 'lost' 
              ? 'absolute top-2 right-2 bg-red-500 hover:bg-red-600' 
              : 'absolute top-2 right-2 bg-green-500 hover:bg-green-600'
            }
          >
            {item.type === 'lost' ? 'Lost' : 'Found'}
          </Badge>
        </div>
        <CardContent className="pt-4">
          <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mt-1">{item.description}</p>
          <Badge variant="outline" className="mt-2">
            {item.category}
          </Badge>
        </CardContent>
        <CardFooter className="text-xs text-gray-500 flex flex-col items-start gap-1 pt-0">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{item.date}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ItemCard;
