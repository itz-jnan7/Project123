import React, { createContext, useContext, useState, useEffect } from 'react';
import { Rating } from '../types';

interface RatingContextType {
  ratings: Rating[];
  addRating: (rating: Omit<Rating, 'id' | 'timestamp'>) => void;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export function RatingProvider({ children }: { children: React.ReactNode }) {
  const [ratings, setRatings] = useState<Rating[]>(() => {
    const savedRatings = localStorage.getItem('restaurant_ratings');
    return savedRatings ? JSON.parse(savedRatings) : [];
  });

  useEffect(() => {
    localStorage.setItem('restaurant_ratings', JSON.stringify(ratings));
  }, [ratings]);

  const addRating = (ratingData: Omit<Rating, 'id' | 'timestamp'>) => {
    const newRating: Rating = {
      ...ratingData,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setRatings(prev => [newRating, ...prev]);
  };

  return (
    <RatingContext.Provider value={{ ratings, addRating }}>
      {children}
    </RatingContext.Provider>
  );
}

export function useRatings() {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error('useRatings must be used within a RatingProvider');
  }
  return context;
}