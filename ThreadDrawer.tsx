import React, { useState } from 'react';
import { ChatMessage, User } from '../../types';
import { MessageItem } from './MessageItem';
import { X, Send, CornerDownRight, MessageSquare } from 'lucide-react';

interface ThreadDrawerProps {
  parentMessage: ChatMessage | null;
  threadReplies: ChatMessage[];
  currentUser: User;
  onClose: () => void;
  onSendReply: (parentId: string, content: string) => void;
  onAddReaction: (messageId: string, emoji: string) => void;
}

export const ThreadDrawer: React.FC<ThreadDrawerProps> = ({
  parentMessage,
  threadReplies,
  currentUser,
  onClose,
  onSendReply,
  onAddReaction,
}) => {
  const [replyText, setReplyText] = useState('');

  if (!parentMessage) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onSendReply(parentMessage.id, replyText);
    setReplyText('');
  };

  return (
    <div className="w-96 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full shadow-2xl z-30 transition-all">
      {/* Thread Header */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-indigo-500" />
          <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
            Discussion Thread
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Parent Message & Replies Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Parent Message Frame */}
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
          <MessageItem
            message={parentMessage}
            currentUser={currentUser}
            onOpenThread={() => {}}
            onTogglePin={() => {}}
            onToggleBookmark={() => {}}
            onAddReaction={onAddReaction}
            onDeleteMessage={() => {}}
          />
        </div>

        <div className="flex items-center space-x-2 my-2">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          <span className="text-[10px] font-bold uppercase text-slate-400">
            {threadReplies.length} Replies
          </span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Thread Replies */}
        <div className="space-y-3 pl-2">
          {threadReplies.map((reply) => (
            <div key={reply.id} className="relative">
              <CornerDownRight className="w-3.5 h-3.5 text-slate-400 absolute -left-3 top-3" />
              <MessageItem
                message={reply}
                currentUser={currentUser}
                onOpenThread={() => {}}
                onTogglePin={() => {}}
                onToggleBookmark={() => {}}
                onAddReaction={onAddReaction}
                onDeleteMessage={() => {}}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reply Input Box */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/50">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Reply in thread..."
            className="flex-1 bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!replyText.trim()}
            className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
