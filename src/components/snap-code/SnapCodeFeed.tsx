'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SnapCode } from '@/types';
import { SnapCodeItem } from './SnapCodeItem';
import { UploadModal } from './UploadModal';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SnapCodeFeed() {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [snaps, setSnaps] = useState<SnapCode[]>([]);
    const [isMuted, setIsMuted] = useState(true); // Global mute state
    const [isLoading, setIsLoading] = useState(true);

    if (loading) {
        return (
            <div className="w-full h-full bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    // Redirect or show login if not authenticated
    // For better UX, we can show a lock screen
    if (!user) {
        return (
            <div className="w-full h-full bg-black flex flex-col items-center justify-center text-white px-4">
                <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-zinc-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-zinc-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Login Required</h2>
                <p className="text-zinc-400 text-center max-w-xs mb-8">Join Devpath to view, like, and share developer moments.</p>
                <Link
                    href="/login"
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20"
                >
                    Sign In
                </Link>
            </div>
        );
    }

    useEffect(() => {
        const fetchSnaps = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/snaps');
                if (res.ok) {
                    const newSnaps = await res.json();
                    setSnaps(newSnaps);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSnaps();
    }, []);

    const [activeId, setActiveId] = useState<string>('');

    // Update activeId when snaps load if it was empty
    useEffect(() => {
        if (!activeId && snaps.length > 0) {
            setActiveId(snaps[0].id);
        }
    }, [snaps, activeId]);

    // Intersection Observer to track active video
    const containerRef = useRef<HTMLDivElement>(null);

    // Re-run observer when snaps change to observe new elements
    useEffect(() => {
        const options = {
            root: containerRef.current,
            threshold: 0.6, // Trigger when 60% visible
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('data-id');
                    if (id) setActiveId(id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, options);

        // Timeout to ensure DOM is updated
        setTimeout(() => {
            const elements = document.querySelectorAll('.snap-code-item');
            elements.forEach(el => observer.observe(el));
        }, 100);

        return () => observer.disconnect();
    }, [snaps]); // Add snaps dependency

    const handleNewSnap = (snap: SnapCode) => {
        // Add new snap to the top using functional update to ensure latest state
        setSnaps(prev => [snap, ...prev]);

        // Set as active immediately
        setActiveId(snap.id);

        // Scroll to top with a slight delay to ensure render
        setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden">
            {/* ... (Top Bar) ... */}
            <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="flex items-center gap-3 pointer-events-auto">
                    <button
                        onClick={() => router.push('/')}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold text-white drop-shadow-md">Snap Code</h1>
                </div>
                {isAdmin && (
                    <button
                        onClick={() => setIsUploadOpen(true)}
                        className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-blue-600/80 backdrop-blur-md hover:bg-blue-600 text-white rounded-full font-medium transition-all shadow-lg shadow-blue-900/20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        New Snap
                    </button>
                )}
            </div>

            {/* Feed Container */}
            <div
                ref={containerRef}
                className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
                style={{ scrollBehavior: 'smooth' }}
                data-lenis-prevent
            >
                {snaps.map((item) => (
                    <div
                        key={item.id}
                        data-id={item.id}
                        className="snap-code-item w-full h-full snap-center"
                    >
                        {/* @ts-ignore */}
                        <SnapCodeItem
                            item={item}
                            isActive={activeId === item.id}
                            isMuted={isMuted}
                            onToggleMute={() => setIsMuted(prev => !prev)}
                        />
                    </div>
                ))}

                {/* Loading State */}
                {isLoading && (
                    <div className="w-full h-full snap-center flex items-center justify-center bg-black text-white">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                )}

                {/* Empty State / End of Feed */}
                {!isLoading && snaps.length === 0 && (
                    <div className="w-full h-full snap-center flex items-center justify-center bg-neutral-900 text-neutral-500">
                        <div className="text-center">
                            <p className="text-xl font-medium mb-2">No snaps yet</p>
                            <p className="text-sm">Upload a snap to start the feed.</p>
                        </div>
                    </div>
                )}
            </div>

            <UploadModal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onNewSnap={handleNewSnap}
            />
        </div>
    );
}
