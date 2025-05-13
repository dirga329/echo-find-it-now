
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import RecentItems from '@/components/RecentItems';
import CategoriesGrid from '@/components/CategoriesGrid';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <section className="py-16 bg-white">
          <div className="echo-container">
            <h2 className="text-3xl font-bold text-center mb-8">
              How can we help you today?
            </h2>
            <div className="flex flex-col items-center mb-12">
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <Link to="/report?type=lost">
                  <Button variant="outline">I lost an item</Button>
                </Link>
                <Link to="/report?type=found">
                  <Button variant="outline">I found an item</Button>
                </Link>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-center mb-6">
              Browse by Category
            </h3>
            <CategoriesGrid />
          </div>
        </section>
        
        <section className="py-16 bg-echo-gray">
          <div className="echo-container space-y-16">
            <RecentItems title="Recently Lost Items" type="lost" limit={4} />
            <RecentItems title="Recently Found Items" type="found" limit={4} />
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="echo-container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Reconnect?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Whether you've lost something valuable or found something that belongs to someone else, we're here to help reunite items with their owners.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/search">
                <Button size="lg">Search for Items</Button>
              </Link>
              <Link to="/report">
                <Button variant="outline" size="lg">Report an Item</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
