import React, { useState, useEffect } from 'react';
import { ChatMessage, Task, KnowledgeDoc, User } from '../types';
import { Search, X, MessageSquare, Kanban, BookOpen, User as UserIcon } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  tasks: Task[];
  docs: KnowledgeDoc[];
  users: User[];
  onSelectResult: (type: 'message' | 'task' | 'doc', item: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  messages,
  tasks,
  docs,
  users,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          /* Trigger search open handled higher up */
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedMessages = messages.filter((m) =>
    m.content.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const matchedTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.key.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const matchedDocs = docs.filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase()) ||
    d.content.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 z-50">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl p-4 shadow-2xl space-y-3">
        {/* Search Input Bar */}
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-indigo-500" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search platform messages, Jira tasks, Notion docs..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto space-y-4 text-xs">
          {query && (
            <>
              {/* Messages */}
              {matchedMessages.length > 0 && (
                <div>
                  <p className="font-bold text-[10px] uppercase text-slate-400 mb-1 flex items-center space-x-1">
                    <MessageSquare className="w-3 h-3 text-indigo-500" />
                    <span>Chat Messages ({matchedMessages.length})</span>
                  </p>
                  <div className="space-y-1">
                    {matchedMessages.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          onSelectResult('message', m);
                          onClose();
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 space-y-0.5"
                      >
                        <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-slate-100">
                          <span>{m.senderName}</span>
                          <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 truncate">{m.content}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {matchedTasks.length > 0 && (
                <div>
                  <p className="font-bold text-[10px] uppercase text-slate-400 mb-1 flex items-center space-x-1">
                    <Kanban className="w-3 h-3 text-sky-500" />
                    <span>Jira Tasks ({matchedTasks.length})</span>
                  </p>
                  <div className="space-y-1">
                    {matchedTasks.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onSelectResult('task', t);
                          onClose();
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <span className="font-mono font-bold text-indigo-500 mr-2">{t.key}</span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{t.title}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {t.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Notion Docs */}
              {matchedDocs.length > 0 && (
                <div>
                  <p className="font-bold text-[10px] uppercase text-slate-400 mb-1 flex items-center space-x-1">
                    <BookOpen className="w-3 h-3 text-purple-500" />
                    <span>Notion Docs ({matchedDocs.length})</span>
                  </p>
                  <div className="space-y-1">
                    {matchedDocs.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          onSelectResult('doc', d);
                          onClose();
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <p className="font-bold text-slate-900 dark:text-slate-100">{d.title}</p>
                        <p className="text-[10px] text-slate-400">{d.authorName}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {!query && (
            <div className="p-6 text-center text-slate-400 text-xs">
              Type to search across messages, Jira task backlogs, or Notion documents...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
