import React from 'react';

// Icons
const RoadmapIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg> // Actually this is edit icon. Let's use a path icon.
);

const PathIcon = ({ className }: { className?: string }) => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
     <circle cx="6" cy="6" r="3" />
     <path d="M6 9v2a6 6 0 0 0 6 6 4 4 0 0 0 4-4" />
     <path d="M19 13a3 3 0 1 0-2.6-5" />
   </svg> 
); // A bit abstract but works for roadmap/path. 

const TerminalIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const FeaturesSection = () => {
    return (
        <section className="bg-black py-24 px-6 md:px-12 relative overflow-hidden">
             {/* Background Glows similar to Pricing Section */}
             <div className="absolute top-1/4 -left-12 h-64 w-64 rounded-full bg-blue-900/10 blur-[100px]" />
             <div className="absolute bottom-1/4 -right-12 h-64 w-64 rounded-full bg-purple-900/10 blur-[100px]" />

           <div className="max-w-7xl mx-auto relative z-10">
             <div className="mb-16">
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Everything you need to crack it.</h2>
               <p className="text-zinc-400 text-lg">From hello world to offer letter.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Roadmaps - Span 2 */}
                <div className="md:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden group hover:border-zinc-700 transition-colors">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                         <PathIcon className="w-48 h-48 text-white rotate-12" />
                    </div>
                    
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                             <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 border border-zinc-700">
                                <PathIcon className="w-5 h-5 text-gray-200" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Interactive Roadmaps</h3>
                            <p className="text-zinc-400 mb-6 max-w-sm">Detailed step-by-step guides for Frontend, Backend, DevOps, and AI. Don't just watch tutorials, follow a path.</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            <span className="bg-zinc-800 border border-zinc-700 text-xs text-gray-300 px-3 py-1 rounded-full">MERN</span>
                            <span className="bg-zinc-800 border border-zinc-700 text-xs text-gray-300 px-3 py-1 rounded-full">Java Spring</span>
                            <span className="bg-zinc-800 border border-zinc-700 text-xs text-gray-300 px-3 py-1 rounded-full">DevOps</span>
                        </div>
                    </div>
                </div>

                {/* Card 2: Practice - Span 1 */}
                <div className="md:col-span-1 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden group hover:border-zinc-700 transition-colors flex flex-col">
                     <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 border border-zinc-700">
                        <TerminalIcon className="w-5 h-5 text-gray-200" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">Practice Arena</h3>
                     <p className="text-zinc-400 mb-8 text-sm">Built-in IDE. 500+ curated DSA problems categorized by company tags.</p>
                     
                     {/* Code Mockup */}
                     <div className="mt-auto bg-black rounded-lg p-4 font-mono text-xs text-gray-300 border border-zinc-800 relative shadow-2xl">
                        <div className="absolute top-3 left-3 flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                        </div>
                        <div className="pt-4 space-y-1">
                            <div><span className="text-purple-400">const</span> <span className="text-blue-400">solve</span> = () ={'>'} {'{'}</div>
                            <div className="pl-4 text-zinc-500">// Write code here...</div>
                            <div>{'}'}</div>
                        </div>
                     </div>
                </div>

                {/* Card 3: Peer Learning - Span 1 */}
                 <div className="md:col-span-1 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden group hover:border-zinc-700 transition-colors flex flex-col">
                     <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 border border-zinc-700">
                        <UsersIcon className="w-5 h-5 text-gray-200" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">Peer Learning</h3>
                     <p className="text-zinc-400 mb-8 text-sm">Join study groups, code reviews, and weekly live doubt clearing sessions.</p>
                     
                     {/* Avatars Mockup */}
                     <div className="mt-auto flex -space-x-3 pl-2">
                        {[1, 2, 3].map((i) => (
                           <div key={i} className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center overflow-hidden">
                               <div className="w-full h-full bg-zinc-700/50 animate-pulse" />
                           </div> 
                        ))}
                         <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-xs text-zinc-400 font-medium">
                            +4k
                         </div>
                     </div>
                </div>

                {/* Card 4: Career Toolkit - Span 2 */}
                <div className="md:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden group hover:border-zinc-700 transition-colors">
                    <div className="grid md:grid-cols-2 gap-8 h-full">
                        <div className="flex flex-col h-full">
                            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 border border-zinc-700">
                                <BriefcaseIcon className="w-5 h-5 text-gray-200" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Career Toolkit</h3>
                            <p className="text-zinc-400">ATS-friendly resume builder and mock interview scheduler designed for tech roles.</p>
                        </div>
                        
                        <div className="relative self-end w-full">
                             <div className="bg-zinc-900 border border-zinc-800 rounded-t-xl p-4 w-full h-32 opacity-80 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                 {/* Simple lines mockup */}
                                 <div className="flex gap-4 items-center mb-4 border-b border-zinc-800 pb-4">
                                     <div className="w-10 h-10 rounded-full bg-zinc-800"></div>
                                     <div className="space-y-2 flex-1">
                                         <div className="h-2 w-1/3 bg-zinc-800 rounded"></div>
                                         <div className="h-2 w-1/4 bg-zinc-800 rounded"></div>
                                     </div>
                                 </div>
                                 <div className="space-y-2">
                                     <div className="h-2 w-full bg-zinc-800/50 rounded"></div>
                                     <div className="h-2 w-5/6 bg-zinc-800/50 rounded"></div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>

             </div>
           </div>
        </section>
    );
};

export default FeaturesSection;
