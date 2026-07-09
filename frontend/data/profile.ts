import type {
  ProfileData,
  PersonalInfo,
  CareerIdentity,
  ProfessionalSummary,
  SkillsLanguages,
  ExperienceSnapshot,
  EducationCertifications,
  ProfileDocument,
  ChecklistItem,
  ProfilePreferences,
} from "@/types/profile";

export const demoPersonalInfo: PersonalInfo = {
  fullName: "Alex Chen",
  email: "alex.chen@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "https://alexchen.dev",
  linkedin: "https://linkedin.com/in/alexchen",
  github: "https://github.com/alexchen",
};

export const demoCareerIdentity: CareerIdentity = {
  targetRole: "Senior AI Engineer",
  preferredIndustries: ["Artificial Intelligence", "Machine Learning", "Cloud Computing"],
  currentLevel: "senior",
  availability: "immediately",
  workPreference: "remote",
  contractTypePreference: "permanent",
};

export const demoProfessionalSummary: ProfessionalSummary = {
  bio: "Senior AI Engineer with 8+ years of experience designing and deploying machine learning systems at scale. Passionate about bridging the gap between research and production, with a strong track record of leading cross-functional teams to deliver impactful AI solutions. Expertise in NLP, computer vision, and distributed ML systems.",
  tone: "professional",
};

export const demoSKillsLanguages: SkillsLanguages = {
  technical: [
    { id: "sk-1", name: "Python", level: "expert", endorsements: 24 },
    { id: "sk-2", name: "TensorFlow", level: "expert", endorsements: 18 },
    { id: "sk-3", name: "PyTorch", level: "advanced", endorsements: 15 },
    { id: "sk-4", name: "Kubernetes", level: "advanced", endorsements: 12 },
    { id: "sk-5", name: "AWS", level: "advanced", endorsements: 10 },
    { id: "sk-6", name: "Docker", level: "advanced", endorsements: 14 },
    { id: "sk-7", name: "TypeScript", level: "intermediate", endorsements: 6 },
    { id: "sk-8", name: "Go", level: "intermediate", endorsements: 4 },
    { id: "sk-9", name: "MLOps", level: "advanced", endorsements: 8 },
    { id: "sk-10", name: "Rust", level: "beginner" },
  ],
  soft: [
    { id: "ss-1", name: "Leadership", level: "advanced" },
    { id: "ss-2", name: "Communication", level: "expert" },
    { id: "ss-3", name: "Problem Solving", level: "expert" },
    { id: "ss-4", name: "Team Collaboration", level: "advanced" },
    { id: "ss-5", name: "Project Management", level: "intermediate" },
  ],
  languages: [
    { id: "lang-1", name: "English", level: "native", isNative: true },
    { id: "lang-2", name: "Mandarin", level: "native", isNative: true },
    { id: "lang-3", name: "Japanese", level: "intermediate" },
    { id: "lang-4", name: "German", level: "beginner" },
  ],
};

export const demoExperienceSnapshot: ExperienceSnapshot = {
  totalYears: 8,
  projectsCount: 24,
  certificationsCount: 6,
  recentRoles: [
    {
      id: "exp-1",
      title: "Senior AI Engineer",
      company: "Nexus Technologies",
      location: "San Francisco, CA (Remote)",
      startDate: "2022-03",
      endDate: null,
      current: true,
      description: "Leading ML platform architecture and serving as technical lead for the AI Assistants team. Designing and deploying production ML systems serving 10M+ users.",
    },
    {
      id: "exp-2",
      title: "Machine Learning Engineer",
      company: "DataStream AI",
      location: "San Jose, CA",
      startDate: "2019-01",
      endDate: "2022-02",
      current: false,
      description: "Built real-time NLP pipelines for document understanding. Reduced inference latency by 60% through model optimization and infrastructure improvements.",
    },
    {
      id: "exp-3",
      title: "Backend Engineer",
      company: "CloudCore Systems",
      location: "Austin, TX",
      startDate: "2016-06",
      endDate: "2018-12",
      current: false,
      description: "Developed distributed data processing systems handling 500K+ events per second. Led migration from monolith to microservices architecture.",
    },
  ],
};

export const demoEducationCertifications: EducationCertifications = {
  education: [
    {
      id: "edu-1",
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Computer Science (AI Specialization)",
      startDate: "2014-09",
      endDate: "2016-06",
      gpa: "3.9",
    },
    {
      id: "edu-2",
      institution: "UC Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science & Mathematics",
      startDate: "2010-09",
      endDate: "2014-06",
      gpa: "3.8",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Machine Learning Specialist",
      issuer: "Amazon Web Services",
      date: "2024-01",
      expiryDate: "2027-01",
      credentialId: "AWS-ML-2024-001",
    },
    {
      id: "cert-2",
      name: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "2023-06",
      credentialId: "TF-DEV-2023-3421",
    },
    {
      id: "cert-3",
      name: "Kubernetes Administrator (CKA)",
      issuer: "CNCF",
      date: "2023-03",
      expiryDate: "2026-03",
      credentialId: "CKA-2023-8912",
    },
  ],
};

export const demoProfileDocuments: ProfileDocument[] = [
  { id: "doc-1", name: "Resume - Senior AI Engineer", type: "pdf", lastUpdated: "2025-12-15" },
  { id: "doc-2", name: "Portfolio - ML Projects", type: "pdf", lastUpdated: "2025-11-20" },
  { id: "doc-3", name: "Cover Letter Template", type: "docx", lastUpdated: "2025-10-05" },
  { id: "doc-4", name: "Certification - AWS ML", type: "pdf", lastUpdated: "2025-08-12" },
];

export const demoProfilePreferences: ProfilePreferences = {
  publicProfile: true,
  recruiterVisibility: true,
  dataSharing: false,
};

export const demoCompletionChecklist: ChecklistItem[] = [
  { id: "cl-1", label: "Complete personal information", completed: true, section: "personal", required: true },
  { id: "cl-2", label: "Add professional summary", completed: true, section: "summary", required: true },
  { id: "cl-3", label: "Define career identity", completed: true, section: "career", required: true },
  { id: "cl-4", label: "Add technical skills", completed: true, section: "skills", required: true },
  { id: "cl-5", label: "Add soft skills", completed: true, section: "skills", required: false },
  { id: "cl-6", label: "Add languages", completed: true, section: "languages", required: false },
  { id: "cl-7", label: "Add work experience", completed: true, section: "experience", required: true },
  { id: "cl-8", label: "Add education", completed: true, section: "education", required: true },
  { id: "cl-9", label: "Add certifications", completed: true, section: "certifications", required: false },
  { id: "cl-10", label: "Link portfolio website", completed: true, section: "personal", required: false },
  { id: "cl-11", label: "Link LinkedIn profile", completed: true, section: "personal", required: false },
  { id: "cl-12", label: "Link GitHub profile", completed: false, section: "personal", required: false },
  { id: "cl-13", label: "Add advanced skills (Rust)", completed: false, section: "skills", required: false },
  { id: "cl-14", label: "Upload latest certifications", completed: false, section: "documents", required: false },
];

export const demoProfileData: ProfileData = {
  personalInfo: demoPersonalInfo,
  careerIdentity: demoCareerIdentity,
  professionalSummary: demoProfessionalSummary,
  skillsLanguages: demoSKillsLanguages,
  experienceSnapshot: demoExperienceSnapshot,
  educationCertifications: demoEducationCertifications,
  documents: demoProfileDocuments,
  preferences: demoProfilePreferences,
  completionScore: 78,
  completionChecklist: demoCompletionChecklist,
  lastUpdated: "2025-12-20T10:30:00Z",
};
