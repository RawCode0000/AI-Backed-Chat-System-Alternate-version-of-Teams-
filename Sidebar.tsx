import React, { useState } from 'react';
import { Project, Channel, AIPersona, User } from '../types';
import { AI_PERSONAS } from '../data/mockData';
import {
  MessageSquare,
  BarChart3,
  Kanban,
  BookOpen,
  Database,
  ShieldAlert,
  Hash,
  Lock,
  Sparkles,
  Bot,
  Plus,
  FolderGit2,
  ChevronDown,
  ChevronRight,
  UserCheck,
  Zap,
  Activity,
  Award
} from 'lucide-react';

export type MainViewType =
  | 'chat'
  | 'media_studio'
  | 'concurrency_lab'
  | 'manager'
  | 'jira'
  | 'notion'
  | 'architecture'
  | 'audit';

interface SidebarProps {
  projects: Project[];
  selectedProject: Project;
  onSelectProject: (p: Project) => void;
  channels: Channel[];
  selectedChannel: Channel;
  onSelectChannel: (c: Channel) => void;
  activeView: MainViewType;
  onChangeView: (v: MainViewType) => void;
  selectedPersona: AIPersona | null;
  onSelectPersona: (p: AIPersona | null) => void;
  users: User[];
  unreadTotal: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  projects,
  selectedProject,
  onSelectProject,
  channels,
  selectedChannel,
  onSelectChannel,
  activeView,
  onChangeView,
  selectedPersona,
  onSelectPersona,
  users,
  unreadTotal,
}) => {
  const [channelsExpanded, setChannelsExpanded] = useState(true);
  const [personasExpanded, setPersonasExpanded] = useState(true);
  const [membersExpanded, setMembersExpanded] = useState(false);

  return (
    <aside className="w-60 border-r border-[#1E2638] bg-[#090D16] flex flex-col h-[calc(100vh-3rem)] select-none transition-colors">
      {/* Workspace / Project Dropdown */}
      <div className="p-2 border-b border-[#1E2638]">
        <div className="bg-[#111622] rounded-lg p-2 border border-[#1E2638] shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                {selectedProject.key}
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-200 truncate w-28">
                  {selectedProject.name}
                </p>
                <p className="text-[9px] font-mono font-medium text-slate-400">
                  {selectedProject.sprint}
                </p>
              </div>
            </div>
            <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Main Feature Views Navigation */}
      <div className="px-1.5 py-2 space-y-0.5 border-b border-[#1E2638]">
        <p className="px-2 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1">
          Platform Workspace
        </p>

        <button
          onClick={() => onChangeView('chat')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all ${
            activeView === 'chat'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-300 hover:bg-[#151C2C]'
          }`}
        >
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Live Chat & Threads</span>
          </div>
          {unreadTotal > 0 && (
            <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.2 rounded font-bold font-mono">
              {unreadTotal}
            </span>
          )}
        </button>

        <button
          onClick={() => onChangeView('media_studio')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all ${
            activeView === 'media_studio'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-300 hover:bg-[#151C2C]'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Generative Media</span>
          </div>
          <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Veo + Live
          </span>
        </button>

        <button
          onClick={() => onChangeView('concurrency_lab')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all ${
            activeView === 'concurrency_lab'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-300 hover:bg-[#151C2C]'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>1,000+ Scale & Auth</span>
          </div>
          <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            1000+ Users
          </span>
        </button>

        <button
          onClick={() => onChangeView('manager')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all ${
            activeView === 'manager'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-300 hover:bg-[#151C2C]'
          }`}
        >
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Manager Analytics</span>
          </div>
          <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Excel View
          </span>
        </button>

        <button
          onClick={() => onChangeView('jira')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all ${
            activeView === 'jira'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-300 hover:bg-[#151C2C]'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Kanban className="w-3.5 h-3.5 text-sky-400" />
            <span>Sprint & Task Board</span>
          </div>
          <span className="text-[9px] font-mono text-slate-500">Jira</span>
        </button>

        <button
          onClick={() => onChangeView('notion')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all ${
            activeView === 'notion'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-300 hover:bg-[#151C2C]'
          }`}
        >
          <div className="flex items-center space-x-2">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Knowledge Base & Docs</span>
          </div>
          <span className="text-[9px] font-mono text-slate-500">Notion</span>
        </button>

        <button
          onClick={() => onChangeView('architecture')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all ${
            activeView === 'architecture'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-300 hover:bg-[#151C2C]'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Architect & ER Specs</span>
          </div>
        </button>

        <button
          onClick={() => onChangeView('audit')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all ${
            activeView === 'audit'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-300 hover:bg-[#151C2C]'
          }`}
        >
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Audit Logs & Compliance</span>
          </div>
        </button>
      </div>

      {/* Scrollable Sub-sections: Channels, Personas, Members */}
      <div className="flex-1 overflow-y-auto px-1.5 py-2 space-y-3 text-xs">
        {/* Channels Section */}
        <div>
          <button
            onClick={() => setChannelsExpanded(!channelsExpanded)}
            className="w-full flex items-center justify-between px-2 py-0.5 text-slate-500 hover:text-slate-300 font-mono font-bold text-[9px] uppercase tracking-wider"
          >
            <div className="flex items-center space-x-1">
              {channelsExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              <span>Channels</span>
            </div>
            <Plus className="w-3 h-3 hover:text-indigo-400 transition-colors" title="Create Channel" />
          </button>

          {channelsExpanded && (
            <div className="mt-0.5 space-y-0.5">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    onSelectChannel(ch);
                    onChangeView('chat');
                  }}
                  className={`w-full flex items-center justify-between px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                    activeView === 'chat' && selectedChannel.id === ch.id
                      ? 'bg-indigo-600/20 text-indigo-300 font-bold border border-indigo-500/30'
                      : 'text-slate-300 hover:bg-[#151C2C]'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    {ch.type === 'private' ? (
                      <Lock className="w-3 h-3 text-amber-400 flex-shrink-0" />
                    ) : ch.type === 'ai-assisted' ? (
                      <Sparkles className="w-3 h-3 text-purple-400 flex-shrink-0" />
                    ) : (
                      <Hash className="w-3 h-3 text-slate-500 flex-shrink-0" />
                    )}
                    <span className="truncate text-[11px]">{ch.name}</span>
                  </div>
                  {ch.type === 'ai-assisted' && (
                    <span className="text-[8px] font-mono font-bold px-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">AI</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* AI Personas Section */}
        <div>
          <button
            onClick={() => setPersonasExpanded(!personasExpanded)}
            className="w-full flex items-center justify-between px-2 py-0.5 text-slate-500 hover:text-slate-300 font-mono font-bold text-[9px] uppercase tracking-wider"
          >
            <div className="flex items-center space-x-1">
              {personasExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              <span>AI Personas</span>
            </div>
            <Bot className="w-3 h-3 text-indigo-400" />
          </button>

          {personasExpanded && (
            <div className="mt-0.5 space-y-0.5">
              {AI_PERSONAS.map((persona) => {
                const isSelected = selectedPersona?.id === persona.id;
                return (
                  <button
                    key={persona.id}
                    onClick={() => onSelectPersona(isSelected ? null : persona)}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded transition-colors text-[11px] ${
                      isSelected
                        ? 'bg-purple-600/20 text-purple-300 font-bold border border-purple-500/40'
                        : 'text-slate-300 hover:bg-[#151C2C]'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 truncate">
                      <span className="text-sm">{persona.avatar}</span>
                      <span className="truncate text-[11px]">{persona.name}</span>
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Active Team Members */}
        <div>
          <button
            onClick={() => setMembersExpanded(!membersExpanded)}
            className="w-full flex items-center justify-between px-2 py-0.5 text-slate-500 hover:text-slate-300 font-mono font-bold text-[9px] uppercase tracking-wider"
          >
            <div className="flex items-center space-x-1">
              {membersExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              <span>Roster ({users.length})</span>
            </div>
            <UserCheck className="w-3 h-3 text-slate-500" />
          </button>

          {membersExpanded && (
            <div className="mt-0.5 space-y-0.5">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center space-x-1.5 px-2 py-0.5 rounded text-slate-400 hover:bg-[#151C2C]"
                >
                  <div className="relative">
                    <img src={u.avatar} alt={u.name} className="w-4 h-4 rounded-full object-cover" />
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-1 h-1 rounded-full ${
                        u.status === 'online' ? 'bg-emerald-500' : u.status === 'busy' ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                    />
                  </div>
                  <span className="truncate text-[11px] font-medium">{u.name}</span>
                  <span className="ml-auto text-[8px] text-slate-500 font-mono">{u.role}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer System Health Info */}
      <div className="p-2 border-t border-[#1E2638] bg-[#0B0E14]">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <div className="flex items-center space-x-1">
            <Activity className="w-3 h-3 text-indigo-400" />
            <span className="font-semibold text-[10px]">Spring + Gemini</span>
          </div>
          <span className="text-emerald-400 font-bold">100% OK</span>
        </div>
      </div>
    </aside>
  );

};
