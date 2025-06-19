import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from "react-router-dom";
import axios from "axios";
// import SearchModal from './SearchModal';

const Contact: React.FC = () => {
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // const handleSearchPostSelect = () => {
  //   // Navigate to blogs page or show post
  //   setIsSearchOpen(false);
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
    setSuccess(null);
  };

  const validate = () => {
    if (!formData.name.trim() || formData.name.length < 2) return "Name is required (min 2 chars)";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return "Valid email required";
    if (!formData.message.trim() || formData.message.length < 10) return "Message is required (min 10 chars)";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await axios.post("/api/contacts/", formData);
      setSuccess(res.data.message || "Message sent! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: '',
        company: '',
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Something went wrong. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-black"
      style={{
        backgroundColor: '#181818',
        backgroundImage: `
          linear-gradient(to right, #232323 1px, transparent 1px),
          linear-gradient(to bottom, #232323 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      {/* Header */}
      <header className="w-full bg-[#181818] shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src="/logod.jpg" alt="Logo" className="w-44 h-auto" />
          <nav className="flex space-x-8">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/blogs" className="text-white hover:text-gray-300">Blogs</Link>
            <Link to="/about" className="text-white hover:text-gray-300">About us</Link>
            <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
          </nav>
          <button 
            // onClick={() => setIsSearchOpen(true)}
            className="bg-gray-600 text-white px-4 py-2 text-sm hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
          </button>
        </div>
      </header>

      {/* Header Section */}
      <div
        className="pt-32 pb-20 mb-20 bg-gradient-to-b from-gray-900 to-[#0A0A0A] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/1010/246/545/2015-bmw-i8-car-cool-side-view-grey-sports-coupe-wallpaper-preview.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div> {/* Optional dark overlay */}
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl text-white font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to rev up your automotive journey? Whether you're looking for expert advice, want to share your passion, or need professional services - we're here to fuel your automotive dreams.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-8">

            <div className="bg-gray-800/70 p-8 rounded-xl">
              <h2 className="text-white text-2xl font-bold mb-6">Connect With Our Team</h2>
              <div className="space-y-6">
                {[
                  { icon: "📍", title: "Visit Our Workshop", content: "Basudhara Complex, South Collectoriate Road,\nOpposite Reliance Smart Point and Near Collectorate\nBuxar, Bihar, 802103" },
                  { icon: "📧", title: "Drop Us a Line", content: "vapddashsteam@gmail.com", link: "mailto:vapddashsteam@gmail.com" },
                  { icon: "📞", title: "Call for Support", content: "+91 7488928997", link: "tel:+91 7488928997" },
                  { icon: "🕒", title: "Service Hours", content: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed" },
                ].map(({ icon, title, content, link }, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-600/20 rounded-full">
                      <span className="text-gray-300 text-xl">{icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{title}</h3>
                      <p className="text-white whitespace-pre-line">
                        {link ? (
                          <a href={link} className="hover:text-gray-300 transition-colors">{content}</a>
                        ) : content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-gradient-to-br from-white to-black p-8 rounded-xl border border-gray-700/30">
              <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
              <p className="text-gray-800 mb-6">Follow us for the latest automotive insights, tips, and exclusive content</p>
              <div className="space-y-4">
                {[
                  { icon: "📘", label: "Facebook", url: "https://www.facebook.com/DashSteamVAP" },
                  { icon: "📷", label: "Instagram", url: "https://www.instagram.com/dashsteamvap/" },
                  { icon: "💼", label: "LinkedIn", url: "https://www.linkedin.com/company/dashsteamvap/" },
                  { icon: "🧵", label: "Threads", url: "https://www.threads.com/@dashsteamvap" },
                  { icon: "📱", label: "WhatsApp", url: "https://wa.me/7488928997" },
                  { icon: "🐦", label: "X (Twitter)", url: "https://x.com/DashSteamVAP" },
                ].map(({ icon, label, url }, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-black hover:text-gray-200 transition"
                  >
                    <span className="text-2xl text-black mr-2">{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/70 p-8 rounded-xl">
            <h2 className="text-2xl text-white font-bold mb-6">Send Us Your Message</h2>
            <p className="text-gray-300 mb-6">Tell us about your automotive needs, questions, or share your passion for cars. We'd love to hear from you!</p>
            {success && <div className="mb-4 p-3 rounded bg-green-700 text-white text-center">{success}</div>}
            {error && <div className="mb-4 p-3 rounded bg-red-700 text-white text-center">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-white font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A0A0A]/70 border border-gray-600 rounded-lg py-3 px-4 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-all text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-white font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A0A0A]/70 border border-gray-600 rounded-lg py-3 px-4 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-all text-white"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm text-white font-medium mb-2">Phone (optional)</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A0A0A]/70 border border-gray-600 rounded-lg py-3 px-4 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-all text-white"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm text-white font-medium mb-2">Company (optional)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A0A0A]/70 border border-gray-600 rounded-lg py-3 px-4 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-all text-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm  text-white font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-[#0A0A0A]/70 border border-gray-600 rounded-lg py-3 px-4 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-all text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm  text-white font-medium mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-[#0A0A0A]/70 border border-gray-600 rounded-lg py-3 px-4 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-all text-white"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-medium w-full transition-all duration-300"
                disabled={loading}
              >
                {loading ? <span>Sending...</span> : <span>Send Message</span>}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-gray-800/70 rounded-xl overflow-hidden">
          <div className="p-6">
            <h3 className="text-2xl text-white font-bold mb-4">Find Our Workshop</h3>
            <p className="text-gray-300 mb-6">Visit us at our state-of-the-art facility in Buxar, where automotive excellence meets passion.</p>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660045.034077874!2d83.76184445!3d25.096074199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d0a09a89a7cfd%3A0x51152a1f9643e9e0!2sBihar%2C%20India!5e0!3m2!1sen!2sjp!4v1710000000000!5m2!1sen!2sjp"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale-[50%] contrast-125"
          ></iframe>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-10 text-sm">
        <div className="container mx-auto px-8">
          <div className="flex flex-wrap justify-between items-center border-b border-gray-700 pb-6">
            <div className="flex flex-wrap gap-6">
              <a href="#">About</a>
              <a href="#">Contact us</a>
              <a href="#">FAQs</a>
              <a href="#">Terms and conditions</a>
              <a href="#">Cookie policy</a>
              <a href="#">Privacy</a>
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
          <p className="text-center text-xs mt-4 text-gray-400">
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

export default Contact;
