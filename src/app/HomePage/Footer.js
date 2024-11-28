// components/Footer.js
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-4 border-t border-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex-grow text-center mb-4 md:mb-0">
          <p className="text-sm font-sans">© {new Date().getFullYear()} My Blog. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" aria-label="GitHub" className="hover:text-blue-400">
            <FaGithub />
            </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-400">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}