import React from 'react';
import { TrendingUp, Hash } from 'lucide-react';

interface SearchSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ onSuggestionClick }) => {
  const popularSearches = [
    'engine tuning',
    'car maintenance',
    'performance parts',
    'racing tips',
    'classic cars',
    'electric vehicles',
    'turbocharging',
    'drift techniques'
  ];

  const trendingTopics = [
    'JDM culture',
    'engine swaps',
    'suspension setup',
    'brake systems',
    'aerodynamics',
    'fuel efficiency',
    'track days',
    'car shows'
  ];

  return (
    <div className="space-y-6">
      {/* Popular Searches */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <TrendingUp size={16} className="mr-2" />
          Popular Searches
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(search)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Hash size={16} className="mr-2" />
          Trending Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(topic)}
              className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm rounded-full transition-colors"
            >
              #{topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions; 