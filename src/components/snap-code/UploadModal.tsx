'use client';

import React, { useState } from 'react';
import { SnapCode } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNewSnap: (snap: SnapCode) => void;
}

export function UploadModal({ isOpen, onClose, onNewSnap }: UploadModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const [caption, setCaption] = useState('');
    const [authorName, setAuthorName] = useState('');

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('caption', caption);
            formData.append('authorName', authorName || 'You'); // Default to 'You' if empty

            // Simulate progress (since fetch doesn't give upload progress natively easily without XHR/Axios)
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) return prev;
                    return prev + 10;
                });
            }, 300);

            const res = await fetch('/api/snaps', {
                method: 'POST',
                body: formData,
            });

            clearInterval(progressInterval);
            setUploadProgress(100);

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Upload failed');
            }

            const newSnap = await res.json();

            setIsSuccess(true);
            onNewSnap(newSnap);

            setTimeout(() => {
                setIsSuccess(false);
                setFile(null);
                setCaption('');
                setAuthorName('');
                setUploadProgress(0);
                onClose();
            }, 1500);

        } catch (error: any) {
            console.error(error);
            setIsUploading(false);
            alert(error.message || 'Failed to upload snap. Please try again.');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-neutral-400 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-6">Upload Snap Code</h2>

                        {!isSuccess ? (
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-neutral-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept="video/mp4,video/webm,video/ogg,video/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                        </svg>
                                    </div>
                                    {file ? (
                                        <p className="text-white font-medium">{file.name}</p>
                                    ) : (
                                        <>
                                            <p className="text-white font-medium text-lg">Select Video</p>
                                            <p className="text-neutral-500 text-sm mt-2">MP4, WebM up to 10MB</p>
                                        </>
                                    )}
                                </div>

                                {file && !isUploading && (
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm text-neutral-400 block mb-1">Your Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your name"
                                                className="w-full bg-neutral-800 text-white rounded-lg p-3 border border-neutral-700 focus:outline-none focus:border-blue-500 mb-3"
                                                value={authorName}
                                                onChange={(e) => setAuthorName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-neutral-400 block mb-1">Caption</label>
                                            <textarea
                                                placeholder="Describe your code snap... #react #js"
                                                className="w-full bg-neutral-800 text-white rounded-lg p-3 border border-neutral-700 focus:outline-none focus:border-blue-500"
                                                rows={3}
                                                value={caption}
                                                onChange={(e) => setCaption(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            onClick={handleUpload}
                                            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
                                        >
                                            Upload Snap
                                        </button>
                                    </div>
                                )}

                                {isUploading && (
                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm text-neutral-400 mb-2">
                                            <span>Uploading...</span>
                                            <span>{uploadProgress}%</span>
                                        </div>
                                        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-blue-500"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white">Upload Successful!</h3>
                                <p className="text-neutral-400 mt-2">Your snap is now live.</p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
