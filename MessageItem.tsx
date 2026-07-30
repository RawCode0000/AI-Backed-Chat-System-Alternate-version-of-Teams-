import React, { useState } from 'react';
import { ChatMessage, User } from '../../types';
import { CodeBlock } from './CodeBlock';
import {
  MessageSquare,
  Pin,
  Bookmark,
  Smile,
  MoreHorizontal,
  Bot,
  Trash2,
  Edit2,
  Paperclip,
  Check,
  Sparkles,
  Share2
} from 'lucide-react';

interface MessageItemProps {
  message: ChatMessage;
  currentUser: User;
  onOpenThread: (message: ChatMessage) => void;
  onTogglePin: (messageId: string) => void;
  onToggleBookmark: (messageId: string) => void;
  onAddReaction: (messageId: string, emoji: string) => void;
  onDeleteMessage: (messageId: string) => void;
  onAskAiToExplainCode?: (code: string, language: string) => void;
}

const QUICK_EMOJIS = ['👍', '☕', '🚀', '🔥', '❤️', '🎉'];

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  currentUser,
  onOpenThread,
  onTogglePin,
  onToggleBookmark,
  onAddReaction,
  onDeleteMessage,
  onAskAiToExplainCode,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isSender = message.senderId === currentUser.id;

  return (
    <div
      className={`group relative flex space-x-3 p-3 rounded-2xl transition-all ${
        message.isPinned
          ? 'bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20'
          : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/40 border border-transparent'
      }`}
    >
      {/* Sender Avatar or AI Persona Icon */}
      <div className="flex-shrink-0">
        {message.isAI ? (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center text-lg">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              {message.senderAvatar || '🤖'}
            </div>
          </div>
        ) : (
          <img
            src={message.senderAvatar}
            alt={message.senderName}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-200 dark:ring-slate-800 shadow-xs"
          />
        )}
      </div>

      {/* Message Main Body */}
      <div className="flex-1 min-w-0">
        {/* Header Info */}
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
            {message.senderName}
          </span>

          {/* Role Badge */}
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
              message.isAI
                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            {message.isAI ? 'AI Technical Lead' : message.senderRole}
          </span>

          <span className="text-[10px] text-slate-400 font-medium">
            {message.timestamp}
          </span>

          {message.isPinned && (
            <span className="flex items-center space-x-0.5 text-[10px] font-bold text-amber-500">
              <Pin className="w-3 h-3" />
              <span>Pinned</span>
            </span>
          )}
        </div>

        {/* Text Content */}
        <div className="mt-1 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap break-words font-sans">
          {message.content}
        </div>

        {/* Code Snippet Block */}
        {message.codeSnippet && (
          <CodeBlock
            code={message.codeSnippet.code}
            language={message.codeSnippet.language}
            filename={message.codeSnippet.filename}
            onAskAiToExplain={onAskAiToExplainCode}
          />
        )}

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.attachments.map((att) => (
              <a
                key={att.id}
                href={att.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>{att.fileName} ({att.fileSize})</span>
              </a>
            ))}
          </div>
        )}

        {/* Footer Actions: Reactions & Threads */}
        <div className="mt-2 flex items-center space-x-3 text-xs">
          {/* Reaction Pills */}
          <div className="flex flex-wrap items-center gap-1">
            {message.reactions.map((r, idx) => {
              const userReacted = r.users.includes(currentUser.id);
              return (
                <button
                  key={idx}
                  onClick={() => onAddReaction(message.id, r.emoji)}
                  className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-medium border transition-colors ${
                    userReacted
                      ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-600 dark:text-indigo-400'
                      : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{r.emoji}</span>
                  <span>{r.count}</span>
                </button>
              );
            })}
          </div>

          {/* Thread Replies Trigger */}
          <button
            onClick={() => onOpenThread(message)}
            className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium text-[11px]"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>
              {message.threadCount ? `${message.threadCount} replies` : 'Reply in thread'}
            </span>
          </button>
        </div>
      </div>

      {/* Hover Floating Toolbar */}
      <div className="absolute right-3 -top-3 hidden group-hover:flex items-center space-x-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-1 z-10">
        {/* Reaction Quick Picker */}
        <div className="relative">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
            title="Add Reaction"
          >
            <Smile className="w-3.5 h-3.5" />
          </button>

          {showEmojiPicker && (
            <div className="absolute right-0 bottom-8 flex space-x-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1.5 rounded-xl shadow-xl z-20">
              {QUICK_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onAddReaction(message.id, emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-sm"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reply in thread */}
        <button
          onClick={() => onOpenThread(message)}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
          title="Reply in Thread"
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </button>

        {/* Pin Message */}
        <button
          onClick={() => onTogglePin(message.id)}
          className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 ${
            message.isPinned ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
          title="Pin Message"
        >
          <Pin className="w-3.5 h-3.5" />
        </button>

        {/* Bookmark */}
        <button
          onClick={() => onToggleBookmark(message.id)}
          className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 ${
            message.isBookmarked ? 'text-indigo-500' : 'text-slate-500 dark:text-slate-400'
          }`}
          title="Bookmark Message"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>

        {/* Delete if sender or Admin */}
        {(isSender || currentUser.role === 'Admin') && (
          <button
            onClick={() => onDeleteMessage(message.id)}
            className="p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/50 text-rose-500"
            title="Delete Message"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
