import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';
import { 
  Search, 
  Bell, 
  ShieldCheck, 
  Zap, 
  Moon, 
  Sun, 
  ChevronDown, 
  CheckCircle2, 
  Cpu, 
  Radio, 
  Sparkles 
} from 'lucide-react';

interface NavbarProps {
  currentUser: User;
  onSwitchUserRole: (user: User) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  activeViewTitle: string;
  onQuickAiPrompt: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onSwitchUserRole,
  darkMode,
  onToggleDarkMode,
  onOpenSearch,
  activeViewTitle,
  onQuickAiPrompt,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-12 border-b border-[#1E2638] bg-[#0B0E14] px-3 flex items-center justify-between sticky top-0 z-40 transition-colors">
      {/* Left: Branding & Active View Title */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-indigo-600 via-purple-600 to-sky-500 p-0.5 shadow-xs flex items-center justify-center">
            <div className="w-full h-full bg-[#0B0E14] rounded-[5px] flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            </div>
          </div>
          <div>
            <span className="font-bold text-xs tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
              NEXUS AI
            </span>
            <span className="hidden sm:inline-block ml-1.5 text-[9px] font-mono font-semibold px-1 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              ENTERPRISE v2.4
            </span>
          </div>
        </div>

        <div className="h-3.5 w-px bg-[#1E2638] hidden md:block" />

        <div className="hidden md:flex items-center space-x-1.5">
          <span className="text-[11px] font-medium text-slate-400">View:</span>
          <span className="text-[11px] font-bold text-slate-200 bg-[#151C2C] px-2 py-0.5 rounded border border-[#1E2638]">
            {activeViewTitle}
          </span>
        </div>
      </div>

      {/* Middle: Search Bar */}
      <div className="flex-1 max-w-md mx-3 hidden lg:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-2.5 py-1 text-xs text-slate-400 bg-[#111622] hover:bg-[#151C2C] rounded-md border border-[#1E2638] transition-all"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[11px]">Search messages, code snippets, tasks, or docs...</span>
          </div>
          <kbd className="text-[9px] font-mono px-1.5 py-0.2 bg-[#0B0E14] text-slate-400 rounded border border-[#1E2638]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        {/* Connection Status Indicator */}
        <div className="hidden sm:flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
          <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
          <span>WebSocket</span>
        </div>

        {/* Quick AI Trigger */}
        <button
          onClick={onQuickAiPrompt}
          className="flex items-center space-x-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-all"
          title="Ask AI Tech Lead"
        >
          <Sparkles className="w-3 h-3 text-yellow-300" />
          <span className="hidden sm:inline text-[11px]">Ask Tech Lead</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-1 rounded text-slate-300 hover:bg-[#151C2C] transition-colors"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1 rounded text-slate-300 hover:bg-[#151C2C] transition-colors relative"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-indigo-500 ring-1 ring-[#0B0E14]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#111622] rounded-lg shadow-2xl border border-[#1E2638] p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E2638] mb-2">
                <span className="font-semibold text-slate-200">System Notifications</span>
                <span className="text-[10px] text-indigo-400 font-mono font-medium">3 New</span>
              </div>
              <div className="space-y-1.5">
                <div className="p-2 rounded bg-[#151C2C] border border-[#1E2638]">
                  <p className="font-medium text-slate-200 text-[11px]">🤖 AI Recommendation Generated</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Training course "Spring Security 6" suggested for Vikram Patel (88% confidence).</p>
                </div>
                <div className="p-2 rounded bg-[#151C2C] border border-[#1E2638]">
                  <p className="font-medium text-slate-200 text-[11px]">✅ PR Approved</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Alex Rivera merged #142 "EntityGraph Authority Fetching".</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center space-x-1.5 p-0.5 rounded hover:bg-[#151C2C] transition-colors"
          >
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-indigo-500/40"
              />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-1 ring-[#0B0E14]" />
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-[11px] font-semibold text-slate-200 leading-tight">{currentUser.name}</p>
              <p className="text-[9px] font-mono text-indigo-400 leading-none">{currentUser.role}</p>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#111622] rounded-lg shadow-2xl border border-[#1E2638] p-2 z-50 text-xs">
              <div className="px-2 py-1 border-b border-[#1E2638] mb-1">
                <p className="font-semibold text-slate-200 text-[11px]">Switch User Persona / Role</p>
                <p className="text-[9px] text-slate-400">Experience platform as different team roles</p>
              </div>
              <div className="space-y-0.5 max-h-64 overflow-y-auto">
                {MOCK_USERS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      onSwitchUserRole(user);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full flex items-center justify-between p-1.5 rounded transition-colors ${
                      currentUser.id === user.id
                        ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                        : 'hover:bg-[#151C2C] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                      <div className="text-left">
                        <p className="text-[11px] leading-none">{user.name}</p>
                        <p className="text-[9px] text-slate-400">{user.role} • {user.department}</p>
                      </div>
                    </div>
                    {currentUser.id === user.id && <CheckCircle2 className="w-3 h-3 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );

};
