// components/GridPosts.js
import { useEffect, useState } from 'react';

export default function GridPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPosts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      setPosts([
        { id: 1, title: 'First Post', excerpt: 'This is the first post.' },
        { id: 2, title: 'Second Post', excerpt: 'This is the second post.' },
      ]);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-black text-white p-6 rounded-lg h-1/2 mx-auto mt-2">
      {loading ? (
        <div className="text-center">
          <p>Loading posts...</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}