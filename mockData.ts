import { User, AIPersona, Project, Channel, ChatMessage, Task, EmployeeAnalytics, KnowledgeDoc, AuditLog } from '../types';

export const CURRENT_USER: User = {
  id: 'u-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@enterprise.ai',
  role: 'Architect',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  department: 'Core Platform Engineering',
  status: 'online',
  statusMessage: 'Architecting High-Throughput Event Streams ⚡',
  skills: {
    backend: 95,
    frontend: 88,
    database: 92,
    security: 90,
    architecture: 98,
    testing: 85,
  },
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'u-2',
    name: 'Sarah Chen',
    email: 'sarah.chen@enterprise.ai',
    role: 'Manager',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    department: 'Engineering Leadership',
    status: 'online',
    skills: { backend: 82, frontend: 75, database: 80, security: 85, architecture: 88, testing: 80 },
  },
  {
    id: 'u-3',
    name: 'Vikram Patel',
    email: 'vikram.patel@enterprise.ai',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Backend Services',
    status: 'online',
    skills: { backend: 78, frontend: 45, database: 72, security: 62, architecture: 65, testing: 70 },
  },
  {
    id: 'u-4',
    name: 'Elena Rostova',
    email: 'elena.rostova@enterprise.ai',
    role: 'DevOps',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Infrastructure & SRE',
    status: 'online',
    skills: { backend: 85, frontend: 50, database: 88, security: 94, architecture: 86, testing: 82 },
  },
  {
    id: 'u-5',
    name: 'Marcus Vance',
    email: 'marcus.vance@enterprise.ai',
    role: 'Tester',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    department: 'Quality Engineering',
    status: 'busy',
    skills: { backend: 65, frontend: 70, database: 60, security: 68, architecture: 55, testing: 95 },
  },
  {
    id: 'u-6',
    name: 'Aisha Omar',
    email: 'aisha.omar@enterprise.ai',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    department: 'Product Strategy',
    status: 'online',
    skills: { backend: 50, frontend: 65, database: 55, security: 60, architecture: 70, testing: 65 },
  },
  {
    id: 'u-7',
    name: 'David Kim',
    email: 'david.kim@enterprise.ai',
    role: 'Intern',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    department: 'Core Platform',
    status: 'online',
    skills: { backend: 58, frontend: 62, database: 50, security: 42, architecture: 40, testing: 52 },
  },
];

export const AI_PERSONAS: AIPersona[] = [
  {
    id: 'persona-arch',
    name: 'Software Architect AI',
    roleTitle: 'Principal Enterprise Architect',
    avatar: '🏛️',
    description: 'Specializes in distributed systems, high availability, microservices, system trade-offs, and enterprise patterns.',
    tone: 'Strategic, precise, highly structured, uses visual diagrams & pattern references.',
    promptPrefix: 'You are a Principal Software Architect. Focus on system architecture, microservices, scalability, database design, resilience, and clean code principles.',
    badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  },
  {
    id: 'persona-java',
    name: 'Senior Java Lead AI',
    roleTitle: 'Spring Boot 3 & Java 21 Specialist',
    avatar: '☕',
    description: 'Expert in Spring Boot, Spring Security, Hibernate/JPA, Virtual Threads, Reactive WebFlux, and concurrency.',
    tone: 'Deeply technical, production-ready Java code examples, performance annotations.',
    promptPrefix: 'You are a Senior Java 21 & Spring Boot Technical Lead. Provide idiomatic Spring Boot code, Spring Security configurations, and concurrency best practices.',
    badgeColor: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  },
  {
    id: 'persona-fe',
    name: 'Frontend Architect AI',
    roleTitle: 'React & UI Performance Lead',
    avatar: '🎨',
    description: 'Expert in React 19, TypeScript, Tailwind, state synchronization, accessible UI components, and rendering optimization.',
    tone: 'UI/UX focused, clean component architecture, accessible, responsive.',
    promptPrefix: 'You are a Senior Frontend Architect expert in React, TypeScript, and modern styling. Provide modular component code and UX best practices.',
    badgeColor: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  },
  {
    id: 'persona-devops',
    name: 'DevOps & SRE Lead AI',
    roleTitle: 'Cloud Native & Platform Engineer',
    avatar: '🚀',
    description: 'Specializes in Docker, Kubernetes, CI/CD pipelines, Prometheus/Grafana, Redis caching, and zero-downtime deployments.',
    tone: 'Pragmatic, automation-focused, configuration snippets, security hardening.',
    promptPrefix: 'You are a Senior DevOps & SRE Lead. Focus on CI/CD pipelines, Docker, Kubernetes, monitoring, and infrastructure resilience.',
    badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  },
  {
    id: 'persona-sec',
    name: 'Security Engineer AI',
    roleTitle: 'AppSec & OAuth/JWT Lead',
    avatar: '🛡️',
    description: 'Focuses on vulnerability detection, OWASP Top 10, JWT security, OAuth2 workflows, and RBAC enforcement.',
    tone: 'Rigorous, audit-oriented, zero-trust security focus.',
    promptPrefix: 'You are a Cybersecurity Engineer specializing in Application Security, JWT/OAuth2 authentication, RBAC, and secure coding practices.',
    badgeColor: 'bg-red-500/10 text-red-500 border-red-500/20',
  },
  {
    id: 'persona-pm',
    name: 'Product & Scrum Lead AI',
    roleTitle: 'Agile Delivery & Roadmap Lead',
    avatar: '📊',
    description: 'Generates user stories, sprint backlogs, release plans, dependency maps, and risk assessments.',
    tone: 'Action-oriented, structured bullet points, clear acceptance criteria.',
    promptPrefix: 'You are a Senior Product Manager & Scrum Master. Generate structured user stories, sprint breakdown, and clear engineering acceptance criteria.',
    badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'FinTech Payment Engine v2',
    key: 'PAY',
    description: 'High-throughput event-driven microservices platform with real-time settlement.',
    status: 'active',
    sprint: 'Sprint 14 - WebSocket & Analytics',
    teamMembers: ['u-1', 'u-2', 'u-3', 'u-4', 'u-5', 'u-6', 'u-7'],
  },
  {
    id: 'proj-2',
    name: 'AI Engineering Platform',
    key: 'AEP',
    description: 'Unified collaboration tool combining Slack chat, Jira tasks, Notion docs & AI coaching.',
    status: 'active',
    sprint: 'Sprint 3 - Manager Analytics Engine',
    teamMembers: ['u-1', 'u-2', 'u-3', 'u-4'],
  },
];

export const MOCK_CHANNELS: Channel[] = [
  { id: 'ch-1', projectId: 'proj-1', name: 'general-engineering', description: 'Cross-functional engineering announcements and core discussions', type: 'public' },
  { id: 'ch-2', projectId: 'proj-1', name: 'spring-boot-architecture', description: 'Deep dive into Spring Boot 3, Spring Security, and JPA entities', type: 'ai-assisted' },
  { id: 'ch-3', projectId: 'proj-1', name: 'websocket-realtime', description: 'Designing high-concurrency WebSocket event brokers & STOMP messaging', type: 'public' },
  { id: 'ch-4', projectId: 'proj-1', name: 'devops-ci-cd', description: 'Docker builds, Redis cluster caching, and Cloud Run deployments', type: 'public' },
  { id: 'ch-5', projectId: 'proj-1', name: 'manager-health-desk', description: 'Private channel for engineering leads and managers', type: 'private' },
];

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    channelId: 'ch-2',
    senderId: 'u-3',
    senderName: 'Vikram Patel',
    senderRole: 'Developer',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'Team, I am running into a `LazyInitializationException` when fetching User roles inside `@PreAuthorize("@roleEvaluator.hasRole(authentication, #id)")`. How should we structure the Spring Security FilterChain to avoid opening session in view?',
    timestamp: '10:14 AM',
    threadCount: 3,
    lastReplyAt: '10:22 AM',
    reactions: [
      { emoji: '👍', count: 3, users: ['u-1', 'u-2', 'u-4'] },
      { emoji: '☕', count: 2, users: ['u-1', 'u-3'] }
    ],
    codeSnippet: {
      language: 'java',
      filename: 'SecurityConfig.java',
      code: `@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
        )
        .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
}`
    },
  },
  {
    id: 'm-2',
    channelId: 'ch-2',
    senderId: 'u-1',
    senderName: 'Alex Rivera',
    senderRole: 'Architect',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: '@Vikram Patel Excellent question. `LazyInitializationException` occurs because stateless JWT filters execute outside the Spring Data JPA Transactional boundary. We should fetch the roles eagerly using `@EntityGraph(attributePaths = {"roles", "permissions"})` in `UserRepository.findByEmailFetchRoles()`. Let us ask @Senior Java Lead AI to review the repository query pattern.',
    timestamp: '10:18 AM',
    reactions: [
      { emoji: '🔥', count: 4, users: ['u-2', 'u-3', 'u-4', 'u-7'] }
    ],
    isPinned: true,
  },
  {
    id: 'm-3',
    channelId: 'ch-2',
    senderId: 'ai-java',
    senderName: 'Senior Java Lead AI',
    senderRole: 'Architect',
    senderAvatar: '☕',
    isAI: true,
    aiPersonaId: 'persona-java',
    content: 'Here is the production-ready JPA repository implementation using `@EntityGraph` to eagerly fetch user authorities in a single SELECT query without N+1 problem:',
    timestamp: '10:19 AM',
    codeSnippet: {
      language: 'java',
      filename: 'UserRepository.java',
      code: `package com.enterprise.platform.repository;

import com.enterprise.platform.entity.UserEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {

    @EntityGraph(attributePaths = {"roles", "roles.permissions"})
    Optional<UserEntity> findByEmailWithAuthorities(String email);
}`
    },
    reactions: [
      { emoji: '🚀', count: 5, users: ['u-1', 'u-2', 'u-3', 'u-4', 'u-5'] }
    ]
  },
  {
    id: 'm-4',
    channelId: 'ch-3',
    senderId: 'u-4',
    senderName: 'Elena Rostova',
    senderRole: 'DevOps',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    content: 'WebSocket STOMP broker is deployed on Kubernetes namespace `ai-collab-prod`. We enabled Redis pub/sub backplane for clustering 10,000+ simultaneous connections. Latency benchmarks show sub-15ms frame delivery across regions! 🌐',
    timestamp: '11:05 AM',
    reactions: [
      { emoji: '🎉', count: 6, users: ['u-1', 'u-2', 'u-3', 'u-5', 'u-6', 'u-7'] }
    ]
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't-1',
    key: 'PAY-101',
    title: 'Implement JWT Stateless Authentication & Spring Security 6',
    description: 'Configure SecurityFilterChain, custom JwtAuthenticationFilter, and refresh token rotation in Redis.',
    status: 'done',
    priority: 'high',
    assigneeId: 'u-3',
    assigneeName: 'Vikram Patel',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-1',
    sprint: 'Sprint 14',
    storyPoints: 8,
    createdAt: '2026-07-20',
    updatedAt: '2026-07-25',
    tags: ['Security', 'Spring-Boot', 'JWT'],
  },
  {
    id: 't-2',
    key: 'PAY-102',
    title: 'Design Excel-style Manager Analytics Grid Component',
    description: 'Implement multi-column sort, filter, export, and employee competence scores in React 19.',
    status: 'in_progress',
    priority: 'critical',
    assigneeId: 'u-1',
    assigneeName: 'Alex Rivera',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-1',
    sprint: 'Sprint 14',
    storyPoints: 13,
    createdAt: '2026-07-22',
    updatedAt: '2026-07-27',
    tags: ['Frontend', 'Analytics', 'React'],
  },
  {
    id: 't-3',
    key: 'PAY-103',
    title: 'Fix LazyInitializationException in User Authority Resolver',
    description: 'Investigate Hibernate session boundaries during stateless OAuth/JWT validation.',
    status: 'blocked',
    priority: 'high',
    assigneeId: 'u-3',
    assigneeName: 'Vikram Patel',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-1',
    sprint: 'Sprint 14',
    storyPoints: 5,
    blockedReason: 'Awaiting architectural guidance on EntityGraph vs DTO projections in Spring Security Filter.',
    createdAt: '2026-07-26',
    updatedAt: '2026-07-27',
    tags: ['Backend', 'Spring-Data', 'Bug'],
  },
  {
    id: 't-4',
    key: 'PAY-104',
    title: 'Dockerize Spring Boot Service with Multi-Stage Build & Distroless',
    description: 'Optimize Docker container image size from 650MB to <180MB using Java 21 JLINK.',
    status: 'code_review',
    priority: 'medium',
    assigneeId: 'u-4',
    assigneeName: 'Elena Rostova',
    assigneeAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-1',
    sprint: 'Sprint 14',
    storyPoints: 5,
    createdAt: '2026-07-24',
    updatedAt: '2026-07-27',
    tags: ['DevOps', 'Docker', 'Kubernetes'],
  },
  {
    id: 't-5',
    key: 'PAY-105',
    title: 'Write Automated End-to-End WebSocket Load Tests with Locust',
    description: 'Simulate 5,000 concurrent WebSocket connections sending real-time chat frames.',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'u-5',
    assigneeName: 'Marcus Vance',
    assigneeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-1',
    sprint: 'Sprint 14',
    storyPoints: 5,
    createdAt: '2026-07-25',
    updatedAt: '2026-07-25',
    tags: ['QA', 'WebSocket', 'LoadTesting'],
  },
];

export const MOCK_ANALYTICS: EmployeeAnalytics[] = [
  {
    id: 'ana-1',
    userId: 'u-3',
    employeeName: 'Vikram Patel',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-1',
    projectName: 'FinTech Payment Engine v2',
    sprint: 'Sprint 14',
    assignedTasks: 8,
    completedTasks: 5,
    pendingTasks: 2,
    blockedTasks: 1,
    communicationScore: 84,
    backendKnowledge: 78,
    frontendKnowledge: 45,
    databaseKnowledge: 72,
    securityKnowledge: 62,
    architectureUnderstanding: 65,
    testingKnowledge: 70,
    documentationQuality: 74,
    repeatedTechnicalQuestionsCount: 4,
    reviewCommentsCount: 12,
    riskIndicators: ['Blocked task on Spring Security filter', 'Repeated questions on JPA Lazy Loading'],
    overallEngineeringScore: 73,
    recommendations: [
      {
        topic: 'Spring Security 6 Fundamentals & JPA Entity Graph',
        reason: 'Observed 4 questions in #spring-boot-architecture regarding stateless filter sessions and N+1 query overhead.',
        confidenceScore: 88,
        suggestedCourseUrl: 'https://spring.io/guides/topicals/spring-security-architecture',
        urgency: 'high',
        observedEvidence: [
          'Conversation on 2026-07-27 in #spring-boot-architecture asking about LazyInitializationException in SecurityFilterChain.',
          'Review comments on PR #142 concerning transaction context propagation.'
        ],
      },
      {
        topic: 'Advanced Database Indexing & Query Tuning',
        reason: 'Slight latency spike noted on unindexed composite queries during load tests.',
        confidenceScore: 76,
        urgency: 'medium',
        observedEvidence: ['Exceeded 200ms threshold on unindexed email query.'],
      }
    ],
    historicalScores: [
      { month: 'Apr', score: 62 },
      { month: 'May', score: 65 },
      { month: 'Jun', score: 69 },
      { month: 'Jul', score: 73 },
    ],
  },
  {
    id: 'ana-2',
    userId: 'u-1',
    employeeName: 'Alex Rivera',
    role: 'Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-1',
    projectName: 'FinTech Payment Engine v2',
    sprint: 'Sprint 14',
    assignedTasks: 10,
    completedTasks: 9,
    pendingTasks: 1,
    blockedTasks: 0,
    communicationScore: 96,
    backendKnowledge: 95,
    frontendKnowledge: 88,
    databaseKnowledge: 92,
    securityKnowledge: 90,
    architectureUnderstanding: 98,
    testingKnowledge: 85,
    documentationQuality: 95,
    repeatedTechnicalQuestionsCount: 0,
    reviewCommentsCount: 34,
    riskIndicators: ['High review load - single point of architectural approval'],
    overallEngineeringScore: 94,
    recommendations: [
      {
        topic: 'Delegated Architectural Leadership',
        reason: 'High consultation frequency from mid-level engineers. Recommend pair architectural reviews to distribute review velocity.',
        confidenceScore: 82,
        urgency: 'medium',
        observedEvidence: ['Participated in 34 code reviews and answered 15 architectural queries this sprint.'],
      }
    ],
    historicalScores: [
      { month: 'Apr', score: 91 },
      { month: 'May', score: 92 },
      { month: 'Jun', score: 93 },
      { month: 'Jul', score: 94 },
    ],
  },
  {
    id: 'ana-3',
    userId: 'u-4',
    employeeName: 'Elena Rostova',
    role: 'DevOps',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-1',
    projectName: 'FinTech Payment Engine v2',
    sprint: 'Sprint 14',
    assignedTasks: 6,
    completedTasks: 5,
    pendingTasks: 1,
    blockedTasks: 0,
    communicationScore: 90,
    backendKnowledge: 85,
    frontendKnowledge: 50,
    databaseKnowledge: 88,
    securityKnowledge: 94,
    architectureUnderstanding: 86,
    testingKnowledge: 82,
    documentationQuality: 92,
    repeatedTechnicalQuestionsCount: 1,
    reviewCommentsCount: 18,
    riskIndicators: [],
    overallEngineeringScore: 89,
    recommendations: [
      {
        topic: 'Kubernetes Operator Pattern in Go / Java',
        reason: 'Proactively setting up auto-scaling CRDs for WebSocket pod replicas.',
        confidenceScore: 85,
        urgency: 'low',
        observedEvidence: ['Successfully deployed Redis WebSocket backplane with zero downtime.'],
      }
    ],
    historicalScores: [
      { month: 'Apr', score: 84 },
      { month: 'May', score: 86 },
      { month: 'Jun', score: 88 },
      { month: 'Jul', score: 89 },
    ],
  },
  {
    id: 'ana-4',
    userId: 'u-7',
    employeeName: 'David Kim',
    role: 'Intern',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    projectId: 'proj-1',
    projectName: 'FinTech Payment Engine v2',
    sprint: 'Sprint 14',
    assignedTasks: 4,
    completedTasks: 2,
    pendingTasks: 2,
    blockedTasks: 0,
    communicationScore: 88,
    backendKnowledge: 58,
    frontendKnowledge: 62,
    databaseKnowledge: 50,
    securityKnowledge: 42,
    architectureUnderstanding: 40,
    testingKnowledge: 52,
    documentationQuality: 80,
    repeatedTechnicalQuestionsCount: 6,
    reviewCommentsCount: 8,
    riskIndicators: ['Rapid learning curve needed for Spring Security & REST DTO Mappers'],
    overallEngineeringScore: 61,
    recommendations: [
      {
        topic: 'Java 21 Virtual Threads & Modern Concurrency',
        reason: 'Multiple queries regarding async task handling and thread safety.',
        confidenceScore: 92,
        urgency: 'high',
        observedEvidence: [
          'Asked 3 clarification questions in #general-engineering on async thread execution.',
          'Assigned task PAY-108 requires non-blocking IO understanding.'
        ],
      }
    ],
    historicalScores: [
      { month: 'Apr', score: 45 },
      { month: 'May', score: 50 },
      { month: 'Jun', score: 56 },
      { month: 'Jul', score: 61 },
    ],
  },
];

export const MOCK_KNOWLEDGE_DOCS: KnowledgeDoc[] = [
  {
    id: 'doc-1',
    title: 'ADR-004: Standardizing Spring Boot 3 & Java 21 Layered Architecture',
    category: 'architecture',
    content: `# Architectural Decision Record: Spring Boot 3 Layered Pattern

## Status
Accepted

## Context
Our enterprise backend platform requires clear separation of concerns, strict DTO boundaries, and transactional integrity across microservices handling high transaction volumes.

## Decision
We enforce a strict 6-layer architecture:
1. **Controller Layer**: REST Endpoints using \`@RestController\`, swagger annotations, and \`ResponseEntity<DTO>\`.
2. **Service Layer**: Business logic wrapped in \`@Service\` and \`@Transactional(readOnly = true)\`.
3. **Repository Layer**: Spring Data JPA repositories extending \`JpaRepository\` with \`@EntityGraph\`.
4. **Entity Layer**: JPA Entities mapping normalized PostgreSQL tables with UUID primary keys.
5. **DTO & Mapper**: Record classes for immutable data transfers mapped using MapStruct.
6. **Security Filter Layer**: Custom JwtAuthenticationFilter + stateless SecurityFilterChain.

## Code Standards
\`\`\`java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    @Override
    @Transactional
    public PaymentDTO processPayment(CreatePaymentRequest request) {
        PaymentEntity entity = paymentMapper.toEntity(request);
        entity.setStatus(PaymentStatus.PROCESSING);
        return paymentMapper.toDto(paymentRepository.save(entity));
    }
}
\`\`\``,
    authorName: 'Alex Rivera (Architect)',
    createdAt: '2026-07-15',
    updatedAt: '2026-07-26',
    tags: ['Architecture', 'Spring-Boot', 'Java-21', 'ADR'],
  },
  {
    id: 'doc-2',
    title: 'WebSocket STOMP Real-time Event Broker Runbook',
    category: 'runbook',
    content: `# WebSocket Event Broker Deployment & Operations

## Overview
Describes connection lifecycle, STOMP endpoint subscriptions (\`/topic/channel.{id}\`), Redis pub/sub backplane, and heartbeat handling.

## Endpoints
- **WebSocket Endpoint**: \`ws://api.enterprise.ai/ws/chat\`
- **STOMP Subscriptions**: \`/topic/channels/{channelId}\`, \`/user/queue/notifications\`
- **Heartbeat Config**: 10,000ms ping interval.`,
    authorName: 'Elena Rostova (DevOps)',
    createdAt: '2026-07-18',
    updatedAt: '2026-07-25',
    tags: ['WebSocket', 'Redis', 'Runbook'],
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-07-27 10:19:04',
    userId: 'ai-java',
    userName: 'Senior Java Lead AI',
    userRole: 'Architect',
    action: 'AI_ASSISTANCE_INVOKED',
    details: 'Generated JPA EntityGraph code solution for LazyInitializationException in channel #spring-boot-architecture.',
    ipAddress: '10.240.0.12',
    severity: 'info',
  },
  {
    id: 'log-2',
    timestamp: '2026-07-27 09:45:12',
    userId: 'u-2',
    userName: 'Sarah Chen',
    userRole: 'Manager',
    action: 'MANAGER_REPORT_EXPORT',
    details: 'Exported Engineering Health & Competence Matrix CSV for Sprint 14.',
    ipAddress: '192.168.1.45',
    severity: 'info',
  },
  {
    id: 'log-3',
    timestamp: '2026-07-27 08:30:00',
    userId: 'u-4',
    userName: 'Elena Rostova',
    userRole: 'DevOps',
    action: 'DEPLOYMENT_CONFIG_UPDATE',
    details: 'Updated Redis cluster replica count to 3 nodes on Cloud Run / GKE.',
    ipAddress: '10.240.4.88',
    severity: 'info',
  },
  {
    id: 'log-4',
    timestamp: '2026-07-26 16:20:11',
    userId: 'u-1',
    userName: 'Alex Rivera',
    userRole: 'Architect',
    action: 'KNOWLEDGE_DOC_PUBLISHED',
    details: 'Created ADR-004: Standardizing Spring Boot 3 & Java 21 Layered Architecture.',
    ipAddress: '192.168.1.10',
    severity: 'info',
  }
];
