export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'rejected';
  paymentStatus: 'pending' | 'completed';
  timestamp: Date;
  tableNumber?: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: Date;
  read: boolean;
  bookingDate?: string;
  bookingTime?: string;
  tableNumber?: number;
  numberOfPeople?: number;
  isBooking: boolean;
  status?: 'pending' | 'accepted' | 'rejected';
}

export interface Rating {
  id: string;
  name: string;
  message: string;
  stars: number;
  timestamp: Date;
}