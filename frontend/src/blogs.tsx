import React, { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from "react-router-dom";
import SearchModal from './SearchModal';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  author: string;
  category: string; 
}

interface Category {
  id: number;
  name: string;
}

const API_URL = "http://localhost:8000/api/all-posts/";
const CATEGORIES_API_URL = "http://localhost:8000/api/categories/";

// Helper function to decode HTML entities and preserve HTML structure
function decodeHtmlEntities(html: string): string {
  if (!html) {
    return '';
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const decodedHtml = doc.body.innerHTML || '';
  console.log("Decoded HTML from decodeHtmlEntities:", decodedHtml);
  return decodedHtml;
}

// Helper function to get plain text from HTML
function getPlainTextFromHtml(html: string): string {
  if (!html) return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

const Blogs: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    let url = API_URL;
    if (selectedCategory) {
      url = `${API_URL}?category=${selectedCategory}`;
    }
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data); // Debug log
        // Handle both array and paginated response
        const postsArray = Array.isArray(data) ? data : (data.results || data);
        if (!Array.isArray(postsArray)) {
          console.error("Posts is not an array:", postsArray);
          setPosts([]);
        } else {
          setPosts(postsArray);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError(err.message);
        setPosts([]); // Ensure posts is always an array
        setLoading(false);
      });
  }, [selectedCategory]);

  useEffect(() => {
    fetch(CATEGORIES_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => {
        console.log("Categories API Response:", data); // Debug log
        const categoriesArray = Array.isArray(data) ? data : (data.results || data);
        if (Array.isArray(categoriesArray)) {
          setCategories(categoriesArray);
        } else {
          setCategories([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]);
      });
  }, []);

  const handleReadMoreClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleCategoryClick = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    setSelectedPost(null); // Clear selected post when category changes
  };

  const handleSearchPostSelect = (post: BlogPost) => {
    setPosts([post]);
    setSearchActive(true);
    setIsSearchOpen(false);
    setSelectedPost(null);
  };

  const handleClearSearch = () => {
    setSearchActive(false);
    setSelectedCategory(null);
    setSelectedPost(null);
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const postsArray = Array.isArray(data) ? data : (data.results || data);
        setPosts(postsArray);
        setLoading(false);
      });
  };

  const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <div className="flex bg-white shadow-lg mb-6">
      {post.image && <img src={post.image} alt={post.title} className="w-1/2 h-40 object-cover" />}
      <div className="w-1/2 p-4">
        <h3 className="font-semibold">{post.title}</h3>
        {post.category && <p className="text-sm text-gray-500">Category: {post.category}</p>}
        <p className="text-sm text-gray-600">{getPlainTextFromHtml(post.content).slice(0, 80)}...</p>
        <button onClick={() => handleReadMoreClick(post)} className="mt-4 px-4 py-1 bg-gray-600 text-white text-sm inline-block">
          Read more
        </button>
      </div>
    </div>
  );

  const DetailedPostView: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
        <p className="text-gray-600 text-sm mb-6">
          By {post.author} on {new Date(post.created_at).toLocaleDateString()}
          {post.category && <span className="ml-4">Category: {post.category}</span>}
        </p>
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-8" />
        )}
        <div
          className="prose max-w-none text-gray-700 ck-content"
          dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(post.content) || '' }}
        />
      </div>
    </div>
  );

  const Sidebar: React.FC = () => (
    <aside className="w-full lg:w-1/3 px-4 mt-10 lg:mt-0">
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <button 
            onClick={() => handleCategoryClick(null)}
            className={`bg-gray-600 text-white text-center py-1 cursor-pointer ${
              selectedCategory === null ? 'bg-gray-800' : ''
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.name)}
              className={`bg-gray-600 text-white text-center py-1 cursor-pointer ${
                selectedCategory === cat.name ? 'bg-gray-800' : ''
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Latest Posts</h3>
        {Array.isArray(posts) && posts.slice(0, 3).map((post) => (
          <div key={post.id} className="mb-3">
            <button onClick={() => handleReadMoreClick(post)} className="font-semibold text-sm hover:underline text-left w-full">
              {post.title}
            </button>
            <p className="text-xs text-gray-600">{getPlainTextFromHtml(post.content).slice(0, 40)}...</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Latest Images</h3>
        {Array.isArray(posts) && posts.slice(0, 3).map((post) => (
          <div key={post.id} className="mb-3">
            {post.image && <img src={post.image} alt={post.title} className="w-full h-24 object-cover mb-2" />}
            <button onClick={() => handleReadMoreClick(post)} className="font-semibold text-sm hover:underline text-left w-full">
              {post.title}
            </button>
            <p className="text-xs text-gray-600">{getPlainTextFromHtml(post.content).slice(0, 40)}...</p>
          </div>
        ))}
      </div>
    </aside>
  );

  const Footer: React.FC = () => (
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
  );

  return (
    <div className="font-sans text-gray-800 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
<img src="/logod.jpg" alt="Logo" className="w-44 h-auto" />
          <nav className="flex space-x-8">
            <Link to="/" className="hover:text-gray-600">Home</Link>
            <Link to="/blogs" className="font-semibold text-gray-600">Blogs</Link>
            <Link to="/about" className="hover:text-gray-600">About us</Link>
            <Link to="/contact" className="hover:text-gray-600">Contact</Link>
          </nav>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="bg-gray-600 text-white px-4 py-2 text-sm hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
          </button>
        </div>
      </header>

      {/* OUR BLOGS Section */}
      <div
  className="text-white text-center py-32 px-20 text-3xl font-bold"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundBlendMode: "multiply",
    backgroundColor: "rgba(75,75,75,0.6)",
  }}
>
  OUR BLOGS
</div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row px-8 py-10 gap-8">
        <main className="w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-2">Featured Blogs</h2>
          <div className="w-20 h-1 bg-gray-600 mb-6" />
          
          {searchActive && (
            <button onClick={handleClearSearch} className="mb-4 px-4 py-2 bg-gray-400 text-white rounded">Clear Search</button>
          )}
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">Error: {error}</p>
            </div>
          ) : Array.isArray(posts) && posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No posts available.</p>
            </div>
          )}
        </main>

        <Sidebar />
      </div>

      {selectedPost && (
        <DetailedPostView post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onPostSelect={handleSearchPostSelect}
        />
      )}

      <Footer />
    </div>
  );
};

export default Blogs;
