
import { useState, useEffect } from 'react';
import { Item } from './ItemCard';
import ItemCard from './ItemCard';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from './ui/skeleton';

interface RecentItemsProps {
  title: string;
  type?: 'lost' | 'found' | 'all';
  limit?: number;
}

const RecentItems = ({ title, type = 'all', limit = 8 }: RecentItemsProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch data from Supabase
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      
      let query = supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      // Filter by type if specified
      if (type !== 'all') {
        query = query.eq('type', type);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching items:', error);
      } else if (data) {
        // Transform the data to match our Item interface
        const formattedItems: Item[] = data.map(item => ({
          id: item.id,
          name: item.name,
          type: item.type as 'lost' | 'found',
          category: item.category,
          location: item.location,
          date: item.date,
          image: item.image_url,
          description: item.description
        }));
        
        setItems(formattedItems);
      }
      
      setLoading(false);
    };
    
    fetchItems();
    
    // Set up real-time subscription for updates
    const channel = supabase
      .channel('public:items')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'items',
      }, (payload) => {
        // When a new item is added, refetch the items
        fetchItems();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [type, limit]);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-md" />
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <p className="text-gray-500 italic text-center">No {type} items reported yet.</p>
      </div>
    );
  }

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
