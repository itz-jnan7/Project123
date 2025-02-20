import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/chef-login');
  };
  
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold">QR Restuarant</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-orange-500' : 'text-gray-600'
              } hover:text-orange-500 transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`${
                isActive('/menu') ? 'text-orange-500' : 'text-gray-600'
              } hover:text-orange-500 transition-colors`}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className={`${
                isActive('/about') ? 'text-orange-500' : 'text-gray-600'
              } hover:text-orange-500 transition-colors`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive('/contact') ? 'text-orange-500' : 'text-gray-600'
              } hover:text-orange-500 transition-colors`}
            >
              Contact Us
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/chef"
                  className={`${
                    isActive('/chef') ? 'text-orange-500' : 'text-gray-600'
                  } hover:text-orange-500 transition-colors`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/chef-login"
                className={`${
                  isActive('/chef-login') ? 'text-orange-500' : 'text-gray-600'
                } hover:text-orange-500 transition-colors`}
              >
                Chef Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}