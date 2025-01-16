import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch posts from the API
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/posts');
                setPosts(response.data.data);
            } catch (err) {
                setError('Failed to fetch posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <p className="text-center text-lg font-medium">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">All Blog Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div
                        className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
                        key={post.id}
                    >
                        <img
                            src={post.coverImage?.url || 'https://via.placeholder.com/300x200'}
                            alt={post.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-600">
                                By: {post.author?.name || 'Unknown Author'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
