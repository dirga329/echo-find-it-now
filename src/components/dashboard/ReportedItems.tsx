
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Item } from '@/components/ItemCard';

interface ReportedItemsProps {
  filter: 'all' | 'lost' | 'found';
}

const ReportedItems = ({ filter }: ReportedItemsProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserItems = async () => {
      if (!user) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        let query = supabase
          .from('items')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (filter !== 'all') {
          query = query.eq('type', filter);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setItems(data as Item[]);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load your reported items. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserItems();
  }, [user, filter]);

  if (isLoading) {
    return (
      <div className="w-full py-8 flex justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-echo-blue animate-spin mb-2" />
          <span>Loading your items...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full py-4 px-6 bg-red-50 text-red-700 rounded-md">
        {error}
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-gray-500 mb-4">You haven't reported any {filter !== 'all' ? filter : ''} items yet.</p>
        <Button asChild>
          <Link to="/report">Report an Item</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                <Badge variant={item.type === 'lost' ? 'destructive' : 'default'}>
                  {item.type === 'lost' ? 'Lost' : 'Found'}
                </Badge>
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{format(new Date(item.date), 'MMM d, yyyy')}</TableCell>
              <TableCell className="max-w-[150px] truncate">{item.location}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/items/${item.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportedItems;
