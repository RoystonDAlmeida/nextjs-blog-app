// app/ContactPage/Contact.js
"use client";
import { useState } from 'react';
import Header from '../HomePage/Header';
import Footer from '../HomePage/Footer';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!name || !email || !message) {
            setResponseMessage('All fields are required.');
            setIsError(true);
            return;
        }

        // Simulate form submission (replace with actual API call)
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                setResponseMessage('Message submitted successfully!');
                setIsError(false);
                // Clear form fields after submission
                setName('');
                setEmail('');
                setMessage('');
            } else {
                throw new Error('Failed to submit message.');
            }
        } catch (error) {
            setResponseMessage('Failed to submit message.');
            setIsError(true);
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
                <p className="mb-6">Feel free to reach out with any questions or comments!</p>
                <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 text-black hover:border-blue-500 transition duration-200" 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 text-black hover:border-blue-500 transition duration-200" 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea 
                            id="message" 
                            rows={4} 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            required 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 text-black hover:border-blue-500 transition duration-200"
                        ></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">Send Message</button>
                </form>

                {responseMessage && (
                    <p className={`mt-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
                        {responseMessage}
                    </p>
                )}
            </div>
            <Footer />
        </>
    );
}
