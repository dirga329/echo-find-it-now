
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';

const AdminHeader = () => {
  const { UserAvatar, displayName } = useAuth();
  
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">{displayName}</div>
            <UserAvatar className="h-8 w-8" />
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">Exit Admin</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
