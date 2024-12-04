"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CommentSection = ({ post }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [residence, setResidence] = useState('');
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({}); // State for validation errors
  const router = useRouter();

  const maxCommentLength = 500; // Set your desired character limit

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required.';
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!comment) newErrors.comment = 'Comment is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Get postId from the post prop
    const postId = post.id; // Assuming post has an id property

    try {
      const response = await fetch(`/api/comments?postId=${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, residence, comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const data = await response.json();
      setSuccessMessage(data.message); // Set success message
      // Refresh the page
      router.refresh();

      // Clear form fields
      setName('');
      setEmail('');
      setResidence('');
      setComment('');
      setErrors({});
      
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message); // Set error message
    }
  };

  return (
    <div className="mt-8 ml-4 max-w-2xl">
      <h3 className="text-2xl font-bold mb-4 text-white">Leave a Comment</h3>
      
      {/* Display success or error messages */}
      {successMessage && <div className="bg-green-500 text-white p-2 rounded">{successMessage}</div>}
      {errorMessage && <div className="bg-red-500 text-white p-2 rounded">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black ${
              errors.name ? 'border-red-500' : ''
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="residence" className="block text-sm font-medium text-white">Place of Residence</label>
          <input
            type="text"
            id="residence"
            value={residence}
            onChange={(e) => setResidence(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black`}
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-white">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (errors.comment) setErrors({ ...errors, comment: null });
            }}
            maxLength={maxCommentLength}
            required
            rows={4}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black ${
              errors.comment ? 'border-red-500' : ''
            }`}
          />
          {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment}</p>}
          <p className="text-sm text-gray-400 mt-1">
            {comment.length}/{maxCommentLength} characters
          </p>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
