import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Blogs: React.FC = () => {
  const carImages = [
    "https://cdn.motor1.com/images/mgl/2NAwyk/s3/2024-nissan-z-nismo.jpg",
    "https://static1.topspeedimages.com/wordpress/wp-content/uploads/2024/02/resize_manual-transmission-of-a-toyota-gr-corolla.jpg",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537",
    "https://images.unsplash.com/photo-1507136566006-cfc505b114fc",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
    "https://source.unsplash.com/400x200/?car,headlights",
  ];

  const BlogCard: React.FC<{ image: string }> = ({ image }) => (
    <div className="flex bg-white shadow-lg mb-6">
      <img src={image} alt="Car Blog" className="w-1/2 h-40 object-cover" />
      <div className="w-1/2 p-4">
        <h3 className="font-semibold">Name of the Blogs</h3>
        <p className="text-sm text-gray-600">Information of the Blogs</p>
        <button className="mt-4 px-4 py-1 bg-gray-600 text-white text-sm">
          Read more
        </button>
      </div>
    </div>
  );

  const Sidebar: React.FC = () => (
    <aside className="w-full lg:w-1/3 px-4 mt-10 lg:mt-0">
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Array(4).fill("name blog").map((cat, i) => (
            <div key={i} className="bg-gray-600 text-white text-center py-1">
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Latest Posts</h3>
        {Array(3).fill(null).map((_, i) => (
          <div key={i} className="mb-3">
            <h4 className="font-semibold text-sm">Name of the Blogs</h4>
            <p className="text-xs text-gray-600">Information of the Blogs</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Latest Posts</h3>
        {carImages.slice(0, 3).map((image, i) => (
          <div key={i} className="mb-3">
            <img src={image} alt="Sidebar Car" className="w-full h-24 object-cover mb-2" />
            <h4 className="font-semibold text-sm">Name of the Blogs</h4>
            <p className="text-xs text-gray-600">Information of the Blogs</p>
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
            <a href="#" className="hover:text-gray-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-400"><FaLinkedinIn /></a>
          </div>
        </div>
        <p className="text-center text-xs mt-4 text-gray-400">Copyright © 2025 - VAPD DASHSTREAM</p>
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
          <button className="bg-gray-600 text-white px-4 py-2 text-sm">Search</button>
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
          <BlogCard image={carImages[0]} />
          <BlogCard image={carImages[1]} />
          <div className="text-center">
            <button className="border px-4 py-1 text-sm mt-4">See All →</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {carImages.slice(2, 5).map((img, i) => (
              <div key={i}>
                <img src={img} alt={`Blog ${i}`} className="h-32 w-full object-cover mb-2" />
                <h4 className="font-semibold text-sm">Name of the Blogs</h4>
                <p className="text-xs text-gray-600">Information of the Blogs</p>
              </div>
            ))}
          </div>
        </main>

        <Sidebar />
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;
