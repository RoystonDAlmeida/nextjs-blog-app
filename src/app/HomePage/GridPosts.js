// components/GridPosts.js
import { useEffect, useState, useMemo } from 'react';
import {  FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PostCard from './PostCard';

export default function GridPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3; // Adjust based on your layout

  // Sort posts by lastModified in descending order (most recent first)
  const sortedPosts = useMemo(() => {
      return [...posts].sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
  }, [posts]);

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const currentPosts = useMemo(() => {
    const startIndex = currentPage * postsPerPage;
    return sortedPosts.slice(startIndex, startIndex + postsPerPage);
  }, [sortedPosts, currentPage, postsPerPage]);


  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts'); // Fetching data from your API
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-black text-white p-6 rounded-lg h-1/2 mx-auto mt-2">
      {loading ? (
        <div className="text-center">
          {/* Skeleton design for loading posts(Loading skeleton) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-300 animate-pulse rounded-lg h-24"></div>
            ))}
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center">
          <p>No posts as of now</p>
          <button className="bg-gray-500 text-white py-2 px-4 rounded mt-4" disabled>Previous</button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded mt-4" disabled>Next</button>
        </div>
      ) : (
        <div className="flex items-center">
        <button
          onClick={prevPage}
          className="p-2 bg-gray-800 text-white rounded-full mr-4 hover:bg-gray-700"
        >
          <FaChevronLeft />
        </button>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
          {currentPosts.map((post, index) => (
            <div key={index + 1} className="bg-black p-4 rounded-lg border-2 border-gray-400 transition-transform transform hover:scale-105 hover:border-white">
              <PostCard key={post.slug || post.id} post={post}/>
            </div>
          ))}
        </div>
  
        <button
          onClick={nextPage}
          className="p-2 bg-gray-800 text-white rounded-full ml-4 hover:bg-gray-700"
        >
          <FaChevronRight />
        </button>
      </div>
      )}
    </div>
  );
}