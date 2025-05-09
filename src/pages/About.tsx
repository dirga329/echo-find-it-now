
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-echo-green py-14">
          <div className="echo-container">
            <h1 className="text-4xl font-bold text-center mb-4">About ECHO</h1>
            <p className="text-lg text-center max-w-3xl mx-auto">
              Connecting people with their lost items and helping communities reunite.
            </p>
          </div>
        </div>

        <section className="py-12 bg-white">
          <div className="echo-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-6">
                At ECHO, our mission is simple: to help people recover their lost belongings and 
                connect those who've found items with their rightful owners. We believe that 
                everyday items often hold sentimental value that goes beyond their monetary worth.
              </p>
              <p className="text-lg mb-6">
                ECHO stands for "Every Connection Helps Others" - because when we help reunite 
                people with their lost possessions, we create positive ripple effects throughout 
                our communities.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="echo-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">If You've Lost Something</h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    <li>Create an account or log in to your existing account</li>
                    <li>Report your lost item with detailed description and photos if available</li>
                    <li>Search our database of found items</li>
                    <li>Receive notifications when similar items are found</li>
                    <li>Connect with the finder through our secure messaging system</li>
                  </ol>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">If You've Found Something</h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    <li>Create an account or log in to your existing account</li>
                    <li>Report the found item with details and photos</li>
                    <li>Our system will search for matching lost item reports</li>
                    <li>If there's a match, both parties will be notified</li>
                    <li>Arrange a safe return through our secure messaging system</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="echo-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Why Use ECHO?</h2>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-4">
                  <div className="text-3xl text-echo-blue mb-2">🔍</div>
                  <h3 className="text-lg font-semibold mb-2">Targeted Search</h3>
                  <p className="text-gray-600">
                    Our smart matching system helps connect lost items with their finders quickly and efficiently.
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="text-3xl text-echo-blue mb-2">🔒</div>
                  <h3 className="text-lg font-semibold mb-2">Secure Platform</h3>
                  <p className="text-gray-600">
                    Your personal information is protected, and our messaging system keeps communications secure.
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="text-3xl text-echo-blue mb-2">📱</div>
                  <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
                  <p className="text-gray-600">
                    Simple interface designed for quick reporting and searching on any device.
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="text-3xl text-echo-blue mb-2">🌎</div>
                  <h3 className="text-lg font-semibold mb-2">Community Focus</h3>
                  <p className="text-gray-600">
                    Built to strengthen local connections and promote good citizenship.
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="text-3xl text-echo-blue mb-2">⏱️</div>
                  <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                  <p className="text-gray-600">
                    Get notified immediately when there's a potential match for your item.
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="text-3xl text-echo-blue mb-2">💬</div>
                  <h3 className="text-lg font-semibold mb-2">Direct Communication</h3>
                  <p className="text-gray-600">
                    Connect directly with the finder or owner through our messaging system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-echo-blue text-white">
          <div className="echo-container text-center">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Whether you've lost something valuable or found something that belongs to someone else,
              ECHO is here to help make connections happen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/report">
                <Button size="lg" variant="secondary">Report an Item</Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-echo-blue">
                  Search Items
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
