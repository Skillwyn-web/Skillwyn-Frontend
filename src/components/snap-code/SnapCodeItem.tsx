'use client';

import React, { useRef, useState, useEffect } from 'react';
import { SnapCode } from '@/types';
import { motion } from 'framer-motion';
import { CommentsModal } from './CommentsModal';

interface SnapCodeItemProps {
    item: SnapCode;
    isActive: boolean;
    isMuted: boolean;
    onToggleMute: () => void;
}

export function SnapCodeItem({ item, isActive, isMuted, onToggleMute }: SnapCodeItemProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isActive) {
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log('Autoplay prevent', e));
            }
        } else {
            if (videoRef.current) {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [isActive]);

    const [progress, setProgress] = useState(0);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            if (duration) {
                setProgress((current / duration) * 100);
            }
        }
    };

    const [interactions, setInteractions] = useState({
        likes: item.likes || 0,
        comments: item.comments || 0,
        shares: item.shares || 0,
        saves: item.saves || 0,
    });

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const liked = localStorage.getItem(`liked_${item.id}`);
        if (liked) setIsLiked(true);
    }, [item.id]);

    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    const handleCommentAdded = () => {
        setInteractions(prev => ({
            ...prev,
            comments: prev.comments + 1
        }));
    };

    const handleInteraction = async (action: 'like' | 'comment' | 'share' | 'save') => {
        if (action === 'like') {
            const newIsLiked = !isLiked;
            setIsLiked(newIsLiked);

            setInteractions(prev => ({
                ...prev,
                likes: prev.likes + (newIsLiked ? 1 : -1)
            }));

            if (newIsLiked) {
                localStorage.setItem(`liked_${item.id}`, 'true');
            } else {
                localStorage.removeItem(`liked_${item.id}`);
            }

            try {
                await fetch(`/api/snaps/${item.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: newIsLiked ? 'like' : 'unlike' }),
                });
            } catch (error) {
                console.error('Interaction error', error);
            }
            return;
        }

        setInteractions(prev => ({
            ...prev,
            [action === 'comment' ? 'comments' : action === 'share' ? 'shares' : 'saves']: prev[action === 'comment' ? 'comments' : action === 'share' ? 'shares' : 'saves'] + 1
        }));

        try {
            const res = await fetch(`/api/snaps/${item.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action }),
            });

            if (res.ok) {
                const updatedData = await res.json();
                setInteractions(prev => ({
                    ...prev,
                    comments: updatedData.comments,
                    shares: updatedData.shares,
                    saves: updatedData.saves,
                }));
            }
        } catch (error) {
            console.error('Interaction error', error);
        }
    };

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleMute();
    };

    return (
        <div className="relative w-full h-full bg-black [.light-theme_&]:bg-[#F7F4EA] flex items-center justify-center snap-center shrink-0 overflow-hidden transition-colors duration-300">
            {/* Video Container */}
            <div className="relative w-full h-full max-w-md mx-auto aspect-[9/16] bg-black shadow-2xl overflow-hidden" onClick={togglePlay}>
                <video
                    key={item.id}
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                >
                    <source src={item.videoUrl} type="video/mp4" />
                    <source src={item.videoUrl} type="video/webm" />
                    Your browser does not support the video tag.
                </video>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                    <motion.div
                        className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Play/Pause Overlay Indicator */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8 ml-1">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                        </motion.div>
                    </div>
                )}

                {/* Info & Actions Overlay */}
                <div className="absolute bottom-1 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-24 pb-8">
                    <div className="flex items-end justify-between">
                        <div className="flex-1 mr-14">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-0.5 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full">
                                    <img
                                        src={item.author.avatar}
                                        alt={item.author.name}
                                        className="w-10 h-10 rounded-full border-2 border-black object-cover"
                                    />
                                </div>
                                <div className="drop-shadow-sm">
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold text-white text-base">{item.author.username}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-400">
                                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-[10px] text-white/70 font-medium uppercase tracking-wider">Original Audio</p>
                                </div>
                            </div>
                            <p className="text-white text-sm leading-relaxed drop-shadow-md">
                                {item.caption} <span className="text-blue-400 font-semibold cursor-pointer">#code</span>
                            </p>
                        </div>

                        <div className="flex flex-col gap-5 items-center absolute right-3 bottom-16" onClick={(e) => e.stopPropagation()}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleInteraction('like')}
                                className="flex flex-col items-center gap-1 group"
                            >
                                <div className={`p-3 rounded-full transition-all duration-300 ${isLiked ? 'bg-red-500/20 shadow-lg shadow-red-500/20' : 'bg-black/20 backdrop-blur-md hover:bg-black/40'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={isLiked ? 0 : 2} stroke="currentColor" className={`w-7 h-7 transition-colors ${isLiked ? 'text-red-500' : 'text-white'}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </div>
                                <span className="text-xs font-bold text-white shadow-black drop-shadow-md">{interactions.likes}</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsCommentsOpen(true)}
                                className="flex flex-col items-center gap-1 group"
                            >
                                <div className="p-3 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                                        <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-xs font-bold text-white shadow-black drop-shadow-md">{interactions.comments}</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleInteraction('share')}
                                className="flex flex-col items-center gap-1 group"
                            >
                                <div className="p-3 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                                        <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-xs font-bold text-white shadow-black drop-shadow-md">{interactions.shares}</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleInteraction('save')}
                                className="flex flex-col items-center gap-1 group"
                            >
                                <div className="p-3 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                                        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-xs font-bold text-white shadow-black drop-shadow-md">{interactions.saves}</span>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mute Button */}
                <button
                    onClick={toggleMute}
                    className="absolute top-6 right-6 p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-colors z-20"
                >
                    {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    )}
                </button>

                <CommentsModal
                    isOpen={isCommentsOpen}
                    onClose={() => setIsCommentsOpen(false)}
                    snapId={item.id}
                    onCommentAdded={handleCommentAdded}
                />
            </div>
        </div>
    );
}
