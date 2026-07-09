import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  Assistant,
  AssistantId,
  AssistantPrompt,
  AssistantHistoryItem,
  AssistantStoreState,
  AssistantCategory,
} from "@/types/assistant";

function createMockAssistants(): Assistant[] {
  return [
    {
      id: "career-coach",
      name: "Career Coach",
      description: "Strategic career guidance and professional development planning",
      initials: "CC",
      status: "online",
      provider: "Anthropic",
      model: "Claude 3.5 Sonnet",
      category: "career",
      lastActivity: "2 min ago",
      favorite: true,
      pinned: true,
      capabilities: [
        { id: "c1", name: "Career Planning", description: "Long-term career strategy and roadmap", icon: "Target" },
        { id: "c2", name: "Industry Insights", description: "Market trends and opportunities", icon: "TrendingUp" },
        { id: "c3", name: "Skill Gap Analysis", description: "Identify skills needed for career growth", icon: "BarChart3" },
        { id: "c4", name: "Goal Setting", description: "SMART career goal framework", icon: "Flag" },
      ],
      tools: [
        { id: "t1", name: "Career Path Explorer", description: "Visualize career trajectories", enabled: true },
        { id: "t2", name: "Salary Benchmark", description: "Industry salary comparisons", enabled: true },
        { id: "t3", name: "Market Analysis", description: "Job market trends", enabled: false },
      ],
      supportedLanguages: ["English", "Spanish", "French", "German"],
      memory: [
        { id: "m1", key: "Current Role", value: "Senior Software Engineer", updatedAt: "2026-07-08T10:00:00Z" },
        { id: "m2", key: "Career Goal", value: "Engineering Director within 3 years", updatedAt: "2026-07-07T14:30:00Z" },
        { id: "m3", key: "Preferred Industry", value: "Enterprise SaaS", updatedAt: "2026-07-06T09:15:00Z" },
      ],
      prompts: [
        { id: "p1", title: "Career Roadmap", content: "Create a 5-year career roadmap for a senior engineer", pinned: true },
        { id: "p2", title: "Promotion Strategy", content: "How to prepare for a promotion to director level", pinned: true },
        { id: "p3", title: "Industry Switch", content: "Transitioning from fintech to healthtech", pinned: false },
      ],
      recentHistory: [
        { id: "h1", query: "What skills do I need for a CTO role?", response: "Based on your profile...", timestamp: "2026-07-09T08:00:00Z", favorite: true },
        { id: "h2", query: "Compare career paths in AI vs Blockchain", response: "Both fields offer...", timestamp: "2026-07-08T16:30:00Z", favorite: false },
        { id: "h3", query: "How to negotiate a senior role offer?", response: "When negotiating...", timestamp: "2026-07-08T11:20:00Z", favorite: false },
      ],
      workflows: [
        { title: "Career Transition Plan", description: "Step-by-step career change strategy", steps: 5, category: "career" },
        { title: "Leadership Assessment", description: "Evaluate readiness for management", steps: 4, category: "career" },
      ],
      stats: { totalQueries: 2847, queriesToday: 12, avgResponseTime: 1.2, satisfactionRate: 94, tokensUsed: 842000, tokensToday: 3800 },
      tokenUsage: { used: 842000, limit: 1000000, unit: "tokens" },
      latency: 420,
      cost: 12.84,
      backendHook: "/api/assistants/career-coach",
    },
    {
      id: "cv-expert",
      name: "CV Expert",
      description: "Professional CV writing and optimization specialist",
      initials: "CE",
      status: "online",
      provider: "OpenAI",
      model: "GPT-4 Turbo",
      category: "cv",
      lastActivity: "5 min ago",
      favorite: true,
      pinned: true,
      capabilities: [
        { id: "c1", name: "CV Optimization", description: "ATS-friendly formatting and keywords", icon: "FileText" },
        { id: "c2", name: "Content Rewriting", description: "Powerful bullet points and achievements", icon: "Edit3" },
        { id: "c3", name: "Template Selection", description: "Best CV template for your industry", icon: "Layout" },
        { id: "c4", name: "Keyword Analysis", description: "Industry-specific keyword optimization", icon: "Search" },
      ],
      tools: [
        { id: "t1", name: "ATS Scanner", description: "Check ATS compatibility", enabled: true },
        { id: "t2", name: "Keyword Optimizer", description: "Industry keyword analysis", enabled: true },
        { id: "t3", name: "Format Converter", description: "Convert between CV formats", enabled: true },
      ],
      supportedLanguages: ["English", "French", "Dutch", "German"],
      memory: [
        { id: "m1", key: "Target Role", value: "Senior Product Manager", updatedAt: "2026-07-09T07:00:00Z" },
        { id: "m2", key: "CV Version", value: "v3.2 - Tech focus", updatedAt: "2026-07-05T13:00:00Z" },
      ],
      prompts: [
        { id: "p1", title: "Improve Bullet Points", content: "Rewrite my experience section with strong action verbs", pinned: true },
        { id: "p2", title: "ATS Checklist", content: "Run ATS compatibility check on my current CV", pinned: true },
      ],
      recentHistory: [
        { id: "h1", query: "Optimize my CV for Google", response: "I've analyzed your CV...", timestamp: "2026-07-09T09:00:00Z", favorite: true },
        { id: "h2", query: "Write a summary for a PM role", response: "Here's a powerful summary...", timestamp: "2026-07-08T14:00:00Z", favorite: false },
      ],
      workflows: [
        { title: "CV Makeover", description: "Complete CV transformation", steps: 6, category: "cv" },
        { title: "ATS Optimization", description: "Maximize ATS score", steps: 4, category: "cv" },
      ],
      stats: { totalQueries: 5621, queriesToday: 18, avgResponseTime: 0.8, satisfactionRate: 97, tokensUsed: 1240000, tokensToday: 6200 },
      tokenUsage: { used: 1240000, limit: 2000000, unit: "tokens" },
      latency: 380,
      cost: 24.50,
      backendHook: "/api/assistants/cv-expert",
    },
    {
      id: "job-hunter",
      name: "Job Hunter",
      description: "Active job search and application tracking assistant",
      initials: "JH",
      status: "online",
      provider: "OpenAI",
      model: "GPT-4o",
      category: "jobs",
      lastActivity: "1 min ago",
      favorite: false,
      pinned: true,
      capabilities: [
        { id: "c1", name: "Job Matching", description: "Find jobs matching your profile", icon: "Briefcase" },
        { id: "c2", name: "Application Tracking", description: "Track all your applications", icon: "ClipboardList" },
        { id: "c3", name: "Company Research", description: "Deep company insights", icon: "Building2" },
        { id: "c4", name: "Salary Insights", description: "Real-time salary data", icon: "DollarSign" },
      ],
      tools: [
        { id: "t1", name: "Job Scanner", description: "Auto-scan job boards", enabled: true },
        { id: "t2", name: "Application Tracker", description: "Track application status", enabled: true },
        { id: "t3", name: "Company Analyzer", description: "Deep company analysis", enabled: false },
      ],
      supportedLanguages: ["English", "German"],
      memory: [
        { id: "m1", key: "Target Companies", value: "Google, Microsoft, Stripe", updatedAt: "2026-07-08T09:00:00Z" },
        { id: "m2", key: "Active Applications", value: "4 in progress", updatedAt: "2026-07-09T08:30:00Z" },
      ],
      prompts: [
        { id: "p1", title: "Find Matching Jobs", content: "Find jobs matching my skills and experience", pinned: true },
        { id: "p2", title: "Application Strategy", content: "Create a weekly application plan", pinned: false },
      ],
      recentHistory: [
        { id: "h1", query: "Find senior software roles in London", response: "Here are 12 matching positions...", timestamp: "2026-07-09T10:00:00Z", favorite: true },
        { id: "h2", query: "Compare company cultures", response: "Based on employee reviews...", timestamp: "2026-07-08T15:00:00Z", favorite: false },
      ],
      workflows: [
        { title: "Job Search Sprint", description: "Intensive 2-week job search", steps: 8, category: "jobs" },
        { title: "Application Tracker", description: "Set up tracking system", steps: 3, category: "jobs" },
      ],
      stats: { totalQueries: 3890, queriesToday: 8, avgResponseTime: 1.1, satisfactionRate: 91, tokensUsed: 960000, tokensToday: 2800 },
      tokenUsage: { used: 960000, limit: 1500000, unit: "tokens" },
      latency: 450,
      cost: 18.20,
      backendHook: "/api/assistants/job-hunter",
    },
    {
      id: "interview-coach",
      name: "Interview Coach",
      description: "Interview preparation and practice specialist",
      initials: "IC",
      status: "busy",
      provider: "Anthropic",
      model: "Claude 3 Opus",
      category: "interview",
      lastActivity: "3 min ago",
      favorite: true,
      pinned: false,
      capabilities: [
        { id: "c1", name: "Mock Interviews", description: "Realistic interview simulations", icon: "Mic" },
        { id: "c2", name: "Question Prep", description: "Common and role-specific questions", icon: "HelpCircle" },
        { id: "c3", name: "Feedback Analysis", description: "Detailed performance feedback", icon: "MessageSquare" },
        { id: "c4", name: "Body Language Tips", description: "Non-verbal communication coaching", icon: "UserCheck" },
      ],
      tools: [
        { id: "t1", name: "Mock Interviewer", description: "AI-powered interview simulation", enabled: true },
        { id: "t2", name: "Question Bank", description: "1000+ interview questions", enabled: true },
        { id: "t3", name: "Feedback Analyzer", description: "Deep response analysis", enabled: false },
      ],
      supportedLanguages: ["English", "Spanish"],
      memory: [
        { id: "m1", key: "Target Company", value: "Google (L5)", updatedAt: "2026-07-09T06:00:00Z" },
        { id: "m2", key: "Interview Stage", value: "Technical Phone Screen", updatedAt: "2026-07-08T20:00:00Z" },
        { id: "m3", key: "Weak Areas", value: "System Design, Behavioral Stories", updatedAt: "2026-07-07T16:00:00Z" },
      ],
      prompts: [
        { id: "p1", title: "System Design Prep", content: "Practice system design interview questions", pinned: true },
        { id: "p2", title: "Behavioral Questions", content: "STAR method practice for behavioral questions", pinned: true },
      ],
      recentHistory: [
        { id: "h1", query: "Run a mock system design interview", response: "Let's start with designing...", timestamp: "2026-07-09T09:30:00Z", favorite: true },
        { id: "h2", query: "Help me with my elevator pitch", response: "A strong elevator pitch...", timestamp: "2026-07-08T13:00:00Z", favorite: false },
      ],
      workflows: [
        { title: "Interview Prep Plan", description: "2-week interview preparation", steps: 7, category: "interview" },
        { title: "Mock Interview Session", description: "Full mock interview experience", steps: 5, category: "interview" },
      ],
      stats: { totalQueries: 4521, queriesToday: 15, avgResponseTime: 1.8, satisfactionRate: 96, tokensUsed: 2100000, tokensToday: 7200 },
      tokenUsage: { used: 2100000, limit: 3000000, unit: "tokens" },
      latency: 620,
      cost: 42.00,
      backendHook: "/api/assistants/interview-coach",
    },
    {
      id: "learning-mentor",
      name: "Learning Mentor",
      description: "Personalized learning paths and skill development",
      initials: "LM",
      status: "online",
      provider: "Google",
      model: "Gemini Pro",
      category: "learning",
      lastActivity: "10 min ago",
      favorite: false,
      pinned: true,
      capabilities: [
        { id: "c1", name: "Learning Paths", description: "Custom curriculum design", icon: "BookOpen" },
        { id: "c2", name: "Resource Curation", description: "Best learning resources", icon: "Library" },
        { id: "c3", name: "Progress Tracking", description: "Skill development tracking", icon: "TrendingUp" },
        { id: "c4", name: "Assessment", description: "Knowledge checks and quizzes", icon: "ClipboardCheck" },
      ],
      tools: [
        { id: "t1", name: "Path Builder", description: "Create learning paths", enabled: true },
        { id: "t2", name: "Resource Finder", description: "Find best courses", enabled: true },
      ],
      supportedLanguages: ["English", "Japanese", "Korean"],
      memory: [
        { id: "m1", key: "Learning Goals", value: "Cloud Architecture, AI/ML", updatedAt: "2026-07-08T12:00:00Z" },
        { id: "m2", key: "Current Course", value: "AWS Solutions Architect", updatedAt: "2026-07-09T08:00:00Z" },
      ],
      prompts: [
        { id: "p1", title: "Weekly Study Plan", content: "Create a weekly study schedule for cloud architecture", pinned: true },
      ],
      recentHistory: [
        { id: "h1", query: "Design a 3-month AI learning path", response: "Here's a comprehensive path...", timestamp: "2026-07-09T07:00:00Z", favorite: true },
      ],
      workflows: [
        { title: "Skill Development Plan", description: "Structured skill acquisition", steps: 6, category: "learning" },
        { title: "Certification Prep", description: "Exam preparation roadmap", steps: 5, category: "learning" },
      ],
      stats: { totalQueries: 2100, queriesToday: 5, avgResponseTime: 1.5, satisfactionRate: 93, tokensUsed: 520000, tokensToday: 1900 },
      tokenUsage: { used: 520000, limit: 800000, unit: "tokens" },
      latency: 510,
      cost: 8.40,
      backendHook: "/api/assistants/learning-mentor",
    },
    {
      id: "skill-advisor",
      name: "Skill Advisor",
      description: "Skills assessment and development recommendations",
      initials: "SA",
      status: "away",
      provider: "Mistral",
      model: "Mistral Large",
      category: "skills",
      lastActivity: "25 min ago",
      favorite: false,
      pinned: false,
      capabilities: [
        { id: "c1", name: "Skill Assessment", description: "Comprehensive skill evaluation", icon: "CheckSquare" },
        { id: "c2", name: "Gap Analysis", description: "Identify skill gaps", icon: "Search" },
        { id: "c3", name: "Recommendations", description: "Personalized skill recommendations", icon: "Lightbulb" },
        { id: "c4", name: "Market Demand", description: "In-demand skills tracking", icon: "TrendingUp" },
      ],
      tools: [
        { id: "t1", name: "Skill Scanner", description: "Scan for skill gaps", enabled: true },
        { id: "t2", name: "Market Analyzer", description: "Market demand analysis", enabled: false },
      ],
      supportedLanguages: ["English", "French"],
      memory: [
        { id: "m1", key: "Current Skills", value: "Python, JS, AWS, ML", updatedAt: "2026-07-07T10:00:00Z" },
      ],
      prompts: [
        { id: "p1", title: "Skill Gap Analysis", content: "Analyze my current skills vs target role requirements", pinned: true },
      ],
      recentHistory: [
        { id: "h1", query: "What are the top skills for 2026?", response: "Based on market data...", timestamp: "2026-07-08T10:00:00Z", favorite: false },
      ],
      workflows: [
        { title: "Skills Audit", description: "Complete skills inventory", steps: 4, category: "skills" },
      ],
      stats: { totalQueries: 1650, queriesToday: 3, avgResponseTime: 0.9, satisfactionRate: 88, tokensUsed: 380000, tokensToday: 1200 },
      tokenUsage: { used: 380000, limit: 500000, unit: "tokens" },
      latency: 340,
      cost: 5.60,
      backendHook: "/api/assistants/skill-advisor",
    },
    {
      id: "salary-advisor",
      name: "Salary Advisor",
      description: "Compensation analysis and negotiation strategies",
      initials: "SLA",
      status: "online",
      provider: "OpenAI",
      model: "GPT-4 Turbo",
      category: "salary",
      lastActivity: "8 min ago",
      favorite: false,
      pinned: false,
      capabilities: [
        { id: "c1", name: "Compensation Analysis", description: "Market-rate compensation data", icon: "DollarSign" },
        { id: "c2", name: "Negotiation Prep", description: "Salary negotiation strategies", icon: "Handshake" },
        { id: "c3", name: "Equity Analysis", description: "Stock option and equity evaluation", icon: "PieChart" },
        { id: "c4", name: "Benefits Comparison", description: "Total compensation comparison", icon: "Scale" },
      ],
      tools: [
        { id: "t1", name: "Salary Calculator", description: "Market rate calculator", enabled: true },
        { id: "t2", name: "Equity Evaluator", description: "Stock option value estimator", enabled: true },
        { id: "t3", name: "Negotiation Simulator", description: "Practice negotiation conversations", enabled: false },
      ],
      supportedLanguages: ["English"],
      memory: [
        { id: "m1", key: "Current Salary", value: "$180,000 base + equity", updatedAt: "2026-07-01T09:00:00Z" },
        { id: "m2", key: "Target Range", value: "$220,000 - $260,000", updatedAt: "2026-07-06T14:00:00Z" },
      ],
      prompts: [
        { id: "p1", title: "Negotiation Script", content: "Create a negotiation script for my upcoming offer", pinned: true },
        { id: "p2", title: "Market Check", content: "What's the market rate for my role?", pinned: false },
      ],
      recentHistory: [
        { id: "h1", query: "Evaluate this equity offer from startup", response: "Let me break down this offer...", timestamp: "2026-07-09T08:00:00Z", favorite: true },
      ],
      workflows: [
        { title: "Compensation Review", description: "Complete compensation analysis", steps: 4, category: "salary" },
        { title: "Offer Negotiation", description: "Step-by-step negotiation guide", steps: 5, category: "salary" },
      ],
      stats: { totalQueries: 1890, queriesToday: 6, avgResponseTime: 0.7, satisfactionRate: 95, tokensUsed: 440000, tokensToday: 2100 },
      tokenUsage: { used: 440000, limit: 600000, unit: "tokens" },
      latency: 310,
      cost: 8.80,
      backendHook: "/api/assistants/salary-advisor",
    },
    {
      id: "recruiter-assistant",
      name: "Recruiter Assistant",
      description: "Recruitment and talent acquisition support",
      initials: "RA",
      status: "offline",
      provider: "Anthropic",
      model: "Claude 3 Sonnet",
      category: "recruiter",
      lastActivity: "1 hour ago",
      favorite: false,
      pinned: false,
      capabilities: [
        { id: "c1", name: "Job Description Writing", description: "Craft compelling job posts", icon: "FileEdit" },
        { id: "c2", name: "Candidate Screening", description: "Resume screening criteria", icon: "Filter" },
        { id: "c3", name: "Interview Questions", description: "Role-specific question sets", icon: "ListChecks" },
        { id: "c4", name: "Offer Management", description: "Offer letter templates and guidance", icon: "ScrollText" },
      ],
      tools: [
        { id: "t1", name: "JD Generator", description: "Job description creator", enabled: true },
        { id: "t2", name: "Screener Bot", description: "Automated screening questions", enabled: false },
      ],
      supportedLanguages: ["English", "Dutch"],
      memory: [],
      prompts: [],
      recentHistory: [],
      workflows: [],
      stats: { totalQueries: 890, queriesToday: 0, avgResponseTime: 1.3, satisfactionRate: 86, tokensUsed: 210000, tokensToday: 0 },
      tokenUsage: { used: 210000, limit: 400000, unit: "tokens" },
      latency: 480,
      cost: 3.60,
      backendHook: "/api/assistants/recruiter-assistant",
    },
    {
      id: "document-assistant",
      name: "Document Assistant",
      description: "Document creation, formatting, and management",
      initials: "DA",
      status: "online",
      provider: "Google",
      model: "Gemini Pro",
      category: "documents",
      lastActivity: "4 min ago",
      favorite: false,
      pinned: false,
      capabilities: [
        { id: "c1", name: "Document Creation", description: "Create professional documents", icon: "FilePlus" },
        { id: "c2", name: "Formatting", description: "Document formatting and styling", icon: "Paintbrush" },
        { id: "c3", name: "Template Management", description: "Document templates library", icon: "Files" },
        { id: "c4", name: "Collaboration", description: "Multi-user document editing", icon: "Users" },
      ],
      tools: [
        { id: "t1", name: "Doc Builder", description: "Document creation wizard", enabled: true },
        { id: "t2", name: "Template Library", description: "Professional templates", enabled: true },
        { id: "t3", name: "Export Tool", description: "Multi-format export", enabled: true },
      ],
      supportedLanguages: ["English", "French", "Spanish", "German", "Dutch"],
      memory: [
        { id: "m1", key: "Recent Documents", value: "Cover letter, Portfolio, Resume", updatedAt: "2026-07-09T09:00:00Z" },
      ],
      prompts: [
        { id: "p1", title: "Cover Letter", content: "Write a cover letter for a senior role application", pinned: true },
      ],
      recentHistory: [
        { id: "h1", query: "Create a professional bio", response: "Here's a compelling professional bio...", timestamp: "2026-07-09T09:00:00Z", favorite: false },
      ],
      workflows: [
        { title: "Document Bundle", description: "Create a complete application package", steps: 5, category: "documents" },
      ],
      stats: { totalQueries: 2340, queriesToday: 9, avgResponseTime: 1.0, satisfactionRate: 92, tokensUsed: 580000, tokensToday: 3100 },
      tokenUsage: { used: 580000, limit: 800000, unit: "tokens" },
      latency: 390,
      cost: 9.60,
      backendHook: "/api/assistants/document-assistant",
    },
    {
      id: "writing-assistant",
      name: "Writing Assistant",
      description: "Professional writing and communication enhancement",
      initials: "WA",
      status: "online",
      provider: "Anthropic",
      model: "Claude 3 Haiku",
      category: "writing",
      lastActivity: "6 min ago",
      favorite: true,
      pinned: false,
      capabilities: [
        { id: "c1", name: "Content Writing", description: "Professional content creation", icon: "PenTool" },
        { id: "c2", name: "Editing & Proofreading", description: "Grammar and style improvement", icon: "SpellCheck" },
        { id: "c3", name: "Tone Adjustment", description: "Adapt writing tone and style", icon: "Sliders" },
        { id: "c4", name: "Summarization", description: "Concise content summarization", icon: "FileText" },
      ],
      tools: [
        { id: "t1", name: "Grammar Checker", description: "Real-time grammar checking", enabled: true },
        { id: "t2", name: "Style Editor", description: "Writing style enhancer", enabled: true },
        { id: "t3", name: "Plagiarism Checker", description: "Content originality check", enabled: false },
      ],
      supportedLanguages: ["English", "Spanish", "French", "German", "Italian", "Portuguese"],
      memory: [
        { id: "m1", key: "Writing Style", value: "Professional yet approachable", updatedAt: "2026-07-07T11:00:00Z" },
        { id: "m2", key: "Frequent Projects", value: "Cover letters, LinkedIn posts, Emails", updatedAt: "2026-07-08T15:00:00Z" },
      ],
      prompts: [
        { id: "p1", title: "Proofread", content: "Proofread and improve this document", pinned: true },
        { id: "p2", title: "LinkedIn Post", content: "Draft a professional LinkedIn post about career growth", pinned: true },
      ],
      recentHistory: [
        { id: "h1", query: "Rewrite my LinkedIn headline", response: "Here are 5 powerful options...", timestamp: "2026-07-09T09:00:00Z", favorite: true },
        { id: "h2", query: "Draft a thank-you email after interview", response: "Here's a professional follow-up...", timestamp: "2026-07-08T17:00:00Z", favorite: false },
      ],
      workflows: [
        { title: "Content Creation", description: "Professional content writing workflow", steps: 4, category: "writing" },
        { title: "Email Writing", description: "Professional email drafting", steps: 3, category: "writing" },
      ],
      stats: { totalQueries: 4100, queriesToday: 14, avgResponseTime: 0.5, satisfactionRate: 98, tokensUsed: 780000, tokensToday: 4200 },
      tokenUsage: { used: 780000, limit: 1000000, unit: "tokens" },
      latency: 250,
      cost: 7.80,
      backendHook: "/api/assistants/writing-assistant",
    },
    {
      id: "general-ai",
      name: "General AI",
      description: "General-purpose AI assistant for any question or task",
      initials: "GA",
      status: "online",
      provider: "OpenAI",
      model: "GPT-4o",
      category: "general",
      lastActivity: "Just now",
      favorite: false,
      pinned: false,
      capabilities: [
        { id: "c1", name: "Question Answering", description: "Answer any question", icon: "HelpCircle" },
        { id: "c2", name: "Research", description: "Deep research and analysis", icon: "Search" },
        { id: "c3", name: "Brainstorming", description: "Creative brainstorming sessions", icon: "Lightbulb" },
        { id: "c4", name: "Problem Solving", description: "Complex problem solving", icon: "Brain" },
      ],
      tools: [
        { id: "t1", name: "Web Search", description: "Real-time web search", enabled: true },
        { id: "t2", name: "Code Interpreter", description: "Execute and analyze code", enabled: true },
        { id: "t3", name: "Image Analysis", description: "Analyze and describe images", enabled: false },
      ],
      supportedLanguages: ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Arabic"],
      memory: [
        { id: "m1", key: "User Context", value: "Software Engineer, Career-focused", updatedAt: "2026-07-01T08:00:00Z" },
      ],
      prompts: [
        { id: "p1", title: "Quick Research", content: "Research a topic and provide a comprehensive summary", pinned: true },
        { id: "p2", title: "Brainstorm", content: "Brainstorm creative solutions to a problem", pinned: false },
      ],
      recentHistory: [
        { id: "h1", query: "Explain quantum computing simply", response: "Quantum computing leverages...", timestamp: "2026-07-09T10:30:00Z", favorite: true },
        { id: "h2", query: "Help me debug this React component", response: "Looking at your code...", timestamp: "2026-07-08T19:00:00Z", favorite: false },
      ],
      workflows: [
        { title: "Research Deep Dive", description: "Comprehensive topic research", steps: 5, category: "general" },
        { title: "Creative Brainstorm", description: "Structured brainstorming session", steps: 4, category: "general" },
      ],
      stats: { totalQueries: 8900, queriesToday: 22, avgResponseTime: 0.6, satisfactionRate: 90, tokensUsed: 3200000, tokensToday: 8500 },
      tokenUsage: { used: 3200000, limit: 5000000, unit: "tokens" },
      latency: 280,
      cost: 32.00,
      backendHook: "/api/assistants/general-ai",
    },
  ];
}

function generateId(): string {
  return `item_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export const useAssistantStore = create<AssistantStoreState>()(
  persist(
    (set, get) => ({
      assistants: createMockAssistants(),
      activeAssistantId: "career-coach",
      searchQuery: "",
      categoryFilter: "all",
      showFavoritesOnly: false,
      showPinnedOnly: false,
      sidebarOpen: true,
      rightPanelOpen: true,
      isLoading: false,
      error: null,

      setActiveAssistant: (id) => set({ activeAssistantId: id }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setCategoryFilter: (category) => set({ categoryFilter: category }),

      setShowFavoritesOnly: (value) => set({ showFavoritesOnly: value }),

      setShowPinnedOnly: (value) => set({ showPinnedOnly: value }),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      setRightPanelOpen: (open) => set({ rightPanelOpen: open }),

      toggleFavorite: (id) =>
        set((s) => ({
          assistants: s.assistants.map((a) =>
            a.id === id ? { ...a, favorite: !a.favorite } : a,
          ),
        })),

      togglePinned: (id) =>
        set((s) => ({
          assistants: s.assistants.map((a) =>
            a.id === id ? { ...a, pinned: !a.pinned } : a,
          ),
        })),

      toggleSidebar: () =>
        set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      toggleRightPanel: () =>
        set((s) => ({ rightPanelOpen: !s.rightPanelOpen })),

      addPrompt: (assistantId, prompt) =>
        set((s) => ({
          assistants: s.assistants.map((a) =>
            a.id === assistantId
              ? { ...a, prompts: [...a.prompts, { ...prompt, id: generateId() }] }
              : a,
          ),
        })),

      removePrompt: (assistantId, promptId) =>
        set((s) => ({
          assistants: s.assistants.map((a) =>
            a.id === assistantId
              ? { ...a, prompts: a.prompts.filter((p) => p.id !== promptId) }
              : a,
          ),
        })),

      togglePromptPinned: (assistantId, promptId) =>
        set((s) => ({
          assistants: s.assistants.map((a) =>
            a.id === assistantId
              ? {
                  ...a,
                  prompts: a.prompts.map((p) =>
                    p.id === promptId ? { ...p, pinned: !p.pinned } : p,
                  ),
                }
              : a,
          ),
        })),

      addHistoryItem: (assistantId, item) =>
        set((s) => ({
          assistants: s.assistants.map((a) =>
            a.id === assistantId
              ? {
                  ...a,
                  recentHistory: [item, ...a.recentHistory].slice(0, 50),
                }
              : a,
          ),
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      filteredAssistants: () => {
        const state = get();
        let filtered = state.assistants;

        if (state.searchQuery) {
          const q = state.searchQuery.toLowerCase();
          filtered = filtered.filter(
            (a) =>
              a.name.toLowerCase().includes(q) ||
              a.description.toLowerCase().includes(q) ||
              a.provider.toLowerCase().includes(q) ||
              a.model.toLowerCase().includes(q),
          );
        }

        if (state.categoryFilter !== "all") {
          filtered = filtered.filter((a) => a.category === state.categoryFilter);
        }

        if (state.showFavoritesOnly) {
          filtered = filtered.filter((a) => a.favorite);
        }

        if (state.showPinnedOnly) {
          filtered = filtered.filter((a) => a.pinned);
        }

        return filtered;
      },

      activeAssistant: () => {
        const state = get();
        if (!state.activeAssistantId) return null;
        return state.assistants.find((a) => a.id === state.activeAssistantId) ?? null;
      },
    }),
    {
      name: "mr-ego-ai-assistants",
      partialize: (state) => ({
        activeAssistantId: state.activeAssistantId,
        sidebarOpen: state.sidebarOpen,
        rightPanelOpen: state.rightPanelOpen,
      }),
    },
  ),
);
