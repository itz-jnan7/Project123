import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChefHat, CheckCircle, UtensilsCrossed, XCircle, Star, CreditCard } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

export default function OrderWaiting() {
  const navigate = useNavigate();
  const { orders, updateOrderStatus, updatePaymentStatus } = useOrders();
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showCancelMessage, setShowCancelMessage] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    const latestOrder = orders[orders.length - 1];
    setCurrentOrder(latestOrder);
  }, [orders]);

  const handleCancelOrder = () => {
    if (currentOrder && currentOrder.status === 'pending') {
      updateOrderStatus(currentOrder.id, 'rejected');
      setShowCancelMessage(true);
      setTimeout(() => {
        setShowCancelMessage(false);
      }, 3000);
    }
  };

  const handlePayment = () => {
    if (currentOrder) {
      // Simulate payment processing
      updatePaymentStatus(currentOrder.id, 'completed');
      setShowPaymentSuccess(true);
      setTimeout(() => {
        setShowPaymentSuccess(false);
      }, 3000);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="h-6 w-6 text-yellow-500" />,
          text: 'Order Received',
          description: 'Your order has been sent to the kitchen',
          color: 'text-yellow-500',
          progress: 25
        };
      case 'preparing':
        return {
          icon: <ChefHat className="h-6 w-6 text-blue-500" />,
          text: 'Preparing Your Order',
          description: 'Our chefs are cooking your delicious meal',
          color: 'text-blue-500',
          progress: 50
        };
      case 'ready':
        return {
          icon: <UtensilsCrossed className="h-6 w-6 text-green-500" />,
          text: 'Order Ready',
          description: 'Your order is ready for pickup',
          color: 'text-green-500',
          progress: 100
        };
      case 'completed':
        return {
          icon: <CheckCircle className="h-6 w-6 text-gray-500" />,
          text: 'Order Completed',
          description: 'Thank you for dining with us',
          color: 'text-gray-500',
          progress: 100
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-6 w-6 text-red-500" />,
          text: 'Order Cancelled',
          description: 'Your order has been cancelled successfully',
          color: 'text-red-500',
          progress: 0
        };
      default:
        return {
          icon: <Clock className="h-6 w-6 text-orange-500" />,
          text: 'Processing Order',
          description: 'Please wait while we process your order',
          color: 'text-orange-500',
          progress: 0
        };
    }
  };

  if (!currentOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">No active order found</p>
          <button
            onClick={() => navigate('/menu')}
            className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
          >
            Place an Order
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(currentOrder.status);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              {statusInfo.icon}
            </div>
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${statusInfo.color}`}>
            {statusInfo.text}
          </h2>
          <p className="text-gray-600">
            {statusInfo.description}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Order #{currentOrder.id.slice(-4)}</span>
            <span>Table {currentOrder.items[0]?.tableNumber}</span>
          </div>
          
          {currentOrder.status !== 'rejected' && (
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${statusInfo.progress}%` }}
              ></div>
            </div>
          )}

          <div className="space-y-2">
            {currentOrder.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{currentOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {showPaymentSuccess && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
              <p className="text-green-700 font-medium">
                Payment completed successfully!
              </p>
            </div>
          )}

          {currentOrder.status === 'ready' && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
              <p className="text-green-700 font-medium">
                Your order is ready! Please collect it from the counter.
              </p>
            </div>
          )}

          {currentOrder.status === 'pending' && (
            <button
              onClick={handleCancelOrder}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
            >
              <XCircle className="h-5 w-5 mr-2" />
              Cancel Order
            </button>
          )}

          {currentOrder.paymentStatus === 'pending' && currentOrder.status !== 'rejected' && (
            <button
              onClick={handlePayment}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Pay Now (₹{currentOrder.total.toFixed(2)})
            </button>
          )}
          
          <button
            onClick={() => navigate('/menu')}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
          >
            Place Another Order
          </button>

          {(currentOrder.status === 'completed' || currentOrder.status === 'rejected') && (
            <button
              onClick={() => navigate('/rating')}
              className="w-full flex items-center justify-center bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
            >
              <Star className="h-5 w-5 mr-2" />
              Rate Your Experience
            </button>
          )}
        </div>
      </div>
    </div>
  );
}