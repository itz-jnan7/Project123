import React, { createContext, useContext, useState, useEffect } from 'react';
import { Message } from '../types';

interface MessageContextType {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  updateMessageStatus: (id: string, status: 'accepted' | 'rejected') => void;
  unreadCount: number;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('restaurant_messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  useEffect(() => {
    localStorage.setItem('restaurant_messages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (messageData: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const markAsRead = (id: string) => {
    setMessages(prev =>
      prev.map(message =>
        message.id === id ? { ...message, read: true } : message
      )
    );
  };

  const updateMessageStatus = (id: string, status: 'accepted' | 'rejected') => {
    setMessages(prev =>
      prev.map(message =>
        message.id === id ? { ...message, status } : message
      )
    );
  };

  const unreadCount = messages.filter(message => !message.read).length;

  return (
    <MessageContext.Provider value={{ messages, addMessage, markAsRead, updateMessageStatus, unreadCount }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
}