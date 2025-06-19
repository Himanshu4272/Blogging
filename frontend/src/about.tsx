import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
// import SearchModal from './SearchModal';

const About: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);

  const carouselImages = [
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
    "https://images.unsplash.com/photo-1507136566006-cfc505b114fc",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
  ];

  const nextSlide = () => setCurrentIndex(prev => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex(prev => (prev === 0 ? carouselImages.length - 1 : prev - 1));

  // const handleSearchPostSelect = () => {
  //   // Navigate to blogs page or show post
  //   setIsSearchOpen(false);
  // };

  return (
    <div className="font-sans text-gray-800 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src="/logod.jpg" alt="Logo" className="w-44 h-auto" />
          <nav className="flex space-x-8">
            <Link to="/" className="hover:text-gray-600">Home</Link>
            <Link to="/blogs" className="hover:text-gray-600">Blogs</Link>
            <Link to="/about" className="font-semibold text-gray-600">About us</Link>
            <Link to="/contact" className="hover:text-gray-600">Contact</Link>
          </nav>
          <button 
            // onClick={() => setIsSearchOpen(true)}
            className="bg-gray-700 text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
          </button>
        </div>
      </header>

      {/* About Header */}
      <div className="pt-32 pb-20 bg-gradient-to-b from-gray-300 to-gray-400">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">About VAP'D DASHSTEAM</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Born from passion, built for enthusiasts. Our journey in the automotive world.
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-7xl mx-auto mt-20 px-4 pb-20">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Welcome to VAP'D DASHSTEAM Pvt. Ltd. — a hub where innovation meets passion in the automotive space...
          </p>
        </div>

        {/* Carousel */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Journey</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {carouselImages.map((image) => (
                  <div key={image} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-200 rounded-xl overflow-hidden">
                      <img src={image} alt="Carousel Image" className="w-full h-96 object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full ml-2">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full mr-2">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Meet The Team</h2>
          <div className="flex justify-center mb-20">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
              {/* Circular Image */}
              <div className="flex justify-center mb-6">
                <img
                  src="/ceo.jpg" 
                  alt="Aman Kumar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                />
              </div>

              {/* Card Content */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Aman Kumar</h3>
              <p className="text-lg font-medium text-gray-700 mb-4">Chief Technical Officer</p>
              <p className="text-gray-600 mb-3">Building this platform has been a journey...</p>
              <p className="text-gray-600 mb-3">From designing a user-friendly interface...</p>
              <p className="text-gray-600">This isn't just a website...</p>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="bg-gradient-to-r from-gray-300 to-gray-200 p-8 rounded-xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Join Our Community</h2>
            <p className="text-gray-700 mb-6">
              Connect with thousands of automotive enthusiasts worldwide...
            </p>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-medium">
              Become a Member
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center border-b border-gray-700 pb-6">
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-gray-400">About</a>
              <a href="#" className="hover:text-gray-400">Contact us</a>
              <a href="#" className="hover:text-gray-400">FAQs</a>
              <a href="#" className="hover:text-gray-400">Terms and conditions</a>
              <a href="#" className="hover:text-gray-400">Cookie policy</a>
              <a href="#" className="hover:text-gray-400">Privacy</a>
            </div>
            <div className="flex gap-4 text-xl mt-4 lg:mt-0">
              <a href="https://www.facebook.com/DashSteamVAP" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <Facebook />
              </a>
              <a href="https://www.instagram.com/dashsteamvap/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <Instagram />
              </a>
              <a href="https://x.com/DashSteamVAP" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <Twitter />
              </a>
              <a href="https://www.linkedin.com/company/dashsteamvap/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <Linkedin />
              </a>
            </div>
          </div>
          <p className="text-center mt-6 text-gray-400">
            Copyright © 2025 - VAPD DASHSTREAM
          </p>
        </div>
      </footer>

      {/* Search Modal */}
      {/* <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onPostSelect={handleSearchPostSelect}
      /> */}
    </div>
  );
};

export default About;
