import React, { useState } from 'react';
import { Channel, ChatMessage, User, AIPersona, CodeSnippet } from '../../types';
import { MessageItem } from './MessageItem';
import { MessageInput } from './MessageInput';
import { ThreadDrawer } from './ThreadDrawer';
import {
  Hash,
  Lock,
  Sparkles,
  Pin,
  Search,
  Filter,
  Users,
  Bot,
  Info,
  CheckCircle2,
  Terminal,
  Zap
} from 'lucide-react';

interface ChatViewProps {
  channel: Channel;
  messages: ChatMessage[];
  currentUser: User;
  onSendMessage: (
    content: string,
    codeSnippet?: CodeSnippet,
    persona?: AIPersona
  ) => void;
  selectedPersona: AIPersona | null;
  onSelectPersona: (p: AIPersona | null) => void;
  onTogglePin: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onAddReaction: (id: string, emoji: string) => void;
  onDeleteMessage: (id: string) => void;
  onAskAiToExplainCode: (code: string, language: string) => void;
  onSendThreadReply: (parentId: string, content: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  channel,
  messages,
  currentUser,
  onSendMessage,
  selectedPersona,
  onSelectPersona,
  onTogglePin,
  onToggleBookmark,
  onAddReaction,
  onDeleteMessage,
  onAskAiToExplainCode,
  onSendThreadReply,
}) => {
  const [activeThreadMessage, setActiveThreadMessage] = useState<ChatMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'code' | 'pinned' | 'ai'>('all');
  const [showPinnedBar, setShowPinnedBar] = useState(true);

  // Filter messages for current channel
  const channelMessages = messages.filter((m) => m.channelId === channel.id && !m.parentId);
  const pinnedMessages = channelMessages.filter((m) => m.isPinned);

  // Apply search & filter
  const filteredMessages = channelMessages.filter((m) => {
    if (searchQuery) {
      const matchContent = m.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSender = m.senderName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCode = m.codeSnippet?.code.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchContent && !matchSender && !matchCode) return false;
    }

    if (filterType === 'code') return !!m.codeSnippet;
    if (filterType === 'pinned') return m.isPinned;
    if (filterType === 'ai') return m.isAI;

    return true;
  });

  const getThreadReplies = (parentId: string) => {
    return messages.filter((m) => m.parentId === parentId);
  };

  return (
    <div className="flex-1 flex h-[calc(100vh-3rem)] overflow-hidden bg-[#0B0E14] transition-colors">
      {/* Main Chat Stream Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Channel Header */}
        <div className="h-11 px-3 border-b border-[#1E2638] flex items-center justify-between bg-[#0B0E14]">
          <div className="flex items-center space-x-2 truncate">
            {channel.type === 'private' ? (
              <Lock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            ) : channel.type === 'ai-assisted' ? (
              <Sparkles className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            ) : (
              <Hash className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            )}
            <span className="font-bold text-xs text-slate-200 truncate">
              {channel.name}
            </span>
            <span className="text-[11px] text-slate-400 font-normal hidden md:inline truncate">
              | {channel.description}
            </span>
          </div>

          {/* Quick Filter Bar */}
          <div className="flex items-center space-x-2">
            <div className="relative hidden sm:block">
              <Search className="w-3 h-3 text-slate-500 absolute left-2 top-2" />
              <input
                type="text"
                placeholder="Filter messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-7 pr-2 py-0.5 text-xs bg-[#111622] border border-[#1E2638] rounded text-slate-200 focus:outline-none w-32 lg:w-44 placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center bg-[#111622] p-0.5 rounded border border-[#1E2638] text-[11px] font-medium">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2 py-0.5 rounded ${
                  filterType === 'all'
                    ? 'bg-[#151C2C] font-bold text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('code')}
                className={`px-2 py-0.5 rounded ${
                  filterType === 'code'
                    ? 'bg-[#151C2C] font-bold text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setFilterType('ai')}
                className={`px-2 py-0.5 rounded ${
                  filterType === 'ai'
                    ? 'bg-[#151C2C] font-bold text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                AI
              </button>
            </div>
          </div>
        </div>


        {/* Pinned Messages Bar */}
        {showPinnedBar && pinnedMessages.length > 0 && (
          <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
            <div className="flex items-center space-x-2 truncate">
              <Pin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span className="font-bold">Pinned ({pinnedMessages.length}):</span>
              <span className="truncate">{pinnedMessages[0].content}</span>
            </div>
            <button
              onClick={() => setShowPinnedBar(false)}
              className="text-[10px] text-amber-600 dark:text-amber-400 font-bold hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                <Hash className="w-6 h-6 text-slate-400" />
              </div>
              <p className="font-bold text-sm text-slate-700 dark:text-slate-300">
                Welcome to #{channel.name}
              </p>
              <p className="text-xs max-w-sm mt-1">
                Start discussing implementation specs, share code snippets, or invoke AI Personas to review architecture.
              </p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <MessageItem
                key={msg.id}
                message={msg}
                currentUser={currentUser}
                onOpenThread={(m) => setActiveThreadMessage(m)}
                onTogglePin={onTogglePin}
                onToggleBookmark={onToggleBookmark}
                onAddReaction={onAddReaction}
                onDeleteMessage={onDeleteMessage}
                onAskAiToExplainCode={onAskAiToExplainCode}
              />
            ))
          )}
        </div>

        {/* Rich Input Bar */}
        <MessageInput
          onSendMessage={onSendMessage}
          selectedPersona={selectedPersona}
          onSelectPersona={onSelectPersona}
          channelName={channel.name}
        />
      </div>

      {/* Right-side Thread Drawer */}
      {activeThreadMessage && (
        <ThreadDrawer
          parentMessage={activeThreadMessage}
          threadReplies={getThreadReplies(activeThreadMessage.id)}
          currentUser={currentUser}
          onClose={() => setActiveThreadMessage(null)}
          onSendReply={onSendThreadReply}
          onAddReaction={onAddReaction}
        />
      )}
    </div>
  );
};
