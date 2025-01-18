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
                            const postDetails = await axios.get(`/api/posts/${post.id}`); // Use the correct API endpoint
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
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
            <h1 className="text-5xl font-extrabold text-center mb-12 tracking-wide font-serif">
                All Blog Posts
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post) => (
                    <Link to={`/post/${post.id}`} key={post.id}> {/* Use Next.js's Link for `href` */}
                        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:scale-105 hover:shadow-2xl transition-transform duration-300">
                            <div className="relative group">
                                {post.coverImageUrl ? (
                                    <img
                                        src={post.coverImageUrl}
                                        alt={post.title || 'Post Image'}
                                        className="w-full h-64 object-cover group-hover:grayscale-0 group-hover:scale-110 grayscale transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-64 bg-gray-700 flex items-center justify-center">
                                        <span className="text-gray-400">No Image Available</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-5">
                                <h2 className="text-2xl font-bold mb-4 text-white hover:text-gray-300 transition-colors duration-300">
                                    {post.title}
                                </h2>
                                <p className="text-gray-400 mb-4 line-clamp-3">
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
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
