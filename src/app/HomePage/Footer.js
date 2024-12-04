// components/Footer.js
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import dotenv from 'dotenv';
dotenv.config();

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-4 border-t border-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex-grow text-center mb-4 md:mb-0">
          <p className="text-sm font-sans">© {new Date().getFullYear()} BlogPostView. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href={process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL} aria-label="GitHub" className="hover:text-blue-400" rel="noopener noreferrer" target="_blank">
            <FaGithub />
            </a>
          <a href={process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_URL} aria-label="LinkedIn" className="hover:text-blue-400" rel="noopener noreferrer" target="_blank">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}