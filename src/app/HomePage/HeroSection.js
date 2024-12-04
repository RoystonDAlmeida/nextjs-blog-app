// components/HeroSection.js
import Link from 'next/link';

export default function HeroSection() {
    return (
    <div className="bg-black text-white p-6 rounded-lg h-1/2 mx-auto mt-2 border-4 border-teal-300 shadow-lg shadow-teal-200/50 transition duration-300" style={{ marginTop: '10px',  marginLeft:'10px', marginRight:'10px' }}>
      <div className="flex flex-col items-center justify-center  text-white text-center p-6">
        <div className="inline-block max-w-fit"> {/* Reduced width to fit message */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to My Blog! 🌟
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Explore insights, stories, and inspiration from my journey. ✍️✨
          </p>
          <Link href='/blog/allPosts'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              View All Posts
          </button>
          </Link>
        </div>
      </div>
    </div>
    );
  }