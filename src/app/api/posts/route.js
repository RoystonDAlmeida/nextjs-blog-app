import fs from 'fs/promises';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { NextResponse } from 'next/server';
import matter from 'gray-matter';

export async function GET(request) {
  try {
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

        return {
          id: frontmatter.id || file.replace(/\.mdx$/, ''),
          title: frontmatter.title,
          date: frontmatter.date,
          description: frontmatter.description,
          image: frontmatter.image,
          fullContent: serializedContent,
          lastModified: lastModified // Add the last modified timestamp
        };
      })
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}
