// components/Header.js
import React from 'react';
import SearchBar from './SearchBar';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-black text-white p-4 border-b border-white flex-shrink-0">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-header text-4xl ml-2.5">BlogPostView</h1>
        <div className="flex-grow flex justify-center mx-8">
        <div className="flex space-x-6">
          <Link href="/" className="text-gray-500 hover:text-white transition duration-300">
            Home
          </Link>
          <Link href="/about" className="text-gray-500 hover:text-white transition duration-300">
            About
          </Link>
          <Link href="/contact" className="text-gray-500 hover:text-white transition duration-300">
            Contact
          </Link>
        </div>
        </div>
        <div className='flex items-center'>
          <SearchBar/>
        </div>
      </div>
    </header>
  );
};

export default Header;