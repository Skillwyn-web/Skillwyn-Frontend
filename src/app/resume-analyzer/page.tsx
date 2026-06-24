'use client';

import React, { useState } from 'react';
import { Upload, MessageCircle, BarChart3, FileText, Download } from 'lucide-react';

interface ResumeData {
  id: string;
  filename: string;
  resume: {
    summary: string;
    experience: string;
    projects: string;
    skills: string[];
    education: string;
    raw_text: string;
  };
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ResomeAnalyzerPage = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'ats' | 'score' | 'jd'>('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [atsReport, setAtsReport] = useState<any>(null);
  const [scoreReport, setScoreReport] = useState<any>(null);
  const [jdText, setJdText] = useState('');
  const [jdMatch, setJdMatch] = useState<any>(null);

  const API_BASE = 'http://localhost:8000';

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResumeFile(file);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      setResumeData(data);
      setChatHistory([]);
      setAtsReport(null);
      setScoreReport(null);
      setJdMatch(null);
    } catch (error) {
      alert(`Error uploading resume: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatMessage.trim() || !resumeData) return;

    const userMessage = chatMessage;
    setChatMessage('');
    setChatHistory([...chatHistory, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_id: resumeData.id,
          message: userMessage,
        }),
      });

      const data = await response.json();
      setChatHistory((prev) => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleATS = async () => {
    if (!resumeData) return;
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/ats_analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_id: resumeData.id }),
      });

      const data = await response.json();
      setAtsReport(data);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleScore = async () => {
    if (!resumeData) return;
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_id: resumeData.id }),
      });

      const data = await response.json();
      setScoreReport(data);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleJDMatch = async () => {
    if (!resumeData || !jdText.trim()) {
      alert('Please enter a job description');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/match_jd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_id: resumeData.id,
          jd_text: jdText,
        }),
      });

      const data = await response.json();
      setJdMatch(data);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    if (!resumeData) return;
    window.open(`${API_BASE}/export/${resumeData.id}.pdf`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Resume Analyzer</h1>
          <p className="text-slate-300">Upload your resume and get AI-powered feedback</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Upload & Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-4">Upload Resume</h2>

              {!resumeData ? (
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-slate-500 transition">
                  <input
                    type="file"
                    onChange={handleUpload}
                    accept=".pdf,.docx,.doc"
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="cursor-pointer block">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-300 font-medium">Click to upload</p>
                    <p className="text-slate-500 text-sm mt-1">PDF or DOCX files</p>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-700 rounded p-3">
                    <p className="text-sm text-slate-300">
                      <strong>File:</strong> {resumeData.filename}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="bg-slate-700 rounded p-3">
                      <p className="text-slate-300">
                        <strong>Summary:</strong>
                      </p>
                      <p className="text-slate-400 mt-1 line-clamp-3">{resumeData.resume.summary}</p>
                    </div>

                    <div className="bg-slate-700 rounded p-3">
                      <p className="text-slate-300">
                        <strong>Skills:</strong>
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {resumeData.resume.skills.slice(0, 5).map((skill, idx) => (
                          <span key={idx} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleExportPDF}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium flex items-center justify-center gap-2 transition"
                  >
                    <Download className="w-4 h-4" />
                    Export PDF
                  </button>

                  <label htmlFor="file-input" className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded font-medium text-center cursor-pointer transition block">
                    Upload New
                  </label>
                  <input
                    type="file"
                    onChange={handleUpload}
                    accept=".pdf,.docx,.doc"
                    className="hidden"
                    id="file-input"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right: Analysis & Chat */}
          <div className="lg:col-span-2">
            {!resumeData ? (
              <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
                <FileText className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-300 text-lg">Upload a resume to get started</p>
              </div>
            ) : (
              <>
                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-slate-800 p-2 rounded-lg border border-slate-700">
                  {['chat', 'ats', 'score', 'jd'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`flex-1 py-2 px-3 rounded font-medium transition ${
                        activeTab === tab
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {tab === 'chat' && <MessageCircle className="w-4 h-4 inline mr-1" />}
                      {tab === 'ats' && <BarChart3 className="w-4 h-4 inline mr-1" />}
                      {tab === 'score' && <BarChart3 className="w-4 h-4 inline mr-1" />}
                      {tab === 'jd' && <FileText className="w-4 h-4 inline mr-1" />}
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Chat Tab */}
                {activeTab === 'chat' && (
                  <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 h-96 flex flex-col">
                    <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                      {chatHistory.length === 0 && (
                        <p className="text-slate-400 text-center py-8">
                          Ask me anything about your resume!
                        </p>
                      )}
                      {chatHistory.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded ${
                            msg.role === 'user'
                              ? 'bg-blue-600 text-white ml-4'
                              : 'bg-slate-700 text-slate-100 mr-4'
                          }`}
                        >
                          {msg.content}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g., Improve my summary..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                        className="flex-1 bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none"
                      />
                      <button
                        onClick={handleChat}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition disabled:opacity-50"
                      >
                        {loading ? '...' : 'Send'}
                      </button>
                    </div>
                  </div>
                )}

                {/* ATS Tab */}
                {activeTab === 'ats' && (
                  <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                    <button
                      onClick={handleATS}
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium mb-4 disabled:opacity-50"
                    >
                      {loading ? 'Analyzing...' : 'Analyze ATS'}
                    </button>

                    {atsReport && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-slate-700 p-4 rounded">
                          <span className="font-semibold text-white">ATS Score</span>
                          <span className="text-2xl font-bold text-green-400">{atsReport.score}/100</span>
                        </div>

                        {atsReport.passed && atsReport.passed.length > 0 && (
                          <div>
                            <p className="text-green-400 font-medium mb-2">✓ Passed</p>
                            <ul className="space-y-1">
                              {atsReport.passed.map((item: string, idx: number) => (
                                <li key={idx} className="text-slate-300 text-sm">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {atsReport.warnings && atsReport.warnings.length > 0 && (
                          <div>
                            <p className="text-yellow-400 font-medium mb-2">⚠ Warnings</p>
                            <ul className="space-y-1">
                              {atsReport.warnings.map((item: string, idx: number) => (
                                <li key={idx} className="text-slate-300 text-sm">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {atsReport.issues && atsReport.issues.length > 0 && (
                          <div>
                            <p className="text-red-400 font-medium mb-2">✗ Issues</p>
                            <ul className="space-y-1">
                              {atsReport.issues.map((item: string, idx: number) => (
                                <li key={idx} className="text-slate-300 text-sm">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Score Tab */}
                {activeTab === 'score' && (
                  <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                    <button
                      onClick={handleScore}
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium mb-4 disabled:opacity-50"
                    >
                      {loading ? 'Scoring...' : 'Calculate Score'}
                    </button>

                    {scoreReport && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between bg-slate-700 p-4 rounded">
                          <span className="font-semibold text-white">Overall Score</span>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-blue-400">{scoreReport.overall_score}</div>
                            <div className="text-2xl font-bold text-yellow-400">{scoreReport.grade}</div>
                          </div>
                        </div>

                        {scoreReport.breakdown && (
                          <div className="space-y-2">
                            <p className="text-slate-300 font-medium mb-2">Breakdown:</p>
                            {Object.entries(scoreReport.breakdown).map(([key, value]: [string, any]) => (
                              <div key={key} className="flex justify-between bg-slate-700 p-2 rounded text-sm">
                                <span className="text-slate-300 capitalize">{key.replace(/_/g, ' ')}</span>
                                <span className="text-white font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {scoreReport.suggestions && scoreReport.suggestions.length > 0 && (
                          <div>
                            <p className="text-slate-300 font-medium mb-2">Suggestions:</p>
                            <ul className="space-y-1">
                              {scoreReport.suggestions.map((item: string, idx: number) => (
                                <li key={idx} className="text-slate-400 text-sm">
                                  • {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* JD Matching Tab */}
                {activeTab === 'jd' && (
                  <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                    <textarea
                      placeholder="Paste job description here..."
                      value={jdText}
                      onChange={(e) => setJdText(e.target.value)}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none mb-4 h-32"
                    />

                    <button
                      onClick={handleJDMatch}
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium mb-4 disabled:opacity-50"
                    >
                      {loading ? 'Matching...' : 'Match Against JD'}
                    </button>

                    {jdMatch && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between bg-slate-700 p-4 rounded">
                          <span className="font-semibold text-white">Match Score</span>
                          <span className="text-2xl font-bold text-green-400">{jdMatch.match_score}%</span>
                        </div>

                        {jdMatch.matched_keywords && jdMatch.matched_keywords.length > 0 && (
                          <div>
                            <p className="text-green-400 font-medium mb-2">Matched Keywords</p>
                            <div className="flex flex-wrap gap-2">
                              {jdMatch.matched_keywords.map((kw: string, idx: number) => (
                                <span key={idx} className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {jdMatch.missing_keywords && jdMatch.missing_keywords.length > 0 && (
                          <div>
                            <p className="text-red-400 font-medium mb-2">Missing Keywords</p>
                            <div className="flex flex-wrap gap-2">
                              {jdMatch.missing_keywords.slice(0, 10).map((kw: string, idx: number) => (
                                <span key={idx} className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResomeAnalyzerPage;
