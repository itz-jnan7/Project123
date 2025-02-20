import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useMessages } from '../context/MessageContext';

export default function Contact() {
  const { addMessage } = useMessages();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    bookingDate: '',
    bookingTime: '',
    numberOfPeople: '',
    isBooking: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage({
      ...formData,
      status: formData.isBooking ? 'pending' : undefined
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      bookingDate: '',
      bookingTime: '',
      numberOfPeople: '',
      isBooking: false
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-orange-500 mr-3" />
                  <span>SCET, Narsapur, Andhra Pradesh 534280</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-orange-500 mr-3" />
                  <span>+91 9340001234</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-orange-500 mr-3" />
                  <span>qrrestaurantofficial@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Hours of Operation</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-orange-500 mr-3" />
                  <div>
                    <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
                    <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
            {submitted ? (
              <p className="bg-green-50 border border-green-200 rounded-md p-4 text-green-600">
                Your message has been sent successfully! We'll get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="isBooking"
                    id="isBooking"
                    checked={formData.isBooking}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isBooking" className="ml-2 block text-sm text-gray-700">
                    Book a Table
                  </label>
                </div>

                {formData.isBooking && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          name="bookingDate"
                          value={formData.bookingDate}
                          onChange={handleChange}
                          required={formData.isBooking}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <input
                          type="time"
                          name="bookingTime"
                          value={formData.bookingTime}
                          onChange={handleChange}
                          required={formData.isBooking}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of People
                      </label>
                      <input
                        type="number"
                        name="numberOfPeople"
                        value={formData.numberOfPeople}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        required={formData.isBooking}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Location</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe            
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.1228358879143!2d81.65537671110047!3d16.41858672992453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37d707cf0d34a5%3A0xab73194f64b31016!2sSwarnandhra%20College%20of%20Engineering%20and%20Technology(autonomous)!5e0!3m2!1sen!2sin!4v1739782541234!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}