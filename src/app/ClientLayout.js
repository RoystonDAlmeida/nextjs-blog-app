// app/ClientLayout.js
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from './LoadingComponents/LoadingSpinner';

export default function ClientLayout({ children }) {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const [isLoading, setIsLoading] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [spinnerFrame, setSpinnerFrame] = useState(0);

  useEffect(() => {
    async function fetchPost() {
      if (!postId) return;

      setIsLoading(true);
      try {
        const response = await fetch(`/api/posts?postId=${postId}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        const postData = await response.json();
        setPostTitle(postData.title);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

  // Spinner animation in title
  useEffect(() => {
    if (!isLoading) {
      document.title = postTitle || 'BlogPostView';
      return;
    }

    const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    const intervalId = setInterval(() => {
      setSpinnerFrame((prevFrame) => (prevFrame + 1) % spinnerChars.length);
    }, 100);

    return () => clearInterval(intervalId);
  }, [isLoading, postTitle]);

  // Update the document title with spinner
  useEffect(() => {
    if (isLoading) {
      const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
      document.title = `${spinnerChars[spinnerFrame]} ${postTitle || 'Loading...'}`;
    }
  }, [isLoading, spinnerFrame, postTitle]);

  return (
    <header>
      {isLoading && <LoadingSpinner />}
      {children}
    </header>
  );
}
