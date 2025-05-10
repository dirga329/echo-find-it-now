
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import ReportedItems from '@/components/dashboard/ReportedItems';
import { useToast } from '@/hooks/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';

const DashboardPage = () => {
  const { user, displayName } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found'>('all');

  useEffect(() => {
    // Show welcome toast when dashboard loads
    toast({
      title: `Welcome, ${displayName}!`,
      description: "This is your dashboard where you can manage your reported items.",
    });
  }, [displayName, toast]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-echo-gray">
          <div className="echo-container py-8">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold">My Dashboard</h1>
              <Button asChild>
                <Link to="/report">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Report New Item
                </Link>
              </Button>
            </div>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  <span>My Reported Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue="all" 
                  value={activeTab}
                  onValueChange={(value) => setActiveTab(value as 'all' | 'lost' | 'found')}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
                    <TabsTrigger value="all">All Items</TabsTrigger>
                    <TabsTrigger value="lost">Lost Items</TabsTrigger>
                    <TabsTrigger value="found">Found Items</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <ReportedItems filter="all" />
                  </TabsContent>
                  <TabsContent value="lost">
                    <ReportedItems filter="lost" />
                  </TabsContent>
                  <TabsContent value="found">
                    <ReportedItems filter="found" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
