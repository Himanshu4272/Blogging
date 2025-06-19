import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Blogs from './blogs';
import About from './about';
import Contact from './contact';
import SearchModal from './SearchModal';
import BlogPostDetail from './BlogPostDetail';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  author: string;
  category: string;
  slug: string;
}

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent posts from API
  useEffect(() => {
    fetch('http://localhost:8000/api/recent-posts/')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        console.log("Recent posts API response:", data); // Debug log
        // Handle both array and paginated response
        const postsArray = Array.isArray(data) ? data : (data.results || data);
        if (Array.isArray(postsArray)) {
          setRecentPosts(postsArray);
        } else {
          setRecentPosts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setRecentPosts([]);
        setLoading(false);
      });
  }, []);

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchPostSelect = () => {
    // You can navigate to the blogs page or show the post in a modal
    // For now, we'll just close the search modal
    setIsSearchOpen(false);
  };

  // Helper function to get plain text from HTML
  const getPlainTextFromHtml = (html: string): string => {
    if (!html) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const featuredPosts = [
    {
      title: "The Evolution of JDM Culture",
      excerpt: "Exploring the rich history of Japanese domestic market cars...",
      image: "https://images.pexels.com/photos/12206441/pexels-photo-12206441.jpeg",
      category: "Culture"
    },
    {
      title: "Ultimate Guide to Engine Tuning",
      excerpt: "Master the art of performance tuning with our comprehensive guide...",
      image: "https://images.pexels.com/photos/8985530/pexels-photo-8985530.jpeg",
      category: "Technical"
    },
    {
      title: "Future of Electric Performance",
      excerpt: "How EV technology is revolutionizing the performance car segment...",
      image: "https://images.pexels.com/photos/7516509/pexels-photo-7516509.jpeg",
      category: "Innovation"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">

      {/* New Header */}
      <header className="w-full bg-white shadow">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
<img src="/logod.jpg" alt="Logo" className="w-44 h-auto" />
    <nav className="flex space-x-8">
      <Link to="/" className="text-black hover:text-gray-600">Home</Link>
      <Link to="/blogs" className="text-black hover:text-gray-600">Blogs</Link>
      <Link to="/about" className="text-black hover:text-gray-600">About us</Link>
      <Link to="/contact" className="text-black hover:text-gray-600">Contact</Link>
    </nav>
    <button 
      onClick={() => setIsSearchOpen(true)}
      className="bg-gray-600 text-white px-4 py-2 text-sm hover:bg-gray-700 transition-colors flex items-center space-x-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span>Search</span>
      <kbd className="hidden sm:inline-block px-1 py-0.5 text-xs bg-gray-700 rounded">⌘K</kbd>
    </button>
  </div>
</header>

<Routes>
  <Route path="/blogs" element={<Blogs />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/blogs/post/:slug" element={<BlogPostDetail />} />
  <Route path="/*" element={
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/30 via-[#0A0A0A]/70 to-[#101D42]/50">
          <img
            src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"
            alt="Hero"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.8)' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              VAP'D DASHSTEAM
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Your premium destination for automotive culture, performance, and lifestyle
            </p>
            <Link 
              to="/blogs" 
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
            >
              Explore Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-gray-200">Featured Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="absolute bottom-0 p-6">
                    <span className="inline-block px-3 py-1 bg-gray-600 rounded-full text-sm mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-300 text-sm">{post.excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-gray-200">Recent Posts</h2>
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto"></div>
              <p className="text-gray-400 mt-2">Loading recent posts...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentPosts.map((post) => (
                <div key={post.id} className="group cursor-pointer block">
                  <div className="overflow-hidden rounded-lg mb-4">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-2">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <h3 className="font-semibold group-hover:text-gray-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {getPlainTextFromHtml(post.content).slice(0, 60)}...
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
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
    </div>
  } />
</Routes>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onPostSelect={handleSearchPostSelect}
      />
    </div>
  );
}

export default App;
