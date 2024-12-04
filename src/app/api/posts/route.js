import fs from 'fs/promises';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { NextResponse } from 'next/server';
import matter from 'gray-matter';
import crypto from 'crypto';

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('postId');
  const titleSearch = url.searchParams.get('title'); // New title search parameter

  // Get pagination parameters
  const page = parseInt(url.searchParams.get('page')) || 1; // Default to page 1
  const perPage = parseInt(url.searchParams.get('perPage')) || 10; // Default to 10 posts per page

  try {

    if (id) {
      // If an ID is provided, fetch a single post
      const post = await getPostById(id);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }
    else{
      const postsDirectory = path.join(process.cwd(), 'blog-posts');
      const postFiles = await fs.readdir(postsDirectory);

      const posts = await Promise.all(
        postFiles.map(async (file) => {
          const filePath = path.join(postsDirectory, file);
          const fileContent = await fs.readFile(filePath, 'utf8');
          const { data: frontmatter, content } = matter(fileContent);
          const serializedContent = await serialize(content);

          // Get file stats to retrieve last modified time
          const stats = await fs.stat(filePath);
          const lastModified = stats.mtime.toISOString();

          // Generate a unique integer ID
          const id = generateUniqueIntegerId(file);

          return {
            id,
            title: frontmatter.title,
            date: frontmatter.date,
            description: frontmatter.description,
            image: frontmatter.image,
            fullContent: serializedContent,
            lastModified: lastModified // Add the last modified timestamp
          };
        })
    );

    // Step 1: Filter posts by title if titleSearch is provided
    let filteredPosts = posts;
    if (titleSearch) {
        filteredPosts = posts.filter(post =>
              post.title.toLowerCase().includes(titleSearch.toLowerCase())
        );
        return NextResponse.json(filteredPosts);
    }

    // Default behavior if no pagination parameters are provided
    if (!url.searchParams.has('page') && !url.searchParams.has('perPage')) {
      return NextResponse.json(posts); // Return all posts
    }

    // Calculate pagination
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / perPage); // Total pages based on perPage
    const startIndex = (page - 1) * perPage; // Starting index for slicing
    
    // Handle cases where startIndex exceeds totalPosts
    if (startIndex >= totalPosts) {
            return NextResponse.json({
              data: [],
              meta: {
                totalPosts,
                totalPages,
                currentPage: page,
              },
            });
          }
    
  const paginatedPosts = posts.slice(startIndex, startIndex + perPage); // Slice posts for current page
    
  return NextResponse.json({
      data: paginatedPosts,
      meta: {
        totalPosts,
        totalPages,
        currentPage: page,
      },
    });
  }
  } 
  
  catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }

}

// Function to generate a unique integer ID based on the filename
function generateUniqueIntegerId(filename) {
  // Create a hash of the filename
  const hash = crypto.createHash('md5').update(filename).digest('hex');
  
  // Convert the hash to a positive integer
  const hashNumber = parseInt(hash.substring(0, 8), 16);
  
  // Ensure the ID is positive and within a reasonable range
  return Math.abs(hashNumber);
}

async function getPostById(id) {
  const postsDirectory = path.join(process.cwd(), 'blog-posts');
  const postFiles = await fs.readdir(postsDirectory);

  for (const file of postFiles) {
    const filePath = path.join(postsDirectory, file);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    const generatedId = generateUniqueIntegerId(file);

    if (generatedId === parseInt(id)) {
      const serializedContent = await serialize(content);
      const stats = await fs.stat(filePath);
      const lastModified = stats.mtime.toISOString();

      return {
        id: generatedId,
        title: frontmatter.title,
        date: frontmatter.date,
        description: frontmatter.description,
        image: frontmatter.image,
        fullContent: serializedContent,
        lastModified: lastModified
      };
    }
  }

  return null; // Return null if no post with the given ID is found
}