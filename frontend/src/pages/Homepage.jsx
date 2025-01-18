import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/posts');
                setPosts(response.data.docs); // Properly map the "docs" array
            } catch (err) {
                setError('Failed to fetch posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <p className="text-center text-lg font-medium text-gray-400">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-black text-white min-h-screen p-6">
            <h1 className="text-4xl font-bold text-center mb-8">All Blog Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <div
                        className="bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-700 hover:scale-105 transition-transform duration-300"
                        key={post.id}
                    >
                        <img
                            src={post.coverImage?.url || 'https://via.placeholder.com/300x200'}
                            alt={post.coverImage?.alt || post.title}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
                            <p className="text-gray-400 mb-2">
                                {post.body.root.children[0]?.children[0]?.text || 'No description available.'}
                            </p>
                            <p className="text-sm text-gray-500">
                                By: {post.author?.name || 'Unknown Author'}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                                Published: {new Date(post.publishDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
