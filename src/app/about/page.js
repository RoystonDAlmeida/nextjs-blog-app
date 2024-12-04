"use client";

import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";
import { useState } from 'react';

export default function about(){
    const [showMission, setShowMission] = useState(false);
    const [showStory, setShowStory] = useState(false);
    const [showHobbies, setShowHobbies] = useState(false);

    return(
        <div>
            <Header/>
            <div className="bg-black text-white p-6 rounded-lg h-1/2 mx-auto mt-2" style={{ marginTop: '10px',  marginLeft:'10px', marginRight:'10px' }}>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-6">About Me</h1>
                    <p className="mb-4 text-lg">
                        Hello! I'm <strong>Royston D'Almeida</strong>, a passionate blogger dedicated to sharing insights and stories that inspire and inform. 
                        Welcome to my little corner of the internet!
                    </p>
                
                <div className="border rounded-lg shadow-md mb-4">
                    <button 
                        onClick={() => setShowMission(!showMission)} 
                        className="w-full text-left p-4 bg-black hover:bg-gray-700 transition duration-200 font-mono text-green-400 text-2xl whitespace-nowrap"
                    >
                        <h2 className="text-xl font-semibold">My Mission</h2>
                    </button>
                    {showMission && (
                        <div className="p-4">
                            <p>
                                My mission is to create a space where ideas flow freely and knowledge is shared openly. 
                                I believe in the power of storytelling to connect people and foster understanding.
                            </p>
                        </div>
                    )}
                </div>

                <div className="border rounded-lg shadow-md mb-4">
                    <button 
                        onClick={() => setShowStory(!showStory)} 
                        className="w-full text-left p-4 bg-black hover:bg-gray-700 transition duration-200 font-mono text-green-400 text-2xl whitespace-nowrap"
                    >
                        <h2 className="text-xl font-semibold">My Story</h2>
                    </button>
                    {showStory && (
                        <div className="p-4">
                            <p>
                                I started this blog as a personal project. What began as a simple hobby has evolved into a passion for writing and connecting with readers around the world.
                            </p>
                            <p>
                                Through my experiences, I've learned that every story matters, and I strive to share perspectives that resonate with others.
                            </p>
                        </div>
                    )}
                </div>

                <div className="border rounded-lg shadow-md mb-4">
                    <button 
                        onClick={() => setShowHobbies(!showHobbies)} 
                        className="w-full text-left p-4 bg-black hover:bg-gray-700 transition duration-200 font-mono text-green-400 text-2xl whitespace-nowrap"
                    >
                        <h2 className="text-xl font-semibold">My Hobbies</h2>
                    </button>
                    {showHobbies && (
                        <div className="p-4">
                            <ul className="list-disc list-inside">
                                <li>📚 Reading books across various genres.</li>
                                <li>✈️ Traveling to explore new cultures and cuisines.</li>
                                <li>🎨 Engaging in creative projects like painting and photography.</li>
                                <li>💻 Coding and learning about new technologies.</li>
                            </ul>
                        </div>
                    )}
                </div>

                <p className="mt-6 text-lg">
                    Thank you for visiting my blog! I hope you find something that inspires you here. Feel free to reach out through the contact page if you have any questions or just want to say hi!
                </p>
            </div>
            </div>
            <Footer/>
        </div>
    );
}