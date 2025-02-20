import React, { useEffect, useState, useRef } from 'react';
import { useOrders } from '../context/OrderContext';
import { useMessages } from '../context/MessageContext';
import { Clock, ChefHat, CheckCircle, Bell, Table, MessageSquare, Printer, XCircle, Calendar, Users, CreditCard } from 'lucide-react';

export default function ChefDashboard() {
  const { orders, updateOrderStatus } = useOrders();
  const { messages, markAsRead, unreadCount, updateMessageStatus } = useMessages();
  const [notification, setNotification] = useState(false);
  const [lastOrderCount, setLastOrderCount] = useState(0);
  const [activeTab, setActiveTab] = useState('orders');
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pendingOrders = orders.filter(order => order.status === 'pending');
    if (pendingOrders.length > lastOrderCount) {
      setNotification(true);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play();
    }
    setLastOrderCount(pendingOrders.length);
  }, [orders, lastOrderCount]);

  const handleStatusUpdate = (orderId: string, status: 'preparing' | 'ready' | 'completed' | 'rejected') => {
    updateOrderStatus(orderId, status);
    if (status === 'completed' || status === 'rejected') {
      setNotification(false);
    }
  };

  const getOrdersByStatus = (status: 'pending' | 'preparing' | 'ready' | 'completed' | 'rejected') => {
    return orders
      .filter(order => order.status === status)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const handlePrint = (order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order #${order.id.slice(-4)} Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 2px solid #000;
            }
            .order-info {
              margin-bottom: 20px;
            }
            .items {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .items th, .items td {
              padding: 10px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            .total {
              text-align: right;
              font-weight: bold;
              font-size: 1.2em;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>QR Restaurant</h1>
            <p>Order #${order.id.slice(-4)}</p>
          </div>
          <div class="order-info">
            <p><strong>Date:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
            <p><strong>Table Number:</strong> ${order.items[0]?.tableNumber || 'N/A'}</p>
            <p><strong>Status:</strong> ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
          </div>
          <table class="items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.price.toFixed(2)}</td>
                  <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">
            Total Amount: ₹${order.total.toFixed(2)}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'preparing':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'ready':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'completed':
        return 'bg-gray-100 border-gray-500 text-gray-700';
      case 'rejected':
        return 'bg-red-100 border-red-500 text-red-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  const OrderCard = ({ order, showActions = true }) => (
    <div className={`border-l-4 p-4 mb-4 rounded-r-lg ${getStatusColor(order.status)}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <span className="font-bold">Order #{order.id.slice(-4)}</span>
          <div className="flex items-center bg-white px-2 py-1 rounded-full border border-current">
            <Table className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">
              Table {order.items[0]?.tableNumber || 'N/A'}
            </span>
          </div>
          <span className="text-sm">
            {new Date(order.timestamp).toLocaleTimeString()}
          </span>
          {order.status === 'rejected' && (
            <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              <XCircle className="h-3 w-3 mr-1" />
              Cancelled
            </span>
          )}
          <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${
            order.paymentStatus === 'completed' 
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            <CreditCard className="h-3 w-3 mr-1" />
            {order.paymentStatus === 'completed' ? 'Paid' : 'Payment Pending'}
          </span>
        </div>
        <span className="text-sm font-semibold">₹{order.total.toFixed(2)}</span>
      </div>

      <div className="space-y-2 mb-4">
        {order.items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex justify-between text-sm">
            <span>{item.quantity}x {item.name}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {showActions && (
        <div className="flex justify-end space-x-2">
          {order.status === 'pending' && (
            <>
              <button
                onClick={() => handleStatusUpdate(order.id, 'rejected')}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Order
              </button>
              <button
                onClick={() => handleStatusUpdate(order.id, 'preparing')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
              >
                <ChefHat className="h-4 w-4 mr-2" />
                Start Preparing
              </button>
            </>
          )}
          {order.status === 'preparing' && (
            <button
              onClick={() => handleStatusUpdate(order.id, 'ready')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Ready
            </button>
          )}
          {order.status === 'ready' && (
            <>
              <button
                onClick={() => handlePrint(order)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Order
              </button>
              <button
                onClick={() => handleStatusUpdate(order.id, 'completed')}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Order
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );

  const MessageCard = ({ message }) => (
    <div 
      className={`border-l-4 p-4 mb-4 rounded-r-lg ${
        message.read ? 'bg-gray-50 border-gray-300' : 'bg-blue-50 border-blue-500'
      }`}
      onClick={() => markAsRead(message.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold">{message.name}</h4>
          <div className="text-sm text-gray-600">
            <p>{message.email}</p>
            <p>{message.phone}</p>
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(message.timestamp).toLocaleString()}
        </span>
      </div>
      
      {message.isBooking && (
        <div className="mt-2 mb-3 bg-orange-50 p-3 rounded-md">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-orange-500 mr-2" />
              <span>{message.bookingDate} at {message.bookingTime}</span>
            </div>
            <div className="flex items-center">
              <Table className="h-4 w-4 text-orange-500 mr-2" />
              <span>Table {message.tableNumber}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-orange-500 mr-2" />
              <span>{message.numberOfPeople} people</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-orange-500 mr-2" />
              <span className={`font-medium ${
                message.status === 'pending' ? 'text-yellow-600' :
                message.status === 'accepted' ? 'text-green-600' :
                'text-red-600'
              }`}>
                {message.status?.charAt(0).toUpperCase() + message.status?.slice(1)}
              </span>
            </div>
          </div>
          
          {message.status === 'pending' && (
            <div className="mt-3 flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateMessageStatus(message.id, 'accepted');
                  markAsRead(message.id);

                  // Redirect to Gmail compose with the entered email
                  const subject = encodeURIComponent("Your Booking Confirmation");
                  const body = encodeURIComponent(
                    `Hello ${message.name},\n\nYour booking for Table on ${message.bookingDate} at ${message.bookingTime} has been confirmed.\n\nThank you for choosing us!`
                  );
                  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${message.email}&su=${subject}&body=${body}`;

                  window.open(mailtoLink, "_blank"); // Open Gmail in a new tab
                }}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-sm"
              >
                Accept Booking
              </button>
              <button
  onClick={(e) => {
    e.stopPropagation();
    updateMessageStatus(message.id, "rejected");
    markAsRead(message.id);

    // Redirect to Gmail compose with rejection email
    const subject = encodeURIComponent("Booking Rejection Notice");
    const body = encodeURIComponent(
      `Hello ${message.name},\n\nWe regret to inform you that your booking for a table on ${message.bookingDate} at ${message.bookingTime} could not be accommodated.\n\nWe apologize for any inconvenience caused.`
    );
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${message.email}&su=${subject}&body=${body}`;

    window.open(mailtoLink, "_blank"); // Open Gmail in a new tab
  }}
  className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm"
>
  Reject Booking
</button>
            </div>
          )}
        </div>
      )}
      
      <p className="text-gray-700">{message.message}</p>
    </div>
  );

  const completedOrders = [...getOrdersByStatus('completed'), ...getOrdersByStatus('rejected')];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Chef Dashboard</h2>
        <div className="flex items-center space-x-4">
          {notification && (
            <div className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full animate-pulse">
              <Bell className="h-5 w-5 mr-2" />
              New Orders!
            </div>
          )}
          {unreadCount > 0 && (
            <div className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full">
              <MessageSquare className="h-5 w-5 mr-2" />
              {unreadCount} New Messages
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'messages'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Messages {unreadCount > 0 && `(${unreadCount})`}
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Pending Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pending Orders</h3>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            {getOrdersByStatus('pending').length === 0 ? (
              <p className="text-gray-500 text-sm">No pending orders</p>
            ) : (
              getOrdersByStatus('pending').map(order => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </div>

          {/* Preparing Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Preparing</h3>
              <ChefHat className="h-5 w-5 text-blue-500" />
            </div>
            {getOrdersByStatus('preparing').length === 0 ? (
              <p className="text-gray-500 text-sm">No orders in preparation</p>
            ) : (
              getOrdersByStatus('preparing').map(order => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </div>

          {/* Ready Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Ready for Pickup</h3>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            {getOrdersByStatus('ready').length === 0 ? (
              <p className="text-gray-500 text-sm">No orders ready for pickup</p>
            ) : (
              getOrdersByStatus('ready').map(order => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </div>

          {/* Completed and Cancelled Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Completed Today</h3>
              <div className="flex items-center space-x-2">
                {completedOrders.length > 0 && (
                  <button
                    onClick={handlePrint}
                    className="flex items-center space-x-2 bg-orange-100 text-orange-600 px-3 py-1.5 rounded-md hover:bg-orange-200 transition-colors"
                    title="Print completed orders"
                  >
                    <Printer className="h-5 w-5" />
                    <span>Print Orders</span>
                  </button>
                )}
                <CheckCircle className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div ref={printRef}>
              {completedOrders.length === 0 ? (
                <p className="text-gray-500 text-sm">No completed orders</p>
              ) : (
                completedOrders.map(order => (
                  <OrderCard key={order.id} order={order} showActions={false} />
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Messages</h3>
            <MessageSquare className="h-5 w-5 text-blue-500" />
          </div>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages yet</p>
          ) : (
            <div className="space-y-4">
              {messages.map(message => (
                <MessageCard key={message.id} message={message} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}