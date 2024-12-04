// BlogComment.js
import React from 'react';

const formatDate = (dateString) => {
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogComment = ({ comment, onAction }) => {
  return (
    <div className="bg-black text-white p-6 rounded-lg h-1/2 mx-auto mt-2" style={{ marginTop: '10px', marginLeft:'10px', marginRight:'10px' }}>
      <p className="text-white"><strong>{comment.name}, {comment.residence}</strong></p>
      <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
      <p className="text-gray-400">{comment.comment}</p>
      <div className="mt-2">
        <button onClick={() => onAction(comment.commentId, 'likes')} className="mr-2">
          👍 {comment.likes || 0}
        </button>
        <button onClick={() => onAction(comment.commentId, 'dislikes')}>
          👎 {comment.dislikes || 0}
        </button>
      </div>
    </div>
  );
};

export default BlogComment;
