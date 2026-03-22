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
    onCommentAdded?: () => void;
}

export function CommentsModal({ isOpen, onClose, snapId, onCommentAdded }: CommentsModalProps) {
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
                if (onCommentAdded) onCommentAdded();
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
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 [.light-theme_&]:bg-[#00000040] backdrop-blur-sm sm:p-4 transition-colors duration-300"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-neutral-900 [.light-theme_&]:bg-white border-t sm:border border-neutral-800 [.light-theme_&]:border-black/5 rounded-t-2xl sm:rounded-2xl w-full max-w-md h-[70vh] flex flex-col shadow-2xl overflow-hidden transition-colors duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-neutral-800 [.light-theme_&]:border-black/5 flex justify-between items-center bg-neutral-950/20 [.light-theme_&]:bg-neutral-50/50">
                            <h3 className="text-white [.light-theme_&]:text-zinc-900 font-bold text-lg">Comments</h3>
                            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 [.light-theme_&]:hover:bg-black/5 text-neutral-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Comments List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-neutral-800 [.light-theme_&]:scrollbar-thumb-neutral-200">
                            {isLoading ? (
                                <div className="text-center text-neutral-500 py-10 flex flex-col items-center gap-2">
                                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                    <span className="text-sm font-medium">Loading comments...</span>
                                </div>
                            ) : comments.length === 0 ? (
                                <div className="text-center text-neutral-500 py-10 flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 bg-neutral-800 [.light-theme_&]:bg-neutral-100 rounded-full flex items-center justify-center text-xl">💬</div>
                                    <div>
                                        <p className="font-semibold text-neutral-400 [.light-theme_&]:text-neutral-500">No comments yet</p>
                                        <p className="text-xs">Be the first to share your thoughts!</p>
                                    </div>
                                </div>
                            ) : (
                                comments.map(comment => (
                                    <div key={comment._id} className="flex gap-3 items-start group">
                                        <img
                                            src={comment.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}`}
                                            alt={comment.author}
                                            className="w-9 h-9 rounded-full bg-neutral-800 [.light-theme_&]:bg-neutral-100 flex-shrink-0 border border-black/5"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="text-white [.light-theme_&]:text-zinc-900 font-bold text-sm truncate">{comment.author}</span>
                                                <span className="text-neutral-500 text-[10px] font-medium">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-neutral-300 [.light-theme_&]:text-zinc-600 text-[13px] leading-relaxed bg-neutral-800/50 [.light-theme_&]:bg-neutral-50 p-2.5 rounded-xl rounded-tl-none border border-white/5 [.light-theme_&]:border-black/5">
                                                {comment.text}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-800 [.light-theme_&]:border-black/10 bg-neutral-900 [.light-theme_&]:bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
                            <input
                                type="text"
                                placeholder="Your Name (optional)"
                                className="w-full bg-neutral-800 [.light-theme_&]:bg-neutral-50 text-white [.light-theme_&]:text-zinc-900 rounded-lg p-3 text-sm border border-neutral-700 [.light-theme_&]:border-black/10 focus:ring-1 focus:ring-blue-500 outline-none mb-3 transition-all"
                                value={authorName}
                                onChange={e => setAuthorName(e.target.value)}
                            />
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="flex-1 bg-neutral-800 [.light-theme_&]:bg-neutral-50 text-white [.light-theme_&]:text-zinc-900 rounded-lg p-3 text-sm border border-neutral-700 [.light-theme_&]:border-black/10 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                    value={newComment}
                                    onChange={e => setNewComment(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    disabled={!newComment.trim()}
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/20"
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
