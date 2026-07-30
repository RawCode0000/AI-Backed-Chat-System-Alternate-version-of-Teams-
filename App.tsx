import React, { useState, useEffect } from 'react';
import {
  User,
  Project,
  Channel,
  ChatMessage,
  Task,
  EmployeeAnalytics,
  KnowledgeDoc,
  AuditLog,
  AIPersona,
  CodeSnippet,
  TaskStatus
} from './types';
import {
  CURRENT_USER,
  MOCK_USERS,
  MOCK_PROJECTS,
  MOCK_CHANNELS,
  MOCK_MESSAGES,
  MOCK_TASKS,
  MOCK_ANALYTICS,
  MOCK_KNOWLEDGE_DOCS,
  MOCK_AUDIT_LOGS,
  AI_PERSONAS
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Sidebar, MainViewType } from './components/Sidebar';
import { ChatView } from './components/Chat/ChatView';
import { ManagerDashboard } from './components/Manager/ManagerDashboard';
import { SprintBoard } from './components/Jira/SprintBoard';
import { KnowledgeBase } from './components/Notion/KnowledgeBase';
import { ArchVisualizer } from './components/Architecture/ArchVisualizer';
import { AuditLogView } from './components/Audit/AuditLogView';
import { SearchModal } from './components/SearchModal';
import { MediaStudio } from './components/MediaStudio/MediaStudio';
import { ScaleConcurrencyLab } from './components/Concurrency/ScaleConcurrencyLab';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<MainViewType>('chat');

  // Core Datasets
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project>(MOCK_PROJECTS[0]);
  const [channels, setChannels] = useState<Channel[]>(MOCK_CHANNELS);
  const [selectedChannel, setSelectedChannel] = useState<Channel>(MOCK_CHANNELS[1]); // #spring-boot-architecture
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [analyticsData, setAnalyticsData] = useState<EmployeeAnalytics[]>(MOCK_ANALYTICS);
  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDoc[]>(MOCK_KNOWLEDGE_DOCS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);

  // AI & Search state
  const [selectedPersona, setSelectedPersona] = useState<AIPersona | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync Dark Mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Log Audit Event Helper
  const logAuditEvent = (action: string, details: string, severity: 'info' | 'warning' | 'critical' = 'info') => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      details,
      ipAddress: '192.168.1.100',
      severity,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Switch Active User Role
  const handleSwitchUserRole = (newUser: User) => {
    setCurrentUser(newUser);
    logAuditEvent('ROLE_SWITCH', `Switched active user perspective to ${newUser.name} (${newUser.role}).`);
  };

  // Send Message & AI Trigger Logic
  const handleSendMessage = async (
    content: string,
    codeSnippet?: CodeSnippet,
    persona?: AIPersona
  ) => {
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      channelId: selectedChannel.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatar,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: [],
      codeSnippet,
    };

    setMessages((prev) => [...prev, newMsg]);
    logAuditEvent('MESSAGE_SENT', `Sent message in #${selectedChannel.name}.`);

    // Determine if AI should respond
    const shouldInvokeAi =
      !!persona ||
      selectedChannel.type === 'ai-assisted' ||
      content.toLowerCase().includes('@ai') ||
      content.toLowerCase().includes('how') ||
      content.toLowerCase().includes('code');

    if (shouldInvokeAi) {
      const targetPersona = persona || AI_PERSONAS[1]; // Default to Senior Java Lead AI

      try {
        const res = await fetch('/api/ai/persona-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: content,
            persona: targetPersona,
            channelName: selectedChannel.name,
            codeSnippet,
          }),
        });

        const data = await res.json();
        if (data.reply) {
          const aiMsg: ChatMessage = {
            id: `m-ai-${Date.now()}`,
            channelId: selectedChannel.id,
            senderId: targetPersona.id,
            senderName: targetPersona.name,
            senderRole: 'Architect',
            senderAvatar: targetPersona.avatar,
            isAI: true,
            aiPersonaId: targetPersona.id,
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            reactions: [{ emoji: '🚀', count: 1, users: [currentUser.id] }],
          };

          setMessages((prev) => [...prev, aiMsg]);
          logAuditEvent('AI_PERSONA_RESPONSE', `AI Persona ${targetPersona.name} responded in #${selectedChannel.name}.`);
        }
      } catch (err) {
        console.error('Error getting AI persona response:', err);
      }
    }
  };

  // Thread Reply Helper
  const handleSendThreadReply = (parentId: string, content: string) => {
    const replyMsg: ChatMessage = {
      id: `m-reply-${Date.now()}`,
      channelId: selectedChannel.id,
      parentId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatar,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: [],
    };

    setMessages((prev) => {
      return prev.map((m) => {
        if (m.id === parentId) {
          return {
            ...m,
            threadCount: (m.threadCount || 0) + 1,
            lastReplyAt: replyMsg.timestamp,
          };
        }
        return m;
      }).concat(replyMsg);
    });

    logAuditEvent('THREAD_REPLY', `Replied in thread ID ${parentId}.`);
  };

  // Message Reactions Toggle
  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m;

        const existingReaction = m.reactions.find((r) => r.emoji === emoji);
        let updatedReactions = [...m.reactions];

        if (existingReaction) {
          const userIndex = existingReaction.users.indexOf(currentUser.id);
          if (userIndex >= 0) {
            existingReaction.users.splice(userIndex, 1);
            existingReaction.count -= 1;
            if (existingReaction.count <= 0) {
              updatedReactions = updatedReactions.filter((r) => r.emoji !== emoji);
            }
          } else {
            existingReaction.users.push(currentUser.id);
            existingReaction.count += 1;
          }
        } else {
          updatedReactions.push({ emoji, count: 1, users: [currentUser.id] });
        }

        return { ...m, reactions: updatedReactions };
      })
    );
  };

  // Toggle Pin / Bookmark / Delete
  const handleTogglePin = (messageId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, isPinned: !m.isPinned } : m))
    );
  };

  const handleToggleBookmark = (messageId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, isBookmarked: !m.isBookmarked } : m))
    );
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== messageId));
  };

  // Explain Code using AI
  const handleAskAiToExplainCode = (code: string, language: string) => {
    setActiveView('chat');
    setSelectedPersona(AI_PERSONAS[1]); // Senior Java Lead
    handleSendMessage(`Please explain this ${language} code block and analyze potential performance bottlenecks:`, { code, language });
  };

  // Jira Task Actions
  const handleAddTask = (newTask: Omit<Task, 'id' | 'key' | 'createdAt' | 'updatedAt'>) => {
    const created: Task = {
      ...newTask,
      id: `task-${Date.now()}`,
      key: `${selectedProject.key}-${105 + tasks.length}`,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    setTasks((prev) => [created, ...prev]);
    logAuditEvent('JIRA_TASK_CREATED', `Created task ${created.key}: "${created.title}".`);
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus, updatedAt: new Date().toISOString().slice(0, 10) } : t))
    );
    logAuditEvent('JIRA_TASK_STATUS_UPDATED', `Updated task ID ${taskId} status to ${newStatus}.`);
  };

  const handleAutoGenerateSprint = (generatedTasks: Task[]) => {
    setTasks((prev) => [...generatedTasks, ...prev]);
    logAuditEvent('AI_SPRINT_GENERATED', `Auto-generated ${generatedTasks.length} backlog tasks via AI.`);
  };

  // Knowledge Base Actions
  const handleAddDoc = (newDoc: Omit<KnowledgeDoc, 'id' | 'createdAt' | 'updatedAt'>) => {
    const doc: KnowledgeDoc = {
      ...newDoc,
      id: `doc-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setKnowledgeDocs((prev) => [doc, ...prev]);
    logAuditEvent('KNOWLEDGE_DOC_CREATED', `Published document "${doc.title}".`);
  };

  // Get Active Title for Header
  const getActiveTitle = () => {
    switch (activeView) {
      case 'chat': return `#${selectedChannel.name}`;
      case 'media_studio': return 'AI Generative Media & Multimodal Center';
      case 'concurrency_lab': return '1,000+ Users Scale & Firebase Auth Center';
      case 'manager': return 'Manager Health & Competence Analytics';
      case 'jira': return 'Jira Task & Sprint Board';
      case 'notion': return 'Notion Knowledge Base';
      case 'architecture': return 'Architecture & ER Specs';
      case 'audit': return 'Audit Logs & Compliance';
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-600 selection:text-white">
      {/* Navbar */}
      <Navbar
        currentUser={currentUser}
        onSwitchUserRole={handleSwitchUserRole}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeViewTitle={getActiveTitle()}
        onQuickAiPrompt={() => {
          setActiveView('chat');
          setSelectedPersona(AI_PERSONAS[0]);
        }}
      />

      {/* Main Workspace Body Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
          channels={channels}
          selectedChannel={selectedChannel}
          onSelectChannel={setSelectedChannel}
          activeView={activeView}
          onChangeView={setActiveView}
          selectedPersona={selectedPersona}
          onSelectPersona={setSelectedPersona}
          users={MOCK_USERS}
          unreadTotal={2}
        />

        {/* Dynamic View Panel */}
        {activeView === 'chat' && (
          <ChatView
            channel={selectedChannel}
            messages={messages}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
            selectedPersona={selectedPersona}
            onSelectPersona={setSelectedPersona}
            onTogglePin={handleTogglePin}
            onToggleBookmark={handleToggleBookmark}
            onAddReaction={handleAddReaction}
            onDeleteMessage={handleDeleteMessage}
            onAskAiToExplainCode={handleAskAiToExplainCode}
            onSendThreadReply={handleSendThreadReply}
          />
        )}

        {activeView === 'media_studio' && (
          <MediaStudio />
        )}

        {activeView === 'concurrency_lab' && (
          <ScaleConcurrencyLab />
        )}

        {activeView === 'manager' && (
          <ManagerDashboard
            analyticsData={analyticsData}
            messages={messages}
            onGenerateAIReport={() => {
              logAuditEvent('AI_MANAGER_REPORT_GENERATED', 'Generated full team health analysis report.');
            }}
          />
        )}

        {activeView === 'jira' && (
          <SprintBoard
            tasks={tasks}
            project={selectedProject}
            users={MOCK_USERS}
            onAddTask={handleAddTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            onAutoGenerateSprint={handleAutoGenerateSprint}
          />
        )}

        {activeView === 'notion' && (
          <KnowledgeBase
            docs={knowledgeDocs}
            onAddDoc={handleAddDoc}
          />
        )}

        {activeView === 'architecture' && (
          <ArchVisualizer />
        )}

        {activeView === 'audit' && (
          <AuditLogView logs={auditLogs} />
        )}
      </div>

      {/* Cmd+K Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        messages={messages}
        tasks={tasks}
        docs={knowledgeDocs}
        users={MOCK_USERS}
        onSelectResult={(type, item) => {
          if (type === 'message') {
            setActiveView('chat');
          } else if (type === 'task') {
            setActiveView('jira');
          } else if (type === 'doc') {
            setActiveView('notion');
          }
        }}
      />
    </div>
  );
}
