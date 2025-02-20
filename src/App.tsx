import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import ChefLogin from './pages/ChefLogin';
import ChefDashboard from './pages/ChefDashboard';
import OrderWaiting from './pages/OrderWaiting';
import Rating from './pages/Rating';
import ProtectedRoute from './components/ProtectedRoute';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { MessageProvider } from './context/MessageContext';
import { RatingProvider } from './context/RatingContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MessageProvider>
          <OrderProvider>
            <CartProvider>
              <RatingProvider>
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/chef-login" element={<ChefLogin />} />
                    <Route path="/order-waiting" element={<OrderWaiting />} />
                    <Route path="/rating" element={<Rating />} />
                    <Route
                      path="/chef"
                      element={
                        <ProtectedRoute>
                          <ChefDashboard />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </div>
              </RatingProvider>
            </CartProvider>
          </OrderProvider>
        </MessageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;