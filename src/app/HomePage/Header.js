// components/Header.js
import React from 'react';
import SearchBar from './SearchBar';
import { FaEnvelope } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-black text-white p-4 border-b border-white flex-shrink-0">
      <div className="container mx-auto flex justify-between items-center">
        <button className="flex items-center px-4 py-2 bg-black text-white border border-white rounded-md hover:bg-gray-700 transition duration-300">
          <FaEnvelope className="mr-2" />
        </button>
        <h1 className="font-header text-4xl ml-2.5">BlogPostView</h1>
        <div className="flex-grow flex justify-center mx-8">
        <div className="flex space-x-6">
          <a href="#" className="text-gray-500 hover:text-white transition duration-300">
            Home
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition duration-300">
            About
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition duration-300">
            Contact
          </a>
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