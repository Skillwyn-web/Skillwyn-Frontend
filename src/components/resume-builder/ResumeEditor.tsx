"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import  html2canvas  from "html2canvas";
// import  jspdf  from "jspdf";

// --- TYPES ---
export type ResumeData = {
    personal: {
        fullName: string;
        email: string;
        phone: string;
        linkedin: string;
        github: string;
        website: string;
        summary: string;
    };
    education: {
        id: string;
        school: string;
        degree: string;
        graduation: string;
        gpa: string;
    }[];
    experience: {
        id: string;
        company: string;
        role: string;
        duration: string;
        description: string;
    }[];
    projects: {
        id: string;
        name: string;
        tech: string;
        link: string;
        description: string;
    }[];
    skills: string; // comma separated for simplicity in this demo
};

const initialResumeState: ResumeData = {
    personal: {
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        website: "",
        summary: "",
    },
    education: [],
    experience: [],
    projects: [],
    skills: "",
};

// --- SIMULATED AI ACTION ---
const simulateAIEnhance = async (text: string, type: 'summary' | 'bullet'): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (type === 'summary') {
                resolve(`Passionate software engineer with a proven track record in building scalable web applications. Expertise in React, Node.js, and Cloud Infrastructure. Dedicated to writing clean, maintainable code and solving complex algorithmic problems.`);
            } else {
                resolve(`• Engineered a high-performance microservices architecture reducing latency by 40%.\n• Collaborated with cross-functional teams to deliver key product features ahead of schedule.\n• Optimized database queries resulting in a 20% reduction in server load.`);
            }
        }, 1500);
    });
};

// --- COMPONENTS ---

const StepIndicator = ({ currentStep, steps }: { currentStep: number; steps: string[] }) => (
    <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {steps.map((step, idx) => (
            <div key={idx} className={`flex items-center ${idx <= currentStep ? 'text-white' : 'text-zinc-600'}`}>
                <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border
                    ${idx === currentStep ? 'bg-blue-600 border-blue-600' : idx < currentStep ? 'bg-green-600 border-green-600' : 'bg-transparent border-zinc-700'}
                `}>
                    {idx < currentStep ? '✓' : idx + 1}
                </div>
                <span className="ml-2 text-sm font-medium whitespace-nowrap mr-4">{step}</span>
            </div>
        ))}
    </div>
);

// --- PREVIEW TEMPLATES ---

const ModernTemplate = ({ data }: { data: ResumeData }) => (
    <div className="bg-white text-black p-8 h-full min-h-[1100px] shadow-lg text-sm font-sans">
        <header className="border-b-2 border-slate-800 pb-4 mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-wide text-slate-900">{data.personal.fullName || "Your Name"}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mt-3 text-slate-600 font-medium">
                {data.personal.email && <span>{data.personal.email}</span>}
                {data.personal.phone && <span>{data.personal.phone}</span>}
                {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
                {data.personal.github && <span>{data.personal.github}</span>}
                {data.personal.website && <span>{data.personal.website}</span>}
            </div>
        </header>

        <div className="grid grid-cols-1 gap-6">
            {data.personal.summary && (
                <section>
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider border-b border-slate-300 mb-2 text-xs">Professional Summary</h3>
                    <p className="text-sm text-slate-700 leading-relaxed text-justify">{data.personal.summary}</p>
                </section>
            )}

            {data.skills && (
                <section>
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider border-b border-slate-300 mb-2 text-xs">Technical Skills</h3>
                    <p className="text-sm text-slate-700">{data.skills}</p>
                </section>
            )}

            {data.experience.length > 0 && (
                <section>
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider border-b border-slate-300 mb-3 text-xs">Experience</h3>
                    <div className="space-y-4">
                        {data.experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-slate-900 text-[15px]">{exp.company}</h4>
                                    <span className="text-slate-500 text-xs">{exp.duration}</span>
                                </div>
                                <div className="text-slate-700 font-medium text-xs mb-1 italic">{exp.role}</div>
                                <p className="whitespace-pre-line text-slate-600 text-[13px] leading-snug pl-1 border-l-2 border-slate-100">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.projects.length > 0 && (
                <section>
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider border-b border-slate-300 mb-3 text-xs">Key Projects</h3>
                    <div className="space-y-4">
                        {data.projects.map(proj => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-slate-900 text-[15px]">{proj.name}</h4>
                                    {proj.link && <a href={proj.link} className="text-blue-600 text-xs hover:underline">{proj.link}</a>}
                                </div>
                                <div className="text-xs text-slate-500 mb-1 font-mono bg-slate-100 inline-block px-1 rounded">{proj.tech}</div>
                                <p className="whitespace-pre-line text-slate-600 text-[13px] leading-snug">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.education.length > 0 && (
                <section>
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider border-b border-slate-300 mb-3 text-xs">Education</h3>
                    <div className="space-y-3">
                        {data.education.map(edu => (
                            <div key={edu.id}>
                                <div className="flex justify-between font-bold text-slate-900 text-sm">
                                    <span>{edu.school}</span>
                                    <span className="text-slate-500 font-normal text-xs">{edu.graduation}</span>
                                </div>
                                <div className="text-slate-700 text-sm">{edu.degree}</div>
                                {edu.gpa && <div className="text-xs text-slate-500">GPA: {edu.gpa}</div>}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    </div>
);

const ClassicTemplate = ({ data }: { data: ResumeData }) => (
    <div className="bg-white text-black p-8 h-full min-h-[1100px] shadow-lg text-sm font-serif">
        <header className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personal.fullName || "Your Name"}</h1>
            <div className="flex justify-center flex-wrap gap-2 text-sm text-gray-700">
                {data.personal.email && <span>{data.personal.email}</span>}
                {data.personal.phone && <span> | {data.personal.phone}</span>}
                {data.personal.linkedin && <span> | LinkedIn</span>}
                {data.personal.github && <span> | GitHub</span>}
            </div>
        </header>

        <hr className="border-gray-300 mb-6" />

        {data.personal.summary && (
            <section className="mb-6">
                <h3 className="font-bold text-gray-900 uppercase text-sm mb-2">Summary</h3>
                <p className="text-gray-800 leading-relaxed text-justify">{data.personal.summary}</p>
            </section>
        )}

        {data.skills && (
            <section className="mb-6">
                <h3 className="font-bold text-gray-900 uppercase text-sm mb-2">Technical Skills</h3>
                <p className="text-gray-800">{data.skills}</p>
            </section>
        )}

        {data.experience.length > 0 && (
            <section className="mb-6">
                <h3 className="font-bold text-gray-900 uppercase text-sm mb-2">Professional Experience</h3>
                <div className="space-y-4">
                    {data.experience.map(exp => (
                        <div key={exp.id}>
                            <div className="flex justify-between font-bold text-gray-900">
                                <span>{exp.company}</span>
                                <span>{exp.duration}</span>
                            </div>
                            <div className="italic text-gray-700 mb-1">{exp.role}</div>
                            <p className="whitespace-pre-line text-gray-800 pl-4 border-l-2 border-gray-200">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {data.projects.length > 0 && (
            <section className="mb-6">
                <h3 className="font-bold text-gray-900 uppercase text-sm mb-2">Projects</h3>
                <div className="space-y-4">
                    {data.projects.map(proj => (
                        <div key={proj.id}>
                            <div className="flex justify-between font-bold text-gray-900">
                                <span>{proj.name}</span>
                            </div>
                            <div className="text-sm text-gray-600 mb-1">Stack: {proj.tech}</div>
                            <p className="whitespace-pre-line text-gray-800">{proj.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {data.education.length > 0 && (
            <section className="mb-6">
                <h3 className="font-bold text-gray-900 uppercase text-sm mb-2">Education</h3>
                <div className="space-y-2">
                    {data.education.map(edu => (
                        <div key={edu.id}>
                            <div className="flex justify-between font-bold text-gray-900">
                                <span>{edu.school}</span>
                                <span>{edu.graduation}</span>
                            </div>
                            <div className="text-gray-800">{edu.degree}</div>
                        </div>
                    ))}
                </div>
            </section>
        )}
    </div>
);


// --- EDITOR MAIN COMPONENT ---

export default function ResumeEditor({ initialData, onBack }: { initialData?: any; onBack: () => void }) {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<ResumeData>(initialData || initialResumeState);
    const [isGenerating, setIsGenerating] = useState(false);

    // Steps: 0=Personal, 1=Skills, 2=Work, 3=Project, 4=Education, 5=Finalize
    const steps = ["Personal", "Skills", "Experience", "Projects", "Education", "Download"];

    // Update Helpers
    const updatePersonal = (field: string, val: string) => {
        setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: val } }));
    };

    const handleAIGenerate = async (target: 'summary' | 'experience' | 'project', id?: string) => {
        setIsGenerating(true);
        if (target === 'summary') {
            const summary = await simulateAIEnhance(data.personal.summary, 'summary');
            updatePersonal('summary', summary);
        }
        // Logic for others omitted for brevity but follows same pattern
        setIsGenerating(false);
    };

    // --- RENDER FORMS ---
    const renderForm = () => {
        switch (step) {
            case 0: // Personal
                return (
                    <div className="space-y-4 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input placeholder="Full Name" className="bg-zinc-800 border-zinc-700 p-3 rounded text-white w-full"
                                value={data.personal.fullName} onChange={e => updatePersonal('fullName', e.target.value)} />
                            <input placeholder="Email" className="bg-zinc-800 border-zinc-700 p-3 rounded text-white w-full"
                                value={data.personal.email} onChange={e => updatePersonal('email', e.target.value)} />
                            <input placeholder="Phone" className="bg-zinc-800 border-zinc-700 p-3 rounded text-white w-full"
                                value={data.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} />
                            <input placeholder="LinkedIn URL" className="bg-zinc-800 border-zinc-700 p-3 rounded text-white w-full"
                                value={data.personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} />
                            <input placeholder="GitHub URL" className="bg-zinc-800 border-zinc-700 p-3 rounded text-white w-full"
                                value={data.personal.github} onChange={e => updatePersonal('github', e.target.value)} />
                            <input placeholder="Portfolio" className="bg-zinc-800 border-zinc-700 p-3 rounded text-white w-full"
                                value={data.personal.website} onChange={e => updatePersonal('website', e.target.value)} />
                        </div>
                        <div className="pt-4">
                            <label className="block text-sm text-zinc-400 mb-2">Professional Summary</label>
                            <textarea className="bg-zinc-800 border-zinc-700 p-3 rounded text-white w-full h-32"
                                value={data.personal.summary} onChange={e => updatePersonal('summary', e.target.value)} />
                            <button
                                onClick={() => handleAIGenerate('summary')}
                                disabled={isGenerating}
                                className="mt-2 text-sm flex items-center gap-2 text-purple-400 hover:text-purple-300"
                            >
                                <svg className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                {isGenerating ? 'Generating...' : 'Enhance with AI'}
                            </button>
                        </div>
                    </div>
                );
            case 1: // Skills
                return (
                    <div className="space-y-4 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">Skills</h2>
                        <textarea
                            placeholder="Languages, Frameworks, Tools (comma separated)"
                            className="bg-zinc-800 border-zinc-700 p-3 rounded text-white w-full h-48"
                            value={data.skills}
                            onChange={e => setData(prev => ({ ...prev, skills: e.target.value }))}
                        />
                        <p className="text-zinc-500 text-sm">Example: JavaScript, React, Node.js, Python, AWS, Docker</p>
                    </div>
                );
            case 2: // Experience
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Experience</h2>
                            <button
                                onClick={() => setData(prev => ({ ...prev, experience: [...prev.experience, { id: Date.now().toString(), company: '', role: '', duration: '', description: '' }] }))}
                                className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
                            >
                                + Add Job
                            </button>
                        </div>
                        {data.experience.map((exp, idx) => (
                            <div key={exp.id} className="bg-zinc-900 p-4 rounded border border-zinc-800">
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <input placeholder="Company" className="bg-zinc-800 p-2 rounded text-white"
                                        value={exp.company}
                                        onChange={e => {
                                            const newExp = [...data.experience];
                                            newExp[idx].company = e.target.value;
                                            setData(p => ({ ...p, experience: newExp }));
                                        }}
                                    />
                                    <input placeholder="Role" className="bg-zinc-800 p-2 rounded text-white"
                                        value={exp.role}
                                        onChange={e => {
                                            const newExp = [...data.experience];
                                            newExp[idx].role = e.target.value;
                                            setData(p => ({ ...p, experience: newExp }));
                                        }}
                                    />
                                    <input placeholder="Duration (e.g. Jan 2023 - Present)" className="bg-zinc-800 p-2 rounded text-white col-span-2"
                                        value={exp.duration}
                                        onChange={e => {
                                            const newExp = [...data.experience];
                                            newExp[idx].duration = e.target.value;
                                            setData(p => ({ ...p, experience: newExp }));
                                        }}
                                    />
                                </div>
                                <textarea placeholder="Description (Bullet points)" className="bg-zinc-800 p-2 rounded text-white w-full h-24"
                                    value={exp.description}
                                    onChange={e => {
                                        const newExp = [...data.experience];
                                        newExp[idx].description = e.target.value;
                                        setData(p => ({ ...p, experience: newExp }));
                                    }}
                                />
                                <button
                                    disabled={isGenerating}
                                    onClick={async () => {
                                        setIsGenerating(true);
                                        const enhanced = await simulateAIEnhance(exp.description, 'bullet');
                                        const newExp = [...data.experience];
                                        newExp[idx].description = enhanced;
                                        setData(p => ({ ...p, experience: newExp }));
                                        setIsGenerating(false);
                                    }}
                                    className="mt-2 text-xs flex items-center gap-2 text-purple-400 hover:text-purple-300"
                                >
                                    <svg className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    AI Polish
                                </button>
                            </div>
                        ))}
                    </div>
                );
            case 3: // Projects
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Projects</h2>
                            <button
                                onClick={() => setData(prev => ({ ...prev, projects: [...prev.projects, { id: Date.now().toString(), name: '', tech: '', link: '', description: '' }] }))}
                                className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
                            >
                                + Add Project
                            </button>
                        </div>
                        {data.projects.map((proj, idx) => (
                            <div key={proj.id} className="bg-zinc-900 p-4 rounded border border-zinc-800">
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <input placeholder="Project Name" className="bg-zinc-800 p-2 rounded text-white"
                                        value={proj.name}
                                        onChange={e => {
                                            const newProj = [...data.projects];
                                            newProj[idx].name = e.target.value;
                                            setData(p => ({ ...p, projects: newProj }));
                                        }}
                                    />
                                    <input placeholder="Tech Stack" className="bg-zinc-800 p-2 rounded text-white"
                                        value={proj.tech}
                                        onChange={e => {
                                            const newProj = [...data.projects];
                                            newProj[idx].tech = e.target.value;
                                            setData(p => ({ ...p, projects: newProj }));
                                        }}
                                    />
                                    <input placeholder="Link" className="bg-zinc-800 p-2 rounded text-white col-span-2"
                                        value={proj.link}
                                        onChange={e => {
                                            const newProj = [...data.projects];
                                            newProj[idx].link = e.target.value;
                                            setData(p => ({ ...p, projects: newProj }));
                                        }}
                                    />
                                </div>
                                <textarea placeholder="Description" className="bg-zinc-800 p-2 rounded text-white w-full h-24"
                                    value={proj.description}
                                    onChange={e => {
                                        const newProj = [...data.projects];
                                        newProj[idx].description = e.target.value;
                                        setData(p => ({ ...p, projects: newProj }));
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                );
            case 4: // Education
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Education</h2>
                            <button
                                onClick={() => setData(prev => ({ ...prev, education: [...prev.education, { id: Date.now().toString(), school: '', degree: '', graduation: '', gpa: '' }] }))}
                                className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
                            >
                                + Add School
                            </button>
                        </div>
                        {data.education.map((edu, idx) => (
                            <div key={edu.id} className="bg-zinc-900 p-4 rounded border border-zinc-800">
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <input placeholder="School / University" className="bg-zinc-800 p-2 rounded text-white"
                                        value={edu.school}
                                        onChange={e => {
                                            const newEdu = [...data.education];
                                            newEdu[idx].school = e.target.value;
                                            setData(p => ({ ...p, education: newEdu }));
                                        }}
                                    />
                                    <input placeholder="Degree" className="bg-zinc-800 p-2 rounded text-white"
                                        value={edu.degree}
                                        onChange={e => {
                                            const newEdu = [...data.education];
                                            newEdu[idx].degree = e.target.value;
                                            setData(p => ({ ...p, education: newEdu }));
                                        }}
                                    />
                                    <input placeholder="Graduation Year" className="bg-zinc-800 p-2 rounded text-white"
                                        value={edu.graduation}
                                        onChange={e => {
                                            const newEdu = [...data.education];
                                            newEdu[idx].graduation = e.target.value;
                                            setData(p => ({ ...p, education: newEdu }));
                                        }}
                                    />
                                    <input placeholder="GPA (Optional)" className="bg-zinc-800 p-2 rounded text-white"
                                        value={edu.gpa}
                                        onChange={e => {
                                            const newEdu = [...data.education];
                                            newEdu[idx].gpa = e.target.value;
                                            setData(p => ({ ...p, education: newEdu }));
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 5: // Finalize
                return (
                    <div className="text-center space-y-6 animate-fade-in py-12">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold">Resume Ready!</h2>
                        <p className="text-zinc-400 max-w-md mx-auto">
                            Your professional resume is ready. You can now download it as a PDF or continue editing.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => window.print()}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all"
                            >
                                Print / Save as PDF
                            </button>
                        </div>
                        <p className="text-xs text-zinc-600 mt-8">
                            * Use browser "Save to PDF" option in the print dialog.
                        </p>
                    </div>
                );
        }
    };

    const [template, setTemplate] = useState<'modern' | 'classic'>('modern');

    return (
        <div className="flex h-screen bg-[#09090b] text-white overflow-hidden">
            {/* Left Panel: EDITOR */}
            <div className="w-1/2 p-8 border-r border-zinc-800 overflow-y-auto print:hidden">
                <div className="max-w-xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={onBack} className="text-zinc-500 hover:text-white text-sm flex items-center gap-1">
                            ← Back to Home
                        </button>
                    </div>

                    <StepIndicator currentStep={step} steps={steps} />

                    <div className="min-h-[400px]">
                        {renderForm()}
                    </div>

                    <div className="flex justify-between mt-12 pt-8 border-t border-zinc-800">
                        <button
                            disabled={step === 0}
                            onClick={() => setStep(s => s - 1)}
                            className="px-6 py-2 rounded border border-zinc-700 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {step < steps.length - 1 && (
                            <button
                                onClick={() => setStep(s => s + 1)}
                                className="px-6 py-2 rounded bg-white text-black font-bold hover:bg-zinc-200"
                            >
                                Next Step
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Panel: PREVIEW */}
            <div className="w-1/2 bg-zinc-900 p-8 overflow-y-auto flex flex-col items-center justify-start gap-6 print:w-full print:p-0 print:absolute print:top-0 print:left-0 print:z-50 print:bg-white">

                {/* Simulated Template Picker (Floating) */}
                <div className="bg-zinc-800 p-1 rounded-lg inline-flex mb-2 print:hidden">
                    <button
                        onClick={() => setTemplate('modern')}
                        className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${template === 'modern' ? 'bg-black text-white shadow' : 'text-zinc-400 hover:text-white'}`}
                    >
                        Modern
                    </button>
                    <button
                        onClick={() => setTemplate('classic')}
                        className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${template === 'classic' ? 'bg-black text-white shadow' : 'text-zinc-400 hover:text-white'}`}
                    >
                        Classic
                    </button>
                </div>

                <div className="w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl transform scale-[0.6] origin-top md:scale-[0.75] xl:scale-[0.85] transition-transform print:scale-100 print:shadow-none print:transform-none">
                    {template === 'modern' ? <ModernTemplate data={data} /> : <ClassicTemplate data={data} />}
                </div>
            </div>
        </div>
    );
}
