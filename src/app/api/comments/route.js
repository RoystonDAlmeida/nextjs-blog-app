// app/api/comments/route.js (or .ts for TypeScript)

import { createClient } from 'redis';
import { NextResponse } from 'next/server';

// Create a Redis client
const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis() {
    await client.connect(); // Ensure the client is connected
  }
  
connectRedis().catch(console.error);

// New function to handle comment count
async function handleGetCommentCount(postId) {
  if (!postId) {
    throw new Error('postId is required.');
  }

  const keys = await client.keys('comment:*');
  let count = 0;

  for (const key of keys) {
    const commentData = await client.hGetAll(key);
    if (commentData.postId === postId) {
      count++;
    }
  }

  return count;
}


// Handle POST requests
export async function POST(req) {
    const url = new URL(req.url); // Create a URL object from the request URL
    const postId = url.searchParams.get('postId'); // Get postId from query parameters

  const { name, email, residence, comment } = await req.json(); // Parse JSON body

  // Simple validation
  if (!name || !email || !comment) {
    return NextResponse.json({ error: 'Name, email, and comment are required.' }, { status: 400 });
  }

  // Store the comment in Redis
  const commentId = `comment:${Date.now()}`; // Unique ID for each comment using timestamp
  const commentData = {
    commentId,
    name,
    email,
    residence,
    comment,
    postId,
    createdAt: new Date().toISOString(),
  };

  await client.hSet(commentId, commentData); // Store as hash

  // Send back a success response
  return NextResponse.json({ message: 'Comment submitted successfully!' }, { status: 200 });
}

export async function GET(req) {
    const url = new URL(req.url);
    const postId = url.searchParams.get('postId');

    const countOnly = url.searchParams.get('countOnly') === 'true';
  
    if (!postId) {
      return NextResponse.json({ error: 'postId is required.' }, { status: 400 });
    }

    if (countOnly) {
      try {
        const count = await handleGetCommentCount(postId);
        return NextResponse.json({ count });
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }
  
    // Fetch all comments related to the postId
    const keys = await client.keys('comment:*'); // Get all comment keys
    const comments = [];
  
    for (const key of keys) {
      const commentData = await client.hGetAll(key);
      if (commentData.postId === postId) {
        // Convert likes and dislikes to numbers
        commentData.likes = parseInt(commentData.likes || '0', 10);
        commentData.dislikes = parseInt(commentData.dislikes || '0', 10);
        comments.push(commentData);
      }
    }
  
    return NextResponse.json(comments); // Return all comments for the specific postId
  }

  export async function PUT(req) {
    const { commentId, action } = await req.json();
  
    if (!commentId || !action) {
      return NextResponse.json({ error: 'commentId and action are required.' }, { status: 400 });
    }
  
    const comment = await client.hGetAll(commentId);
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found.' }, { status: 404 });
    }
  
    let updatedValue;
    if (action === 'likes') {
      updatedValue = parseInt(comment.likes || '0', 10) + 1;
      await client.hSet(commentId, 'likes', updatedValue.toString());
    } else if (action === 'dislikes') {
      updatedValue = parseInt(comment.dislikes || '0', 10) + 1;
      await client.hSet(commentId, 'dislikes', updatedValue.toString());
    } else {
      return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
    }
  
    // Fetch the updated comment data
    const updatedComment = await client.hGetAll(commentId);
  
    return NextResponse.json({ 
      message: 'Action recorded successfully.',
      comment: updatedComment
    }, { status: 200 });
  }
  