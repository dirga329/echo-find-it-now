
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, User, Mail, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Item } from '@/components/ItemCard';
import { useToast } from '@/components/ui/use-toast';

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data from API
    setLoading(true);
    
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
        description: 'Lost my iPhone 13 Pro with a blue case. Last seen near the central fountain. The phone has important personal photos and contacts that I need for work. If found, please contact me as soon as possible. There will be a reward offered for its safe return.'
      },
      {
        id: '2',
        name: 'Golden Retriever Dog',
        type: 'lost',
        category: 'pets',
        location: 'Downtown, Main Street',
        date: '2023-05-05',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
        description: "Lost my golden retriever named Max. He has a red collar with contact information. He's very friendly but might be scared. Last seen near the park entrance. He's about 4 years old and responds to his name. Please call if spotted or found!"
      },
      {
        id: '3',
        name: 'Car Keys with Red Keychain',
        type: 'found',
        category: 'keys',
        location: 'Shopping Mall, Food Court',
        date: '2023-05-04',
        description: 'Found car keys with a distinctive red keychain and several keys attached. There appears to be a Toyota car key and several smaller keys, possibly for a home. Found in the food court area near the Italian restaurant.'
      }
    ];
    
    setTimeout(() => {
      const foundItem = sampleItems.find(item => item.id === id);
      setItem(foundItem || null);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleContact = () => {
    // In a real app, this would send a message to the reporter
    toast({
      title: "Contact Request Sent",
      description: "Your message has been sent to the reporter. They'll contact you soon!",
    });
  };

  const handleClaim = () => {
    // In a real app, this would start the claim process
    toast({
      title: "Claim Initiated",
      description: "We've recorded your claim. Please answer the verification questions sent to your email.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-echo-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading item details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-echo-gray flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
            <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-echo-gray">
        <div className="echo-container py-8">
          <div className="mb-6">
            <Link to="/search" className="inline-flex items-center text-echo-blue hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Search Results
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="md:flex">
                  <div className="md:w-1/2 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h1 className="text-2xl font-bold">{item.name}</h1>
                      <Badge 
                        className={item.type === 'lost' 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-green-500 hover:bg-green-600'
                        }
                      >
                        {item.type === 'lost' ? 'Lost' : 'Found'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{item.date}</span>
                      </div>
                      <div>
                        <Badge variant="outline" className="mr-2">{item.category}</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    
                    <div className="mt-8 space-y-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            {item.type === 'lost' ? "I Found This Item" : "This is My Item"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {item.type === 'lost' ? "You found this item?" : "Is this your item?"}
                            </DialogTitle>
                            <DialogDescription>
                              To proceed, you'll need to provide some verification details to confirm
                              {item.type === 'lost' ? " you've found this item." : " this is your item."}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-sm text-gray-500 mb-4">
                              {item.type === 'lost' 
                                ? "Please contact the owner or create a found report." 
                                : "Please answer some verification questions to claim this item."}
                            </p>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => handleContact()}>Contact Reporter</Button>
                            <Button onClick={() => handleClaim()}>
                              {item.type === 'lost' ? "I Found This" : "Claim Item"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="outline" className="w-full" onClick={() => handleContact()}>
                        Contact Reporter
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full min-h-[300px] bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
              
              <Card className="bg-white rounded-lg overflow-hidden shadow-md mt-6">
                <div className="p-6">
                  <Tabs defaultValue="details">
                    <TabsList className="mb-4">
                      <TabsTrigger value="details">Additional Details</TabsTrigger>
                      <TabsTrigger value="reporter">Reporter Info</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Time of {item.type === 'lost' ? 'Loss' : 'Discovery'}</h4>
                          <p className="text-gray-600">Around 3:00 PM</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Specific Location</h4>
                          <p className="text-gray-600">{item.location}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Identifying Features</h4>
                          <p className="text-gray-600">
                            {item.type === 'lost' 
                              ? "Has distinctive scratches on the back and a blue protective case." 
                              : "Has a distinctive keychain and several keys attached."}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="reporter">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span>John Doe</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <span>Contact via ECHO messaging system</span>
                        </div>
                        <div className="mt-4">
                          <Button onClick={() => handleContact()}>
                            Contact Reporter
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Card className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-semibold text-lg mb-4">Safety Tips</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Meet in public, well-lit places</li>
                  <li>• Bring a friend when meeting someone</li>
                  <li>• Verify item ownership before returning</li>
                  <li>• Report suspicious behavior</li>
                  <li>• Use our messaging system for initial contact</li>
                </ul>
              </Card>
              
              <Card className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Similar Items</h3>
                <div className="space-y-4">
                  <Link to="/items/6" className="block hover:bg-gray-50 rounded-md p-2 -mx-2">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                          alt="Similar item" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">MacBook Pro Laptop</h4>
                        <p className="text-xs text-gray-500">Lost • May 1, 2023</p>
                        <p className="text-xs text-gray-500 truncate">Coffee Shop on 5th Avenue</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/items/5" className="block hover:bg-gray-50 rounded-md p-2 -mx-2">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Prescription Glasses</h4>
                        <p className="text-xs text-gray-500">Lost • May 2, 2023</p>
                        <p className="text-xs text-gray-500 truncate">Library, Second Floor</p>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="mt-4 text-center">
                  <Link to="/search" className="text-echo-blue text-sm hover:underline">
                    View More Similar Items
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ItemDetail;
