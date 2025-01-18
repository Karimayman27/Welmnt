import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('api/posts');
                console.log('API Response:', response.data);

                const postsWithImages = await Promise.all(
                    response.data.docs.map(async (post) => {
                        try {
                            const postDetails = await axios.get(`/api/posts/${post.id}`);
                            return {
                                ...post,
                                coverImageUrl: postDetails.data.coverImage
                                    ? `http://localhost:3000${postDetails.data.coverImage.url}`
                                    : null,
                            };
                        } catch (err) {
                            console.error(`Failed to fetch details for post ${post.id}:`, err);
                            return { ...post, coverImageUrl: null };
                        }
                    })
                );

                setPosts(postsWithImages);
            } catch (err) {
                console.error('Error fetching posts:', err);
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
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
            {/* Dynamic Header */}
            <header className="bg-gray-900 py-2 shadow-md sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-lg font-bold text-white tracking-wide">
                        <Link to="/" className="hover:text-gray-300 transition">
                            Welmnt
                        </Link>
                    </h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <Link
                                    to="/"
                                    className="text-sm font-medium text-gray-400 hover:text-white transition"
                                >
                                    Home
                                </Link>
                            </li>

                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto mt-6 px-4">
                <h1 className="text-3xl font-extrabold text-center mb-8 tracking-wide font-serif">
                    All Blog Posts
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link to={`/post/${post.id}`} key={post.id}>
                            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
                                <div className="relative group">
                                    {post.coverImageUrl ? (
                                        <img
                                            src={post.coverImageUrl}
                                            alt={post.title || 'Post Image'}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                                            <span className="text-gray-400">No Image Available</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-white hover:text-gray-300 transition-colors duration-300">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                                        {post.body.root.children[0]?.children[0]?.text || 'No description available.'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        By: {post.author?.name || 'Unknown Author'}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Published: {new Date(post.publishDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            {/* Dynamic Footer */}
            <footer className="bg-gray-900 py-3">
                <div className="container mx-auto text-center text-gray-500 text-sm px-4">
                    <p>&copy; {new Date().getFullYear()} Welmnt. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
