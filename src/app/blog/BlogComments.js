// BlogComments.js
import { useState, useEffect } from "react";
import BlogComment from './BlogComment'; // Import the new component

export default function BlogComments({comments: initialComments})
{
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const sortedComments = [...initialComments].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    setComments(sortedComments);
  }, [initialComments]);

  const handleAction = async (commentId, action) => {
    // Optimistically update the UI
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.commentId === commentId
          ? { ...comment, [action]: (parseInt(comment[action]) || 0) + 1 }
          : comment
      )
    );

    try {
      const response = await fetch('/api/comments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId, action }),
      });

      if (!response.ok) {
        // If the server request fails, revert the optimistic update
        setComments(prevComments =>
          prevComments.map(comment =>
            comment.commentId === commentId
              ? { ...comment, [action]: (parseInt(comment[action]) || 1) - 1 }
              : comment
          )
        );
        console.error('Failed to update like/dislike');
      }
    } catch (error) {
      // If there's an error, revert the optimistic update
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.commentId === commentId
            ? { ...comment, [action]: (parseInt(comment[action]) || 1) - 1 }
            : comment
        )
      );
      console.error('Error updating like/dislike:', error);
    }
  };

  return (
    <div>
      <div className="mt-8 ml-4 max-w-2xl">
        <h3 className="text-2xl font-bold mb-4 text-white">Comments on this Article</h3>
        <hr/>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <BlogComment key={index} comment={comment} onAction={handleAction} />
          ))
        ) : (
          <div className="bg-black text-white p-6 rounded-lg h-1/2 mx-auto mt-2" style={{ marginTop: '10px',  marginLeft:'10px', marginRight:'10px' }}>
            <p className="text-gray-400">No comments yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
