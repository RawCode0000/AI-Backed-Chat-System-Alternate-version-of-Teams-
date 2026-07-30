import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority, Project, User } from '../../types';
import {
  Kanban,
  Plus,
  Sparkles,
  AlertOctagon,
  Clock,
  CheckCircle2,
  Tag,
  ArrowRight,
  User as UserIcon,
  X,
  Search,
  Filter
} from 'lucide-react';

interface SprintBoardProps {
  tasks: Task[];
  project: Project;
  users: User[];
  onAddTask: (newTask: Omit<Task, 'id' | 'key' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  onAutoGenerateSprint: (tasks: Task[]) => void;
}

const COLUMNS: { status: TaskStatus; label: string; badgeColor: string }[] = [
  { status: 'todo', label: 'To Do', badgeColor: 'bg-slate-500/10 text-slate-500 border-slate-500/20' },
  { status: 'in_progress', label: 'In Progress', badgeColor: 'bg-sky-500/10 text-sky-500 border-sky-500/20' },
  { status: 'code_review', label: 'Code Review', badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  { status: 'blocked', label: 'Blocked', badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
  { status: 'done', label: 'Done', badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
];

export const SprintBoard: React.FC<SprintBoardProps> = ({
  tasks,
  project,
  users,
  onAddTask,
  onUpdateTaskStatus,
  onAutoGenerateSprint,
}) => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showAiSprintModal, setShowAiSprintModal] = useState(false);
  const [projectGoal, setProjectGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states for manual task creation
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
  const [newAssigneeId, setNewAssigneeId] = useState(users[0]?.id || '');
  const [newPoints, setNewPoints] = useState(3);

  const filteredTasks = tasks.filter((t) => {
    if (!searchQuery) return true;
    return (
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assigneeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const assignee = users.find((u) => u.id === newAssigneeId) || users[0];

    onAddTask({
      title: newTitle,
      description: newDesc,
      status: 'todo',
      priority: newPriority,
      assigneeId: assignee.id,
      assigneeName: assignee.name,
      assigneeAvatar: assignee.avatar,
      projectId: project.id,
      sprint: project.sprint,
      storyPoints: newPoints,
      tags: ['Sprint14'],
    });

    setShowNewTaskModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleGenerateAiSprint = async () => {
    if (!projectGoal.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/generate-sprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectGoal,
          teamSize: users.length,
          durationWeeks: 2,
        }),
      });

      const data = await res.json();
      if (data.tasks && Array.isArray(data.tasks)) {
        const generatedTasks: Task[] = data.tasks.map((t: any, idx: number) => {
          const assignee = users[idx % users.length];
          return {
            id: `gen-${Date.now()}-${idx}`,
            key: `${project.key}-${200 + idx}`,
            title: t.title || 'Sprint Task',
            description: t.description || '',
            status: 'todo',
            priority: (t.priority as TaskPriority) || 'medium',
            assigneeId: assignee.id,
            assigneeName: assignee.name,
            assigneeAvatar: assignee.avatar,
            projectId: project.id,
            sprint: project.sprint,
            storyPoints: t.storyPoints || 3,
            createdAt: new Date().toISOString().slice(0, 10),
            updatedAt: new Date().toISOString().slice(0, 10),
            tags: t.tags || ['AI-Sprint'],
          };
        });

        onAutoGenerateSprint(generatedTasks);
      }
    } catch (err) {
      console.error('Error generating AI sprint:', err);
    } finally {
      setIsGenerating(false);
      setShowAiSprintModal(false);
      setProjectGoal('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Header Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
            <Kanban className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
              <span>{project.name} • Agile Board</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-500 font-bold">
                JIRA KANBAN
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Active Sprint: <span className="font-semibold text-slate-700 dark:text-slate-200">{project.sprint}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search sprint backlog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none w-48"
            />
          </div>

          <button
            onClick={() => setShowAiSprintModal(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-semibold text-xs shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Auto-Sprint Generator</span>
          </button>

          <button
            onClick={() => setShowNewTaskModal(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Board 5 Columns */}
      <div className="flex-1 overflow-x-auto p-4 flex space-x-4">
        {COLUMNS.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.status);
          return (
            <div
              key={col.status}
              className="w-72 flex-shrink-0 bg-slate-100/70 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-3 flex flex-col max-h-full"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800 mb-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${col.badgeColor}`}>
                  {col.label}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-xl bg-white dark:bg-slate-800 border transition-all shadow-xs ${
                      task.status === 'blocked'
                        ? 'border-rose-500/40 bg-rose-50/20 dark:bg-rose-950/10'
                        : 'border-slate-200 dark:border-slate-700 hover:border-indigo-500/40'
                    }`}
                  >
                    {/* Key & Priority */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {task.key}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          task.priority === 'critical'
                            ? 'bg-rose-500/10 text-rose-500'
                            : task.priority === 'high'
                            ? 'bg-amber-500/10 text-amber-500'
                            : 'bg-slate-500/10 text-slate-500'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    {/* Title */}
                    <p className="font-bold text-xs text-slate-900 dark:text-slate-100 leading-snug mb-1">
                      {task.title}
                    </p>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                      {task.description}
                    </p>

                    {/* Blocked Reason Alert */}
                    {task.blockedReason && (
                      <div className="mb-2 p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-[10px] text-rose-600 dark:text-rose-400 flex items-start space-x-1">
                        <AlertOctagon className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        <span>{task.blockedReason}</span>
                      </div>
                    )}

                    {/* Footer Assignee & Status Shift Controls */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1.5">
                        <img
                          src={task.assigneeAvatar}
                          alt={task.assigneeName}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-[10px] text-slate-500 font-medium truncate max-w-[80px]">
                          {task.assigneeName}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 mr-1">
                          {task.storyPoints} pts
                        </span>
                        {/* Status Switcher Select */}
                        <select
                          value={task.status}
                          onChange={(e) => onUpdateTaskStatus(task.id, e.target.value as TaskStatus)}
                          className="text-[10px] bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-1 py-0.5 text-slate-800 dark:text-slate-200"
                        >
                          <option value="todo">To Do</option>
                          <option value="in_progress">In Progress</option>
                          <option value="code_review">Code Review</option>
                          <option value="blocked">Blocked</option>
                          <option value="done">Done</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Auto-Sprint Generator Modal */}
      {showAiSprintModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>AI Auto-Sprint Backlog Generator</span>
              </span>
              <button onClick={() => setShowAiSprintModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Specify your project objective or architectural feature goal. Gemini AI will automatically breakdown tasks, estimate story points, and populate the Kanban board.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Project Goal / Epic Objective
              </label>
              <textarea
                value={projectGoal}
                onChange={(e) => setProjectGoal(e.target.value)}
                placeholder="e.g. Implement WebSocket STOMP real-time chat with Redis pub/sub backplane and Spring Security 6 authentication..."
                rows={3}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowAiSprintModal(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateAiSprint}
                disabled={isGenerating || !projectGoal.trim()}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center space-x-1.5"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Generating Tasks...' : 'Generate Sprint Backlog'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Task Creation Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateTaskSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-5 shadow-2xl space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Create New Jira Task</span>
              <button type="button" onClick={() => setShowNewTaskModal(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Task title..."
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={3}
                placeholder="Detailed acceptance criteria..."
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-slate-100"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Assignee</label>
                <select
                  value={newAssigneeId}
                  onChange={(e) => setNewAssigneeId(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-slate-100"
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Story Points</label>
                <select
                  value={newPoints}
                  onChange={(e) => setNewPoints(Number(e.target.value))}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-slate-100"
                >
                  <option value={1}>1 pt</option>
                  <option value={2}>2 pts</option>
                  <option value={3}>3 pts</option>
                  <option value={5}>5 pts</option>
                  <option value={8}>8 pts</option>
                  <option value={13}>13 pts</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewTaskModal(false)}
                className="px-3 py-1.5 rounded-xl text-slate-500 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold"
              >
                Save Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
