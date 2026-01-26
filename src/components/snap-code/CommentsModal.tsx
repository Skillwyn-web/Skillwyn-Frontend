'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
    _id: string;
    text: string;
    author: string;
    avatar: string;
    createdAt: string;
}

interface CommentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    snapId: string;
}

export function CommentsModal({ isOpen, onClose, snapId }: CommentsModalProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && snapId) {
            fetchComments();
        }
    }, [isOpen, snapId]);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/snaps/${snapId}/comments`);
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (error) {
            console.error('Failed to fetch comments', error);
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const res = await fetch(`/api/snaps/${snapId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: newComment,
                    authorName: authorName || 'You'
                }),
            });

            if (res.ok) {
                const savedComment = await res.json();
                setComments(prev => [savedComment, ...prev]);
                setNewComment('');
            }
        } catch (error) {
            console.error('Failed to post comment', error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm sm:p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-neutral-900 border-t sm:border border-neutral-800 rounded-t-2xl sm:rounded-2xl w-full max-w-md h-[70vh] flex flex-col shadow-2xl overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
                            <h3 className="text-white font-bold text-lg">Comments</h3>
                            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-neutral-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Comments List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {isLoading ? (
                                <div className="text-center text-neutral-500 py-10">Loading comments...</div>
                            ) : comments.length === 0 ? (
                                <div className="text-center text-neutral-500 py-10">No comments yet. Be the first!</div>
                            ) : (
                                comments.map(comment => (
                                    <div key={comment._id} className="flex gap-3">
                                        <img
                                            src={comment.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}`}
                                            alt={comment.author}
                                            className="w-8 h-8 rounded-full bg-neutral-800 flex-shrink-0"
                                        />
                                        <div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-white font-semibold text-sm">{comment.author}</span>
                                                <span className="text-neutral-500 text-xs">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-neutral-300 text-sm mt-0.5">{comment.text}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-800 bg-neutral-900">
                            {/* Optional Name Input */}
                            <input
                                type="text"
                                placeholder="Your Name (optional)"
                                className="w-full bg-neutral-800 text-white rounded-lg p-2 text-sm border border-neutral-700 focus:border-blue-500 outline-none mb-2"
                                value={authorName}
                                onChange={e => setAuthorName(e.target.value)}
                            />
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="flex-1 bg-neutral-800 text-white rounded-lg p-3 text-sm border border-neutral-700 focus:border-blue-500 outline-none"
                                    value={newComment}
                                    onChange={e => setNewComment(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    disabled={!newComment.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
