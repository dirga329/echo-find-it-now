
import { useAuth } from './useAuth';
import { useState, useEffect } from 'react';

/**
 * A hook to handle admin functionality and permissions
 */
export const useAdmin = () => {
  const { user, profile } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This is a simple check - in production, you would implement a more robust role-based system
    // For example, checking against a roles table in your database
    if (profile?.email) {
      // For demo purposes, any email containing 'admin' is considered an admin
      setIsAdmin(profile.email.includes('admin'));
    } else {
      setIsAdmin(false);
    }
    setIsLoading(false);
  }, [user, profile]);

  return {
    isAdmin,
    isLoading,
  };
};
