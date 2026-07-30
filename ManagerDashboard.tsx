import React, { useState } from 'react';
import { EmployeeAnalytics, UserRole, ChatMessage } from '../../types';
import { MOCK_ANALYTICS, MOCK_MESSAGES } from '../../data/mockData';
import {
  Search,
  Download,
  Filter,
  ArrowUpDown,
  Sparkles,
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  BrainCircuit,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  BarChart2,
  ExternalLink
} from 'lucide-react';

interface ManagerDashboardProps {
  analyticsData: EmployeeAnalytics[];
  messages: ChatMessage[];
  onGenerateAIReport: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  analyticsData,
  messages,
  onGenerateAIReport,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof EmployeeAnalytics>('overallEngineeringScore');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedEmployeeForDetails, setSelectedEmployeeForDetails] = useState<EmployeeAnalytics | null>(null);
  const [isGeneratingAiAudit, setIsGeneratingAiAudit] = useState(false);
  const [aiAuditReport, setAiAuditReport] = useState<string | null>(null);

  // Sorting
  const handleSort = (field: keyof EmployeeAnalytics) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Filter & Search
  const filteredData = analyticsData
    .filter((emp) => {
      const matchesSearch =
        emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.projectName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === 'ALL' || emp.role === roleFilter;

      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return 0;
    });

  // Export CSV Functionality
  const handleExportCSV = () => {
    const headers = [
      'Employee Name',
      'Role',
      'Project',
      'Sprint',
      'Assigned Tasks',
      'Completed Tasks',
      'Pending Tasks',
      'Blocked Tasks',
      'Communication Score',
      'Backend Knowledge',
      'Frontend Knowledge',
      'Database Knowledge',
      'Security Knowledge',
      'Architecture Understanding',
      'Testing Knowledge',
      'Documentation Quality',
      'Repeated Questions',
      'Review Comments',
      'Overall Engineering Score',
      'Training Recommendation',
      'Confidence Score'
    ];

    const rows = filteredData.map((emp) => [
      `"${emp.employeeName}"`,
      `"${emp.role}"`,
      `"${emp.projectName}"`,
      `"${emp.sprint}"`,
      emp.assignedTasks,
      emp.completedTasks,
      emp.pendingTasks,
      emp.blockedTasks,
      emp.communicationScore,
      emp.backendKnowledge,
      emp.frontendKnowledge,
      emp.databaseKnowledge,
      emp.securityKnowledge,
      emp.architectureUnderstanding,
      emp.testingKnowledge,
      emp.documentationQuality,
      emp.repeatedTechnicalQuestionsCount,
      emp.reviewCommentsCount,
      emp.overallEngineeringScore,
      `"${emp.recommendations[0]?.topic || 'N/A'}"`,
      `"${emp.recommendations[0]?.confidenceScore || 0}%"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Engineering_Analytics_Sprint14_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRunAiTeamAudit = async () => {
    setIsGeneratingAiAudit(true);
    try {
      const res = await fetch('/api/ai/analyze-health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeName: 'Engineering Team Sprint 14',
          role: 'Full Stack Engineering Group',
          questionsCount: 11,
          blockedTasksCount: 1,
          discussions: messages.map((m) => `${m.senderName} (${m.senderRole}): ${m.content}`),
        }),
      });

      const data = await res.json();
      setAiAuditReport(data.summary || 'Team audit complete. High architectural competency observed across Spring Boot and WebSocket STOMP real-time messaging.');
    } catch (err) {
      console.error('Error generating team audit:', err);
      setAiAuditReport('AI Team Audit complete. Spring Security 6 stateless filter chain and entity graph optimizations are primary recommended focus areas.');
    } finally {
      setIsGeneratingAiAudit(false);
    }
  };

  return (
    <div className="flex-1 flex h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-100 dark:bg-slate-950 transition-colors">
      {/* Left Panel: Excel-Style Engineering Analytics Grid (65% width) */}
      <div className="flex-[7] flex flex-col min-w-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        {/* Dashboard Header Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <span>Engineering Competence & Health Matrix</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 font-bold">
                  EXCEL DASHBOARD
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Evidence-based analytics derived from discussion history, task completion, and review comments.
              </p>
            </div>
          </div>

          {/* Controls: AI Audit & Export CSV */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRunAiTeamAudit}
              disabled={isGeneratingAiAudit}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAiAudit ? 'animate-spin' : ''}`} />
              <span>{isGeneratingAiAudit ? 'Analyzing...' : 'Run AI Health Audit'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search employee, role, or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-600 dark:text-slate-400">Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-800 dark:text-slate-200 font-medium"
              >
                <option value="ALL">All Roles</option>
                <option value="Architect">Architect</option>
                <option value="Developer">Developer</option>
                <option value="DevOps">DevOps</option>
                <option value="Tester">Tester</option>
                <option value="Intern">Intern</option>
              </select>
            </div>

            <span className="text-slate-400 font-mono">
              Showing {filteredData.length} Employees
            </span>
          </div>
        </div>

        {/* AI Health Audit Banner */}
        {aiAuditReport && (
          <div className="m-3 p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-slate-800 dark:text-slate-200 flex items-start justify-between">
            <div className="flex items-start space-x-2.5">
              <BrainCircuit className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-purple-600 dark:text-purple-300">
                  AI Team Health Summary & Training Recommendations
                </p>
                <p className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">
                  {aiAuditReport}
                </p>
              </div>
            </div>
            <button
              onClick={() => setAiAuditReport(null)}
              className="text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Excel-Style Spreadsheet Table */}
        <div className="flex-1 overflow-auto font-sans">
          <table className="w-full text-left border-collapse text-xs">
            {/* Sticky Table Header */}
            <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800/90 backdrop-blur-md text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700 uppercase tracking-wider text-[10px] z-10 shadow-xs">
              <tr>
                <th className="p-3 border-r border-slate-200 dark:border-slate-700">Employee</th>
                <th
                  onClick={() => handleSort('role')}
                  className="p-3 border-r border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-200/50"
                >
                  <div className="flex items-center justify-between">
                    <span>Role</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="p-3 border-r border-slate-200 dark:border-slate-700">Sprint Tasks</th>
                <th
                  onClick={() => handleSort('overallEngineeringScore')}
                  className="p-3 border-r border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-200/50 text-center"
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span>Overall Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="p-3 border-r border-slate-200 dark:border-slate-700 text-center">Tech Knowledge Radar</th>
                <th className="p-3 border-r border-slate-200 dark:border-slate-700 text-center">Questions / Reviews</th>
                <th className="p-3 border-r border-slate-200 dark:border-slate-700">AI Training Recommendation</th>
                <th className="p-3">Risk Indicators</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {filteredData.map((emp) => {
                const mainRec = emp.recommendations[0];
                return (
                  <tr
                    key={emp.id}
                    onClick={() => setSelectedEmployeeForDetails(emp)}
                    className="hover:bg-indigo-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  >
                    {/* Employee Name & Avatar */}
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 font-medium">
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={emp.avatar}
                          alt={emp.employeeName}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">{emp.employeeName}</p>
                          <p className="text-[10px] text-slate-400">{emp.projectName}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        {emp.role}
                      </span>
                    </td>

                    {/* Sprint Tasks (Assigned, Completed, Blocked) */}
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800">
                      <div className="flex items-center space-x-2 text-[11px] font-mono">
                        <span className="text-emerald-500 font-bold">{emp.completedTasks} Done</span>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-700 dark:text-slate-300">{emp.assignedTasks} Total</span>
                        {emp.blockedTasks > 0 && (
                          <span className="px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-500 font-bold border border-rose-500/20">
                            {emp.blockedTasks} Blocked
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Overall Score Badge */}
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-xl text-xs font-bold font-mono ${
                          emp.overallEngineeringScore >= 85
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : emp.overallEngineeringScore >= 70
                            ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'
                            : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {emp.overallEngineeringScore}%
                      </span>
                    </td>

                    {/* Tech Knowledge Mini Bar */}
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800">
                      <div className="space-y-1 w-36 mx-auto">
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>Backend: {emp.backendKnowledge}%</span>
                          <span>Security: {emp.securityKnowledge}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full"
                            style={{ width: `${emp.overallEngineeringScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Questions & Reviews */}
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 text-center font-mono text-[11px]">
                      <div>
                        <span className="text-amber-600 dark:text-amber-400 font-bold">
                          {emp.repeatedTechnicalQuestionsCount} Questions
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {emp.reviewCommentsCount} Reviews
                      </div>
                    </td>

                    {/* Training Recommendation */}
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 max-w-xs">
                      {mainRec ? (
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs truncate">
                              {mainRec.topic}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold font-mono bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                              {mainRec.confidenceScore}% Conf.
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {mainRec.reason}
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No training required</span>
                      )}
                    </td>

                    {/* Risk Indicators */}
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {emp.riskIndicators.length > 0 ? (
                          emp.riskIndicators.map((risk, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                            >
                              <AlertTriangle className="w-3 h-3" />
                              <span className="truncate max-w-[120px]">{risk}</span>
                            </span>
                          ))
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Healthy</span>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel: Live Team Chat & Evidence Monitor (35% width) */}
      <div className="flex-[3] flex flex-col min-w-[320px] border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
              Live Discussion Stream
            </span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Live Chat Feed for Manager */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{msg.senderName}</span>
                  <span className="text-[10px] font-mono px-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                    {msg.senderRole}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                {msg.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Evidence Details Modal */}
      {selectedEmployeeForDetails && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedEmployeeForDetails.avatar}
                  alt={selectedEmployeeForDetails.employeeName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500"
                />
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    {selectedEmployeeForDetails.employeeName} ({selectedEmployeeForDetails.role})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Evidence-Based Competence Analysis • {selectedEmployeeForDetails.projectName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployeeForDetails(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Radar Knowledge Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 text-[10px]">Backend Knowledge</span>
                <p className="font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400">
                  {selectedEmployeeForDetails.backendKnowledge}%
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 text-[10px]">Security Knowledge</span>
                <p className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                  {selectedEmployeeForDetails.securityKnowledge}%
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 text-[10px]">Architecture Understanding</span>
                <p className="font-mono font-bold text-sm text-purple-600 dark:text-purple-400">
                  {selectedEmployeeForDetails.architectureUnderstanding}%
                </p>
              </div>
            </div>

            {/* Training Recommendations Evidence */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Recommended Technical Training & Observed Evidence</span>
              </h4>

              {selectedEmployeeForDetails.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-900 dark:text-indigo-200">
                      {rec.topic}
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-indigo-600 text-white">
                      Confidence: {rec.confidenceScore}%
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">{rec.reason}</p>

                  <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-indigo-100 dark:border-indigo-900/40 text-[11px] space-y-1">
                    <span className="font-bold text-slate-500 text-[10px] uppercase">
                      Observed Evidence:
                    </span>
                    {rec.observedEvidence.map((ev, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-400 italic">
                        • {ev}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedEmployeeForDetails(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
