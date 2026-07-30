/**
 * AI Engineering Collaboration Platform - Domain Types
 */

export type UserRole =
  | 'Admin'
  | 'Manager'
  | 'Developer'
  | 'Tester'
  | 'DevOps'
  | 'Product Manager'
  | 'Business Analyst'
  | 'Scrum Master'
  | 'Architect'
  | 'Intern';

export type UserStatus = 'online' | 'busy' | 'away' | 'offline';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  status: UserStatus;
  statusMessage?: string;
  skills: {
    backend: number;
    frontend: number;
    database: number;
    security: number;
    architecture: number;
    testing: number;
  };
}

export interface AIPersona {
  id: string;
  name: string;
  roleTitle: string;
  avatar: string;
  description: string;
  tone: string;
  promptPrefix: string;
  badgeColor: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[]; // user IDs
}

export interface Attachment {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: 'code' | 'pdf' | 'image' | 'doc';
  url: string;
}

export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar: string;
  isAI?: boolean;
  aiPersonaId?: string;
  content: string;
  timestamp: string;
  threadCount?: number;
  lastReplyAt?: string;
  parentId?: string; // For thread replies
  reactions: Reaction[];
  attachments?: Attachment[];
  codeSnippet?: CodeSnippet;
  isPinned?: boolean;
  isBookmarked?: boolean;
  mentions?: string[]; // user IDs or roles
  edits?: { editedAt: string }[];
}

export interface Channel {
  id: string;
  projectId: string;
  name: string;
  description: string;
  type: 'public' | 'private' | 'ai-assisted';
  isArchived?: boolean;
  unreadCount?: number;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  status: 'active' | 'planning' | 'completed' | 'on-hold';
  teamMembers: string[]; // User IDs
  sprint: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'code_review' | 'done' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Task {
  id: string;
  key: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  assigneeName: string;
  assigneeAvatar: string;
  projectId: string;
  sprint: string;
  storyPoints: number;
  blockedReason?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface TrainingRecommendation {
  topic: string;
  reason: string;
  confidenceScore: number; // 0 - 100
  suggestedCourseUrl?: string;
  urgency: 'low' | 'medium' | 'high';
  observedEvidence: string[];
}

export interface EmployeeAnalytics {
  id: string;
  userId: string;
  employeeName: string;
  role: UserRole;
  avatar: string;
  projectId: string;
  projectName: string;
  sprint: string;
  assignedTasks: number;
  completedTasks: number;
  pendingTasks: number;
  blockedTasks: number;
  communicationScore: number; // 0 - 100
  backendKnowledge: number; // 0 - 100
  frontendKnowledge: number; // 0 - 100
  databaseKnowledge: number; // 0 - 100
  securityKnowledge: number; // 0 - 100
  architectureUnderstanding: number; // 0 - 100
  testingKnowledge: number; // 0 - 100
  documentationQuality: number; // 0 - 100
  repeatedTechnicalQuestionsCount: number;
  reviewCommentsCount: number;
  riskIndicators: string[];
  overallEngineeringScore: number; // 0 - 100
  recommendations: TrainingRecommendation[];
  historicalScores: { month: string; score: number }[];
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  category: 'architecture' | 'api-design' | 'runbook' | 'onboarding' | 'sprint-notes';
  content: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  aiGenerated?: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  ipAddress: string;
  severity: 'info' | 'warning' | 'critical';
}
