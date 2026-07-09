# AI Integration Plan

## Architecture

Per DP-10 AI-Integration-Layer.md, the AI integration layer provides a unified interface between the UI and AI/ML services. The frontend handles the presentation and interaction layer — AI computation is server-side.

## AI Features by Phase

### Phase DP-18: AI Workspace Foundation

| Feature | Description | Priority |
|---------|-------------|----------|
| Conversation UI | Full chat interface with message threading | P0 |
| Streaming messages | Real-time token-by-token display | P0 |
| Thinking visualization | AI reasoning step display with ThinkingCard | P0 |
| Confidence indicators | ConfidenceBadge on AI responses | P1 |
| Context awareness | ContextBadge showing what context AI is using | P1 |
| Memory indicator | MemoryIndicator showing session memory usage | P1 |
| Conversation management | Create, list, rename, delete conversations | P0 |

### Phase DP-20: CV Analysis

| Feature | Description | Priority |
|---------|-------------|----------|
| CV content analysis | AI parses CV and extracts structured data | P0 |
| Skill gap detection | Identify missing skills for target roles | P0 |
| Optimization suggestions | AI recommendations for CV improvement | P0 |
| ATS compatibility | Score CV against ATS parsing systems | P1 |
| Keyword optimization | Suggest keywords for better matching | P1 |
| Analysis history | Track CV analysis over time | P1 |
| Comparison view | Compare analysis results across CV versions | P2 |

### Phase DP-22: AI Match Scoring

| Feature | Description | Priority |
|---------|-------------|----------|
| Job match score | AI calculates candidate-job fit percentage | P0 |
| Skill relevance | Highlight matching and missing skills per job | P0 |
| Salary prediction | AI estimates salary range based on role/location | P1 |
| Company fit | Cultural/experience fit indicators | P2 |

### Phase DP-24: Application Insights

| Feature | Description | Priority |
|---------|-------------|----------|
| Application status prediction | AI predicts application outcome | P1 |
| Follow-up suggestions | AI recommends timing and content for follow-ups | P1 |
| Interview prep | AI-generated interview questions based on job | P2 |
| Offer analysis | AI evaluates offer competitiveness | P2 |

### Phase DP-30: AI Analytics

| Feature | Description | Priority |
|---------|-------------|----------|
| Career progression insights | AI analyzes career trajectory | P1 |
| Market trend analysis | AI identifies job market trends | P1 |
| Skill demand forecasting | AI predicts in-demand skills | P2 |
| Personalized recommendations | AI suggests career paths | P2 |

## AI Integration Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    UI Components                         │
│  Conversation  StreamingMsg  ThinkingCard  ConfidenceBadge│
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                  AI Integration Layer                     │
│  useAI() hook → AIProvider → AIAPIClient                │
│  Prompt builder → Response parser → State manager       │
└─────────────────────────┬───────────────────────────────┘
                          │ (HTTP/SSE)
┌─────────────────────────▼───────────────────────────────┐
│                  AI/ML Service (Server)                   │
│  LLM Gateway → Prompt Pipeline → Response Generator     │
└─────────────────────────────────────────────────────────┘
```

## API Contract

### Streaming Conversation

```
POST /api/ai/conversation
Request:  { conversationId, message, context }
Response: SSE stream with tokens, thinking steps, confidence
```

### CV Analysis

```
POST /api/ai/cv/analyze
Request:  { cvId, targetRole?, targetIndustry? }
Response: { skills, gaps, score, suggestions, keywords }
```

### Match Scoring

```
POST /api/ai/match
Request:  { cvId, jobId }
Response: { matchScore, matchedSkills, missingSkills, breakdown }
```

## Prompt Safety

- Client-side prompt sanitization before sending to API
- PII stripping: names, emails, phone numbers, addresses filtered
- Max prompt length enforced (4096 tokens)
- Rate limiting per user (configurable)
- All AI interactions logged for auditing
- User confirmation required for AI-initiated actions

## Implementation Sequence

| Step | Phase | Deliverable |
|------|-------|-------------|
| 1 | DP-14 | Build AIProvider context with connection state |
| 2 | DP-14 | Implement SSE streaming client for AI responses |
| 3 | DP-14 | Create AI API client (conversation, analysis, match) |
| 4 | DP-18 | Build conversation UI with streaming |
| 5 | DP-18 | Implement thinking and confidence visualization |
| 6 | DP-18 | Add memory and context indicators |
| 7 | DP-20 | Build CV analysis results visualization |
| 8 | DP-20 | Implement skill gap and suggestion display |
| 9 | DP-22 | Build match score component |
| 10 | DP-24 | Add application insights |
| 11 | DP-30 | Build AI analytics dashboard |
| 12 | DP-31 | Optimize AI streaming performance |

## Future AI Features (Post-DP-32)

- AI Interview Coach (Phase 2)
- Salary Analyst (Phase 2)
- Skill Roadmap Generator (Phase 2)
- AI Mentor (Phase 2)
- Automated CV tailoring per job (Phase 3)
- Voice interface for AI workspace (Phase 5)
- AR career visualization (Phase 7)
