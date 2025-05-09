
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out"
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while logging out",
        variant: "destructive"
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="echo-container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-echo-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">ECHO</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-echo-blue transition-colors">
              Home
            </Link>
            <Link to="/report" className="text-gray-600 hover:text-echo-blue transition-colors">
              Report Item
            </Link>
            <Link to="/search" className="text-gray-600 hover:text-echo-blue transition-colors">
              Search
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-echo-blue transition-colors">
              About
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-2">
            <Link to="/search">
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </Link>
            
            {session ? (
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/login?tab=register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden mt-3 pt-3 border-t">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-echo-blue transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/report" 
                className="text-gray-600 hover:text-echo-blue transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Report Item
              </Link>
              <Link 
                to="/search" 
                className="text-gray-600 hover:text-echo-blue transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Search
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-echo-blue transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              
              {session ? (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2 pt-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link to="/login?tab=register" onClick={() => setIsOpen(false)}>
                    <Button size="sm">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
