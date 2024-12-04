// blog/allPosts/page.js
"use client";

import Header from "@/app/HomePage/Header";
import Footer from "@/app/HomePage/Footer";
import { useState, useEffect, Suspense } from 'react';
import PostView from "../PostView";
import PostsViewSkeleton from "@/app/LoadingComponents/PostsViewSkeleton";

export default function PostsView()
{
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const postsPerPage = 10; // Number of posts per page

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            try {
                const response = await fetch(`/api/posts?page=${currentPage}&perPage=${postsPerPage}`);
                if (!response.ok) throw new Error('Failed to fetch posts');
                
                const data = await response.json();
                setPosts(data.data); // Assuming the posts are in data.data
                setTotalPages(data.meta.totalPages); // Assuming total pages are in meta.last_page
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, [currentPage]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    return (
        <>
            <Header/>
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold my-4">All Posts</h1>
                    {posts.map(post => (
                        <Suspense key={post.id} fallback={<PostsViewSkeleton />}>
                            <PostView post={post} />
                        </Suspense>
                    ))}
                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={setCurrentPage} 
                    />
            </div>
            <Footer/>
        </>
    );
}

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex justify-between mt-4">
            <button 
                onClick={handlePrevious} 
                disabled={currentPage === 1} 
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button 
                onClick={handleNext} 
                disabled={currentPage === totalPages} 
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}