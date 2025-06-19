import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`http://localhost:8000/api/posts/by-slug/${slug}/`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch post');
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setPost(null);
        setLoading(false);
      });
  }, [slug]);

  // Helper to get plain text from HTML
  const getPlainTextFromHtml = (html: string): string => {
    if (!html) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!post) return null;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-gray-900 bg-white rounded-lg shadow-lg mt-10">
      <Link to="/blogs" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Blogs</Link>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>By {post.author}</span>
        <span className="mx-2">|</span>
        <span>{new Date(post.created_at).toLocaleDateString()}</span>
        {post.category && <><span className="mx-2">|</span><span>{post.category}</span></>}
      </div>
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-80 object-cover rounded mb-8" />
      )}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default BlogPostDetail; 