import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Use `useRouter` if using Next.js
import axios from 'axios';

const PostPage = () => {
    const { id } = useParams(); // or `useRouter` for Next.js
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`);
                setPost(response.data);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to fetch the post.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <p className="text-center text-lg font-medium text-gray-400">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col">
            {/* Header */}
            <header className="bg-gray-900 py-2 shadow-md sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-lg font-bold text-white tracking-wide">
                        <a href="/" className="hover:text-gray-300 transition">
                            Welmnt
                        </a>
                    </h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <a
                                    href="/"
                                    className="text-sm font-medium text-gray-400 hover:text-white transition"
                                >
                                    Home
                                </a>
                            </li>

                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow px-6 py-12">
                <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-4xl font-extrabold mb-6 text-center">{post.title}</h1>
                    <div className="text-gray-400 text-lg leading-relaxed space-y-4">
                        {post.body?.root.children.map((paragraph, index) => (
                            <p key={index}>{paragraph.children[0]?.text || ''}</p>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-700">
                        <h3 className="text-2xl font-bold mb-2">About the Author</h3>
                        <p className="text-lg text-gray-300 font-medium">{post.author?.name || 'Unknown Author'}</p>
                        <p className="text-gray-400 mt-2">{post.author?.bio || 'No bio available.'}</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 py-3">
                <div className="container mx-auto text-center text-gray-500 text-sm px-4">
                    <p>&copy; {new Date().getFullYear()} Welmnt. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PostPage;
