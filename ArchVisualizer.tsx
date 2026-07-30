import React, { useState } from 'react';
import {
  Database,
  Layers,
  Server,
  Key,
  Lock,
  Code,
  ShieldCheck,
  ChevronRight,
  Terminal,
  Cpu,
  FileCode,
  ArrowRight
} from 'lucide-react';
import { CodeBlock } from '../Chat/CodeBlock';

export const ArchVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'er-diagram' | 'spring-boot-layers' | 'rest-api'>('spring-boot-layers');
  const [selectedLayer, setSelectedLayer] = useState<string>('controller');

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Header Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
              <span>Enterprise Architecture & PostgreSQL Schema</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold">
                JAVA 21 / SPRING BOOT 3
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Normalized PostgreSQL Schema, Spring Data JPA Entities, and Layered Architecture Specifications.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('spring-boot-layers')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === 'spring-boot-layers'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Spring Boot 3 Layers</span>
          </button>

          <button
            onClick={() => setActiveTab('er-diagram')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === 'er-diagram'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>PostgreSQL ER Diagram</span>
          </button>

          <button
            onClick={() => setActiveTab('rest-api')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === 'rest-api'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>REST API Contracts</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* TAB 1: Spring Boot 3 Layered Architecture Breakdown */}
        {activeTab === 'spring-boot-layers' && (
          <div className="space-y-6 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Standardized 6-Layer Spring Boot Architecture</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { id: 'controller', label: '1. Controller', role: 'REST Endpoints', color: 'border-cyan-500' },
                  { id: 'service', label: '2. Service', role: 'Business Logic', color: 'border-indigo-500' },
                  { id: 'repository', label: '3. Repository', role: 'Spring Data JPA', color: 'border-purple-500' },
                  { id: 'entity', label: '4. Entity', role: 'PostgreSQL Tables', color: 'border-emerald-500' },
                  { id: 'dto', label: '5. DTO Record', role: 'Immutable Payload', color: 'border-amber-500' },
                  { id: 'security', label: '6. Security Filter', role: 'JWT & OAuth2', color: 'border-rose-500' },
                ].map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${layer.color} ${
                      selectedLayer === layer.id
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 shadow-md font-bold'
                        : 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{layer.label}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{layer.role}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Layer Source Code Showcase */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-white font-mono text-xs shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-amber-400 flex items-center space-x-2">
                  <Terminal className="w-4 h-4" />
                  <span>Production Code Reference: {selectedLayer.toUpperCase()} LAYER</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Java 21 / Spring Boot 3.2</span>
              </div>

              {selectedLayer === 'controller' && (
                <CodeBlock
                  language="java"
                  filename="ChatController.java"
                  code={`package com.enterprise.platform.controller;

import com.enterprise.platform.dto.ChatMessageDTO;
import com.enterprise.platform.dto.SendMessageRequest;
import com.enterprise.platform.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/channels/{channelId}/messages")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping
    @PreAuthorize("hasAnyRole('DEVELOPER', 'MANAGER', 'ARCHITECT')")
    public ResponseEntity<List<ChatMessageDTO>> getChannelMessages(@PathVariable String channelId) {
        return ResponseEntity.ok(chatService.getMessagesByChannel(channelId));
    }

    @PostMapping
    public ResponseEntity<ChatMessageDTO> sendMessage(
            @PathVariable String channelId,
            @Valid @RequestBody SendMessageRequest request) {
        return ResponseEntity.ok(chatService.postMessage(channelId, request));
    }
}`}
                />
              )}

              {selectedLayer === 'service' && (
                <CodeBlock
                  language="java"
                  filename="ChatServiceImpl.java"
                  code={`package com.enterprise.platform.service.impl;

import com.enterprise.platform.entity.MessageEntity;
import com.enterprise.platform.repository.MessageRepository;
import com.enterprise.platform.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatServiceImpl implements ChatService {

    private final MessageRepository messageRepository;

    @Override
    @Transactional
    public ChatMessageDTO postMessage(String channelId, SendMessageRequest req) {
        MessageEntity entity = MessageEntity.builder()
                .channelId(channelId)
                .content(req.content())
                .senderId(req.senderId())
                .build();
        return MessageMapper.toDTO(messageRepository.save(entity));
    }
}`}
                />
              )}

              {selectedLayer === 'repository' && (
                <CodeBlock
                  language="java"
                  filename="MessageRepository.java"
                  code={`package com.enterprise.platform.repository;

import com.enterprise.platform.entity.MessageEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<MessageEntity, String> {

    @EntityGraph(attributePaths = {"reactions", "attachments"})
    List<MessageEntity> findByChannelIdOrderByTimestampAsc(String channelId);
}`}
                />
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PostgreSQL ER Diagram Visualizer */}
        {activeTab === 'er-diagram' && (
          <div className="space-y-6 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center space-x-2">
                <Database className="w-4 h-4 text-emerald-500" />
                <span>Normalized PostgreSQL ER Schema Diagram</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
                {/* Table 1: users */}
                <div className="p-3 rounded-xl border border-indigo-500/30 bg-indigo-50/20 dark:bg-indigo-950/20 space-y-2">
                  <div className="font-bold text-indigo-600 dark:text-indigo-400 border-b border-indigo-500/20 pb-1 flex justify-between">
                    <span>users</span>
                    <span className="text-[10px] text-slate-400">TABLE</span>
                  </div>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                    <li className="font-bold text-amber-500">🔑 id (UUID) PK</li>
                    <li>name (VARCHAR 255)</li>
                    <li>email (VARCHAR 255) UNIQUE</li>
                    <li>role (VARCHAR 50) ENUM</li>
                    <li>department (VARCHAR 100)</li>
                  </ul>
                </div>

                {/* Table 2: messages */}
                <div className="p-3 rounded-xl border border-purple-500/30 bg-purple-50/20 dark:bg-purple-950/20 space-y-2">
                  <div className="font-bold text-purple-600 dark:text-purple-400 border-b border-purple-500/20 pb-1 flex justify-between">
                    <span>messages</span>
                    <span className="text-[10px] text-slate-400">TABLE</span>
                  </div>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                    <li className="font-bold text-amber-500">🔑 id (UUID) PK</li>
                    <li className="text-indigo-400">🔗 channel_id (UUID) FK</li>
                    <li className="text-indigo-400">🔗 sender_id (UUID) FK</li>
                    <li>content (TEXT)</li>
                    <li>is_pinned (BOOLEAN)</li>
                    <li>created_at (TIMESTAMP)</li>
                  </ul>
                </div>

                {/* Table 3: employee_analytics */}
                <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-2">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/20 pb-1 flex justify-between">
                    <span>employee_analytics</span>
                    <span className="text-[10px] text-slate-400">TABLE</span>
                  </div>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                    <li className="font-bold text-amber-500">🔑 id (UUID) PK</li>
                    <li className="text-indigo-400">🔗 user_id (UUID) FK</li>
                    <li>communication_score (INT)</li>
                    <li>backend_knowledge (INT)</li>
                    <li>overall_score (INT)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REST API Contracts */}
        {activeTab === 'rest-api' && (
          <div className="space-y-4 max-w-5xl mx-auto text-xs font-mono">
            {[
              { method: 'POST', path: '/api/ai/persona-chat', desc: 'Invoke AI Technical Persona with channel context & prompt' },
              { method: 'POST', path: '/api/ai/analyze-health', desc: 'Generate evidence-based employee training recommendations' },
              { method: 'GET', path: '/api/v1/channels/{id}/messages', desc: 'Fetch paginated channel messages with reactions & snippets' },
              { method: 'POST', path: '/api/ai/generate-sprint', desc: 'Auto-generate Jira sprint tasks for project objectives' },
            ].map((endpoint, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      endpoint.method === 'POST'
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{endpoint.path}</span>
                </div>
                <span className="text-slate-500 dark:text-slate-400 font-sans text-[11px]">{endpoint.desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
