import React, { useState, useEffect } from 'react';
import { Search, X, Clock, User, Tag } from 'lucide-react';

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

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostSelect: (post: BlogPost) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onPostSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Get recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Perform search
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/posts/?search=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      performSearch(searchQuery);
    }
  };

  // Handle recent search click
  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    saveRecentSearch(query);
    performSearch(query);
  };

  // Handle post selection
  const handlePostSelect = (post: BlogPost) => {
    onPostSelect(post);
    onClose();
  };

  // Helper function to get plain text from HTML
  const getPlainTextFromHtml = (html: string): string => {
    if (!html) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mt-20 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Search Blogs</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for blogs, authors, or topics..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              autoFocus
            />
          </div>
        </form>

        {/* Content */}
        <div className="overflow-y-auto max-h-96">
          {!searchQuery && recentSearches.length > 0 && (
            <div className="p-4 border-b">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Clock size={16} className="mr-2" />
                Recent Searches
              </h3>
              <div className="space-y-2">
                {recentSearches.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(query)}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-500 mt-2">Searching...</p>
            </div>
          )}

          {!isLoading && searchQuery && searchResults.length === 0 && (
            <div className="p-8 text-center">
              <Search className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
              <p className="text-sm text-gray-400 mt-1">Try different keywords or check your spelling</p>
            </div>
          )}

          {!isLoading && searchResults.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </h3>
              <div className="space-y-4">
                {searchResults.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handlePostSelect(post)}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{post.title}</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {getPlainTextFromHtml(post.content).slice(0, 100)}...
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <User size={12} className="mr-1" />
                          {post.author}
                        </span>
                        {post.category && (
                          <span className="flex items-center">
                            <Tag size={12} className="mr-1" />
                            {post.category}
                          </span>
                        )}
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal; 