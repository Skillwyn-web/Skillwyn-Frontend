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
    const [isMuted, setIsMuted] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [activeId, setActiveId] = useState<string>('');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSnaps = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }

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
    }, [user]);

    useEffect(() => {
        if (!activeId && snaps.length > 0) {
            setActiveId(snaps[0].id);
        }
    }, [snaps, activeId]);

    useEffect(() => {
        if (!user || snaps.length === 0) return;

        const options = {
            root: containerRef.current,
            threshold: 0.6,
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

        setTimeout(() => {
            const elements = document.querySelectorAll('.snap-code-item');
            elements.forEach(el => observer.observe(el));
        }, 100);

        return () => observer.disconnect();
    }, [snaps, user]);

    const handleNewSnap = (snap: SnapCode) => {
        setSnaps(prev => [snap, ...prev]);
        setActiveId(snap.id);
        setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-black transition-colors duration-300">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black px-4 text-white transition-colors duration-300">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-zinc-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold">Login Required</h2>
                <p className="mb-8 max-w-xs text-center font-medium text-zinc-400">Join SkillWyn to view, like, and share developer moments.</p>
                <Link
                    href="/login?next=/snap-code"
                    className="bg-white px-8 py-3 font-semibold text-black transition-all hover:bg-white/85"
                >
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black transition-colors duration-300">
            <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent [.light-theme_&]:from-black/10 pointer-events-none">
                <div className="flex items-center gap-3 pointer-events-auto">
                    <button
                        onClick={() => router.push('/')}
                        className="p-2 rounded-full bg-white/10 [.light-theme_&]:bg-black/5 hover:bg-white/20 [.light-theme_&]:hover:bg-black/10 backdrop-blur-md text-white [.light-theme_&]:text-zinc-900 transition-all group shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold text-white [.light-theme_&]:text-zinc-900 drop-shadow-md [.light-theme_&]:drop-shadow-none transition-colors">Snap Code</h1>
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
                        <SnapCodeItem
                            item={item}
                            isActive={activeId === item.id}
                            isMuted={isMuted}
                            onToggleMute={() => setIsMuted(prev => !prev)}
                        />
                    </div>
                ))}

                {isLoading && (
                    <div className="w-full h-full snap-center flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                )}

                {!isLoading && snaps.length === 0 && (
                    <div className="w-full h-full snap-center flex items-center justify-center bg-neutral-900 [.light-theme_&]:bg-white/50 text-neutral-500">
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
