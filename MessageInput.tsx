import React, { useState } from 'react';
import { AIPersona, CodeSnippet } from '../../types';
import { AI_PERSONAS } from '../../data/mockData';
import {
  Send,
  Code2,
  Sparkles,
  Paperclip,
  Bot,
  Wand2,
  X,
  FileCode,
  Check
} from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (
    content: string,
    codeSnippet?: CodeSnippet,
    persona?: AIPersona
  ) => void;
  selectedPersona: AIPersona | null;
  onSelectPersona: (persona: AIPersona | null) => void;
  channelName: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  selectedPersona,
  onSelectPersona,
  channelName,
}) => {
  const [content, setContent] = useState('');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState<CodeSnippet | undefined>(undefined);
  const [codeLanguage, setCodeLanguage] = useState('java');
  const [codeBody, setCodeBody] = useState('');
  const [codeFilename, setCodeFilename] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Gemini AI Feature Mode Toggles
  const [useLowLatency, setUseLowLatency] = useState(false);
  const [useHighThinking, setUseHighThinking] = useState(false);
  const [useGoogleSearch, setUseGoogleSearch] = useState(false);
  const [useGoogleMaps, setUseGoogleMaps] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim() && !codeSnippet) return;

    onSendMessage(content, codeSnippet, selectedPersona || undefined);
    setContent('');
    setCodeSnippet(undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleRephraseWithAI = async () => {
    if (!content.trim()) return;
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/ai/persona-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: content,
          persona: selectedPersona || AI_PERSONAS[0],
          channelName,
          actionType: 'rephrase_professionally',
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setContent(data.reply);
      }
    } catch (err) {
      console.error('Error rephrasing message with AI:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAttachCode = () => {
    if (!codeBody.trim()) return;
    setCodeSnippet({
      language: codeLanguage,
      code: codeBody,
      filename: codeFilename || undefined,
    });
    setShowCodeModal(false);
    setCodeBody('');
    setCodeFilename('');
  };

  return (
    <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      {/* Attached Code Preview Pill */}
      {codeSnippet && (
        <div className="mb-2 p-2 rounded-xl bg-slate-900 text-slate-100 flex items-center justify-between text-xs font-mono border border-slate-800">
          <div className="flex items-center space-x-2 truncate">
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span className="font-bold">{codeSnippet.filename || `snippet.${codeSnippet.language}`}</span>
            <span className="text-[10px] text-slate-400 uppercase">({codeSnippet.language})</span>
          </div>
          <button
            onClick={() => setCodeSnippet(undefined)}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Selected AI Persona Banner */}
      {selectedPersona && (
        <div className="mb-2 p-1.5 px-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-base">{selectedPersona.avatar}</span>
            <span className="font-bold text-purple-600 dark:text-purple-300">
              Active AI Persona: {selectedPersona.name} ({selectedPersona.roleTitle})
            </span>
          </div>
          <button
            onClick={() => onSelectPersona(null)}
            className="text-[10px] text-purple-500 font-semibold hover:underline"
          >
            Clear Persona
          </button>
        </div>
      )}

      {/* AI Feature Mode Toggles Toolbar */}
      <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
        <button
          type="button"
          onClick={() => {
            setUseLowLatency(!useLowLatency);
            if (!useLowLatency) setUseHighThinking(false);
          }}
          className={`px-2 py-0.5 rounded border transition-all ${
            useLowLatency
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
              : 'bg-[#151C2C] text-slate-400 border-[#1E2638] hover:bg-[#1f2a40]'
          }`}
        >
          ⚡ Low Latency (flash-lite)
        </button>

        <button
          type="button"
          onClick={() => {
            setUseHighThinking(!useHighThinking);
            if (!useHighThinking) setUseLowLatency(false);
          }}
          className={`px-2 py-0.5 rounded border transition-all ${
            useHighThinking
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
              : 'bg-[#151C2C] text-slate-400 border-[#1E2638] hover:bg-[#1f2a40]'
          }`}
        >
          🧠 High Thinking (pro-preview)
        </button>

        <button
          type="button"
          onClick={() => setUseGoogleSearch(!useGoogleSearch)}
          className={`px-2 py-0.5 rounded border transition-all ${
            useGoogleSearch
              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
              : 'bg-[#151C2C] text-slate-400 border-[#1E2638] hover:bg-[#1f2a40]'
          }`}
        >
          🔍 Google Search Grounding
        </button>

        <button
          type="button"
          onClick={() => setUseGoogleMaps(!useGoogleMaps)}
          className={`px-2 py-0.5 rounded border transition-all ${
            useGoogleMaps
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
              : 'bg-[#151C2C] text-slate-400 border-[#1E2638] hover:bg-[#1f2a40]'
          }`}
        >
          📍 Google Maps Grounding
        </button>
      </div>

      {/* Main Textarea Container */}
      <div className="rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-2 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all shadow-inner">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            selectedPersona
              ? `Ask ${selectedPersona.name} in #${channelName}...`
              : `Message #${channelName} (use @mention or select AI persona)...`
          }
          className="w-full bg-transparent text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none min-h-[50px] max-h-32"
          rows={2}
        />

        {/* Action Toolbar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center space-x-1">
            {/* Persona Quick Picker */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-[11px] font-semibold">
                  {selectedPersona ? selectedPersona.name : 'Select Persona'}
                </span>
              </button>

              <div className="absolute left-0 bottom-8 hidden group-hover:block w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl p-1 z-50">
                <p className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400">
                  Target AI Persona
                </p>
                {AI_PERSONAS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectPersona(p)}
                    className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs"
                  >
                    <span>{p.avatar}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Code Snippet Trigger */}
            <button
              type="button"
              onClick={() => setShowCodeModal(true)}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Attach Code Snippet"
            >
              <Code2 className="w-4 h-4 text-emerald-500" />
            </button>

            {/* Professional AI Rephrase Button */}
            <button
              type="button"
              onClick={handleRephraseWithAI}
              disabled={isAiLoading || !content.trim()}
              className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-300 text-[11px] font-semibold hover:bg-purple-500/20 disabled:opacity-50 transition-colors"
              title="AI Professional Polish"
            >
              <Wand2 className={`w-3.5 h-3.5 ${isAiLoading ? 'animate-spin' : ''}`} />
              <span>{isAiLoading ? 'Polishing...' : 'Polish Text'}</span>
            </button>
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={!content.trim() && !codeSnippet}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold text-xs transition-all shadow-md"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Code Attachment Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-indigo-500" />
                <span>Attach Syntax-Highlighted Code Snippet</span>
              </span>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Language
                </label>
                <select
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-slate-100"
                >
                  <option value="java">Java 21 / Spring Boot</option>
                  <option value="typescript">TypeScript / React</option>
                  <option value="sql">PostgreSQL / SQL</option>
                  <option value="dockerfile">Docker / YAML</option>
                  <option value="python">Python / Analytics</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Filename (Optional)
                </label>
                <input
                  type="text"
                  placeholder="SecurityConfig.java"
                  value={codeFilename}
                  onChange={(e) => setCodeFilename(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 text-xs">
                Code Content
              </label>
              <textarea
                value={codeBody}
                onChange={(e) => setCodeBody(e.target.value)}
                placeholder="Paste code here..."
                rows={8}
                className="w-full bg-slate-950 font-mono text-xs text-slate-100 p-3 rounded-xl border border-slate-800 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAttachCode}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
              >
                Attach Code Snippet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
