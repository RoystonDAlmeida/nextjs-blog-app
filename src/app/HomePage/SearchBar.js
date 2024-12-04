// app/HomePage/SearchBar.js
"use client";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // New state to track the current search term

    const handleSearch = useDebouncedCallback(async (term) => {
        setSearchTerm(term); // Update search term state
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('title', term);
            replace(`${pathname}?${params.toString()}`);

            // Fetch matching posts
            setLoading(true);
            try {
                const response = await fetch(`/api/posts?title=${term}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data); // Assuming posts are in data.data
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        } else {
            params.delete('title');
            replace(`${pathname}?${params.toString()}`);
            setSearchResults([]); // Clear results when input is empty
        }
    }, 300); // Debounce for 300ms

    return (
        <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg">
            <input
                type="text"
                placeholder="Search posts..."
                className="bg-gray-800 text-white placeholder-gray-500 rounded-lg p-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('title')?.toString()}
            />
            <span className="absolute right-2 text-gray-500">
                {/* Search Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l6 6m-6-6l-6 6" />
                </svg>
            </span>
            </div>
            {loading && 
                <div className="absolute z-10 bg-black text-white p-2 rounded-lg mt-1 w-full max-w-md animate-pulse">
                    {/* Visual suspense effect */}
                    <div className="h-1 bg-gray-600 rounded"></div>
                    <div className=" mt-1 h-2 w-1/2 bg-gray-700 rounded"></div>
                    <div className="mt-1 h-1 bg-gray-600 rounded"></div>
                </div>}
            {searchResults.length > 0 ? (
                <div className="absolute z-10 bg-black border rounded-lg shadow-lg mt-1 w-full max-w-md">
                    {searchResults.map(post => (
                    <React.Fragment key={post.id}> {/* Unique key for each fragment */}
                        <div key={post.id} className="p-2 hover:bg-gray-700 cursor-pointer">
                            <Link href={`/blog?postId=${post.id}`}>{post.title}</Link>
                        </div>
                         <div className="h-0.5 bg-white rounded"></div>
                    </React.Fragment>
                    ))}
                </div>
            ) : (
                !loading && searchTerm && searchResults.length === 0 && (
                    // Do this only, when not loading and no results exit
                    <div className="absolute z-10 bg-black border rounded-lg shadow-lg mt-1 w-full max-w-md p-2 text-center">
                        No Results Found
                    </div>
                )
            )}
        </div>
    );
}
