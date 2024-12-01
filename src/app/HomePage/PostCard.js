import Image from 'next/image'; // Import next/image for optimized images
import { FaComment  } from 'react-icons/fa';

export function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000; // Difference in seconds
  
    if (diff < 60) {
      return `${Math.floor(diff)} seconds ago`;
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diff < 2592000) { // Less than 30 days
      const days = Math.floor(diff / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
}

export default function PostCard({post}){
    return (
        <div className="flex items-start">
          <Image 
            src={post.image.url}
            alt={post.title} 
            width={100}
            height={100}
            className="w-24 h-24 object-cover rounded-md mr-4"
          />
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent">{post.title}</h3>
            <p className="mt-2 text-lg text-gray-300 font-light leading-relaxed">{post.description}</p>
            <div className="flex items-center mt-1">
              <p className="text-sm text-gray-400">{formatDate(post.lastModified)}</p>
              <div className="flex items-center ml-4">
                <FaComment size={16} className="text-gray-400" />
                <span className="ml-1 text-gray-400">0</span>
              </div>
            </div>
          </div>
        </div>
    );
}