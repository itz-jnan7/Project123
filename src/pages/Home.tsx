import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useRatings } from '../context/RatingContext';

export default function Home() {
  const { ratings } = useRatings();

  return (
    <div className="min-h-screen">
      <div className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"> 
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to QR Restaurant</h1>
            <p className="text-xl mb-8">Come Join Us For A Magical Experience.</p>
            <div className="space-x-4">
              <Link
                to="/menu"
                className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors"
              >
                View Menu
              </Link>
              <Link
                to="/contact"
                className="bg-white text-orange-500 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Fresh Ingredients</h3>
            <p className="text-gray-600">We use only the finest, locally-sourced ingredients</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Expert Chefs</h3>
            <p className="text-gray-600">Our master chefs create culinary masterpieces</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Cozy Atmosphere</h3>
            <p className="text-gray-600">Enjoy your meal in our warm, welcoming environment</p>
          </div>
        </div>

        {ratings.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-8 text-center">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ratings.slice(0, 6).map((rating) => (
                <div key={rating.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${
                          index < rating.stars
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{rating.message}</p>
                  <p className="font-semibold">{rating.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(rating.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}