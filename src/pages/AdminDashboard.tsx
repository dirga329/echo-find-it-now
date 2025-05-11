
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { 
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, PieChart, ShieldCheck, Users } from 'lucide-react';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminDashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  // This is a simple admin check - you may want to implement a more robust role-based system
  const isAdmin = profile?.email?.includes('admin');
  
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    
    if (!isAdmin) {
      toast.error('You do not have permission to access this page');
      navigate('/', { replace: true });
    }
  }, [user, isAdmin, navigate]);
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="bg-gray-50">
          <AdminHeader />
          <div className="container py-6">
            <AdminOverview />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

const AdminSidebar = () => {
  return (
    <Sidebar variant="inset" className="border-r">
      <SidebarHeader>
        <div className="flex items-center p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-echo-blue rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-semibold">ECHO Admin</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <a href="/admin">
                  <LayoutDashboard />
                  <span>Overview</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/admin/users">
                  <Users />
                  <span>Users</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/admin/items">
                  <PieChart />
                  <span>Items</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/admin/permissions">
                  <ShieldCheck />
                  <span>Permissions</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-gray-500">
          Admin Dashboard v1.0
        </div>
      </SidebarFooter>
      <SidebarTrigger className="absolute top-3 right-4" />
    </Sidebar>
  );
};

export default AdminDashboard;
