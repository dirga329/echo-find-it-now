
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-echo-green py-16 md:py-24">
      <div className="echo-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Lost something? <br />
              <span className="text-echo-blue">We can help you find it.</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              ECHO connects people who have lost items with those who have found them. Report, search, and reconnect with your belongings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/report">
                <Button size="lg">Report an Item</Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" size="lg">Search Lost Items</Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
              alt="Person looking for lost item" 
              className="rounded-lg shadow-lg max-h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
