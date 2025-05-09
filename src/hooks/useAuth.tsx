
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tables } from '@/integrations/supabase/types';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  profile: UserProfile | null;
  avatarUrl: string | null;
  displayName: string | null;
  logout: () => Promise<void>;
  UserAvatar: React.FC<{ className?: string }>;
}

// Define the UserProfile type to match the profiles table
type UserProfile = Tables<'profiles'>;

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  profile: null,
  avatarUrl: null,
  displayName: null,
  logout: async () => {},
  UserAvatar: () => null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, email')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      return null;
    }
  };
  
  // Get display name from user or profile
  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';
  
  // Get avatar URL from profile or use null
  const avatarUrl = profile?.avatar_url || null;
  
  const logout = async () => {
    await supabase.auth.signOut();
  };
  
  // Component for rendering user avatar
  const UserAvatar = ({ className = '' }: { className?: string }) => {
    const initials = displayName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    return (
      <Avatar className={className}>
        {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    );
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);
        
        // Fetch profile when session changes
        if (currentSession?.user?.id) {
          setTimeout(() => {
            // Use setTimeout to avoid recursive loops with Supabase auth
            fetchProfile(currentSession.user.id).then(profileData => {
              setProfile(profileData);
            });
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Fetch profile if session exists
      if (currentSession?.user?.id) {
        fetchProfile(currentSession.user.id).then(profileData => {
          setProfile(profileData);
        });
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      isLoading, 
      profile, 
      displayName, 
      avatarUrl, 
      logout,
      UserAvatar
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
