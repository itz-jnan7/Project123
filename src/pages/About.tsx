import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">About QR Restaurant</h2>
        
        <div className="mb-8">
          <img
            src="https://wallpaperbat.com/img/729587-wallpaper-view-restaurant-interieur-image-for-desktop-section-intierie.jpg"
            alt="Restaurant interior"
            className="w-full h-[400px] object-cover rounded-lg mb-6"
          />
          
          <p className="text-gray-600 mb-4">
            QR Restaurant has been serving delightful experiences through the art of cooking for four decades. A cozy, relaxing space combined with flavourful dishes makes it a first choice for every foodie in town. It provides a wide range of items to choose from and lets everyone indulge in an experience of pleasing their taste buds.

We provides a wide range of cuisines and dishes to choose from so that every foodie in town has their best experience here.

We have always won the hearts of our customers with appetizing dishes and friendly behaviour. It is the best choice for everyone who wants to enjoy the best quality food at reasonable prices.
          </p>
          
          <p className="text-gray-600 mb-4">
            Our restaurant is built on the foundation of using only the finest, locally-sourced 
            ingredients to create memorable dining experiences. Each dish is carefully crafted 
            by our team of expert chefs who bring years of experience and creativity to our kitchen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To provide an exceptional dining experience through innovative cuisine, 
              impeccable service, and a welcoming atmosphere that makes every guest 
              feel like family.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be recognized as the premier dining destination, known for our 
              commitment to culinary excellence, sustainability, and community engagement.
            </p>
          </div>
        </div>


      </div>
    </div>
  );
}