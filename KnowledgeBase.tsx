import React, { useState } from 'react';
import { KnowledgeDoc } from '../../types';
import {
  BookOpen,
  Plus,
  Sparkles,
  Search,
  Tag,
  FileText,
  Edit3,
  Check,
  X,
  Share2,
  Cpu
} from 'lucide-react';

interface KnowledgeBaseProps {
  docs: KnowledgeDoc[];
  onAddDoc: (newDoc: Omit<KnowledgeDoc, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ docs, onAddDoc }) => {
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDoc>(docs[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAiModal, setShowAiModal] = useState(false);
  const [docPrompt, setDocPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredDocs = docs.filter((d) => {
    const matchesCategory = categoryFilter === 'all' || d.category === categoryFilter;
    const matchesQuery =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleGenerateAiDoc = async () => {
    if (!docPrompt.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/persona-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate an enterprise Architectural Decision Record (ADR) or Technical Specification document for topic: "${docPrompt}". Format as rich Markdown. Include Context, Decision, Consequences, Code Example in Java/Spring Boot or SQL, and Architecture diagram.`,
          actionType: 'generate_architecture',
        }),
      });

      const data = await res.json();
      if (data.reply) {
        const newDocObj: Omit<KnowledgeDoc, 'id' | 'createdAt' | 'updatedAt'> = {
          title: `ADR: ${docPrompt.slice(0, 40)}`,
          category: 'architecture',
          content: data.reply,
          authorName: 'Senior Architect AI',
          tags: ['AI-Generated', 'Architecture', 'ADR'],
          aiGenerated: true,
        };

        onAddDoc(newDocObj);
        setShowAiModal(false);
        setDocPrompt('');
      }
    } catch (err) {
      console.error('Error generating doc:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 flex h-[calc(100vh-3.5rem)] overflow-hidden bg-white dark:bg-slate-900 transition-colors">
      {/* Left Sidebar: Documents Tree (300px) */}
      <div className="w-80 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col h-full">
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
              Notion Knowledge Base
            </span>
          </div>
          <button
            onClick={() => setShowAiModal(true)}
            className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 transition-colors"
            title="Generate Doc with AI"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-3 space-y-2 border-b border-slate-200 dark:border-slate-800 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto text-[11px] font-medium pb-1">
            {['all', 'architecture', 'runbook', 'api-design'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2 py-0.5 rounded-md capitalize flex-shrink-0 ${
                  categoryFilter === cat
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Document List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredDocs.map((doc) => {
            const isSelected = selectedDoc?.id === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`w-full text-left p-2.5 rounded-xl transition-all text-xs ${
                  isSelected
                    ? 'bg-purple-500/15 border border-purple-500/30 text-purple-900 dark:text-purple-200 font-bold'
                    : 'hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-2 truncate mb-1">
                  <FileText className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                  <span className="truncate">{doc.title}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-normal">
                  <span>{doc.authorName}</span>
                  <span className="font-mono">{doc.updatedAt}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Main Document Reader & Editor */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {selectedDoc ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-4xl mx-auto w-full">
            {/* Header Title */}
            <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-300 font-mono text-[10px] font-bold uppercase border border-purple-500/20">
                  {selectedDoc.category}
                </span>
                {selectedDoc.aiGenerated && (
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 font-bold text-[10px] flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span>AI Generated ADR</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {selectedDoc.title}
              </h1>

              <div className="flex items-center space-x-4 mt-2 text-xs text-slate-400 font-medium">
                <span>Author: {selectedDoc.authorName}</span>
                <span>•</span>
                <span>Last Updated: {selectedDoc.updatedAt}</span>
              </div>
            </div>

            {/* Document Markdown Content Body */}
            <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed text-slate-800 dark:text-slate-200 space-y-3 font-sans whitespace-pre-wrap">
              {selectedDoc.content}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select a document to read or edit.
          </div>
        )}
      </div>

      {/* AI Doc Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Generate Architectural Spec / ADR with AI</span>
              </span>
              <button onClick={() => setShowAiModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Architecture Topic or Decision Context
              </label>
              <textarea
                value={docPrompt}
                onChange={(e) => setDocPrompt(e.target.value)}
                placeholder="e.g. Standardizing Spring Boot 3 & Java 21 Layered Architecture with Spring Security FilterChain and JPA EntityGraph..."
                rows={3}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateAiDoc}
                disabled={isGenerating || !docPrompt.trim()}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center space-x-1.5"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Drafting ADR...' : 'Generate Markdown Spec'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
