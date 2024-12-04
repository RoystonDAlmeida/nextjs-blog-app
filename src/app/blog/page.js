'use client';

import { Raleway } from '@next/font/google';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SkeletonLoader from '../LoadingComponents/SkeletonLoader';
import 'react-loading-skeleton/dist/skeleton.css';
import Header from '../HomePage/Header';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import CustomH1 from '../BlogPost/components/CustomH1'; // Import your custom heading component
import CustomH2 from '../BlogPost/components/CustomH2'; // Import your custom H2 component
import CustomP from '../BlogPost/components/CustomP';   // Import your custom paragraph component
import '../BlogPost/components/styles.css'
import { format, parseISO } from 'date-fns';  // For parsing date(DD-mm-YYYY format)
import CommentSection from '../CommentSection';
import BlogComments from './BlogComments';
import Footer from '../HomePage/Footer';

const raleway = Raleway({ variable: '--font-raleway' });

export default function BlogPost() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      if (!postId) return;
      try {
        setIsLoading(true);
        const response = await fetch(`/api/posts?postId=${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchComments() {
      if (!postId) return;
      try {
        const response = await fetch(`/api/comments?postId=${postId}`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchPost();
    fetchComments(); // Fetch comments whenever postId changes
  }, [postId]);

  // Define custom components for MDX
  const components = {
    h1: CustomH1,
    h2: CustomH2,
    p: CustomP,
    // You can add more custom components here as needed
  };

  return (
    <div>
      <div className={raleway.variable}>
        <Header />
      </div>
      {isLoading ? (
        <div>
          <SkeletonLoader/>
        </div>
      ) : post ? (
        <>
        <div className="flex flex-col items-center mt-4">
        <div className="w-full flex justify-center">
          <Image 
            src={post.image.url}
            alt={post.title} 
            width={1000}
            height={200}
            quality={100}
            style={{ 
              width: '60%', 
              height: '200px', 
              objectFit: 'cover',
              imageRendering: 'crisp-edges'
            }}
            className="rounded-md"
          />
        </div>
        <div className="w-full mt-4 px-4">
          <hr/>
          <div className="w-full mt-8 max-w-2xl">
            <p className="text-sm text-white mb-4 italic hover:text-gray-600 transition-colors duration-300">
              Date: {format(parseISO(post.date), "EEEE, do MMMM yyyy")}
            </p>
            <p className="text-lg text-white leading-relaxed hover:text-gray-600 transition-colors duration-300">
              Description: {post.description}
            </p>
          </div>
          <div>
            <MDXRemote {...post.fullContent} components={components} /> {/* Rendering serialized MDX content with custom components */}
          </div>
          <hr/>
        </div>
      </div>
      <BlogComments comments={comments}/>
      <CommentSection post={post}/>
      </>
      ) : (
        <div>Post not found</div>
      )}
      <Footer/>
    </div>
  );
}
