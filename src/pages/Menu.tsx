import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { menuData } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { Plus, Minus, Table, ShoppingBag, AlertCircle } from 'lucide-react';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState(menuData[0].name);
  const [tableNumber, setTableNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { items, addToCart, removeFromCart, clearCart, total } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check URL parameters for table number
    const params = new URLSearchParams(location.search);
    const tableParam = params.get('table');
    
    // Check session storage for existing table number
    const storedTable = sessionStorage.getItem('tableNumber');
    
    if (tableParam) {
      const parsedTable = parseInt(tableParam);
      if (!isNaN(parsedTable) && parsedTable > 0 && parsedTable <= 25) {
        setTableNumber(parsedTable);
        sessionStorage.setItem('tableNumber', parsedTable.toString());
        setError(null);
      } else {
        setError('Invalid table number detected. Please select your table number.');
      }
    } else if (storedTable) {
      setTableNumber(parseInt(storedTable));
    }
  }, [location]);

  const getItemQuantity = (itemName: string) => {
    const item = items.find(i => i.name === itemName);
    return item?.quantity || 0;
  };

  const handlePlaceOrder = () => {
    if (items.length > 0) {
      addOrder(items);
      clearCart();
      navigate('/order-waiting');
    }
  };

  const handleTableSelect = (table: number) => {
    setTableNumber(table);
    sessionStorage.setItem('tableNumber', table.toString());
    setError(null);
    // Update URL without refreshing the page
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('table', table.toString());
    window.history.pushState({}, '', newUrl.toString());
  };

  if (!tableNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
          <div className="flex items-center justify-center mb-6">
            <Table className="h-12 w-12 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Select Your Table</h2>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {[...Array(25)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handleTableSelect(index + 1)}
                className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors rounded-lg py-3 text-lg font-bold"
              >
                {index + 1}
              </button>
            ))}
          </div>
          <p className="text-gray-600 text-center text-sm">
            Please select your table number to proceed with ordering
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Our Menu</h1>
        <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full flex items-center">
          <Table className="h-5 w-5 mr-2" />
          <span>Table {tableNumber}</span>
        </div>
      </div>

      <div className="flex overflow-x-auto mb-8 pb-2 -mx-4 px-4 md:px-0">
        <div className="flex space-x-4">
          {menuData.map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`whitespace-nowrap px-4 py-2 rounded-full ${
                selectedCategory === category.name
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-20">
        {menuData
          .find(category => category.name === selectedCategory)
          ?.items.map(item => (
            <div
              key={item.name}
              className="bg-white rounded-lg shadow-md p-6 flex justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                {item.description && (
                  <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
                )}
                <p className="text-orange-600 font-semibold mt-2">₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getItemQuantity(item.name) > 0 && (
                  <>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="p-1 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{getItemQuantity(item.name)}</span>
                  </>
                )}
                <button
                  onClick={() => addToCart({ ...item, tableNumber })}
                  className="p-1 rounded-full bg-orange-600 text-white hover:bg-orange-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
      </div>

      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Items: {items.length}</p>
              <p className="text-xl font-bold">Total: ₹{total.toFixed(2)}</p>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition-colors flex items-center"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}