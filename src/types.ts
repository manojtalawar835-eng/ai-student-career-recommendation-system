export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  degree: string;
  branch: string;
  cgpa: number;
  technicalSkills: string[];
  softSkills: string[];
  interests: string[];
  aptitudeScore: number;
  programmingScore: number;
  mathScore: number;
  communicationScore: number;
  targetCareerId?: string;
  avatarUrl?: string;
}

export interface Career {
  id: string;
  name: string;
  category: 'Software Engineering' | 'Data & AI' | 'Cloud & DevOps' | 'Security & Infrastructure' | 'Product & Design' | 'Hardware & Embedded';
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  interests: string[];
  difficulty: 'Entry Level' | 'Intermediate' | 'Advanced';
  avgSalaryUSD: string;
  jobMarketDemand: number; // 0-100
  benchmarks: {
    programming: number;
    dataAnalytics: number;
    systemDesign: number;
    problemSolving: number;
    communication: number;
    toolsAndDevOps: number;
  };
  recommendedCertifications: string[];
  keyResponsibilities: string[];
}

export interface RecommendationResult {
  careerId: string;
  name: string;
  category: string;
  score: number; // 0-100
  skillMatchPercentage: number;
  aptitudeMatchPercentage: number;
  interestMatchPercentage: number;
  explanation: string;
  matchedSkills: string[];
  missingSkills: string[];
  difficulty: string;
  avgSalaryUSD: string;
  aiInsights?: string;
  actionableTips: string[];
}

export interface ResumeAnalysis {
  fileName?: string;
  atsScore: number; // 0-100
  extractedSkills: string[];
  extractedSoftSkills: string[];
  suggestedCareers: { name: string; matchScore: number }[];
  missingKeywords: string[];
  formattingScore: number;
  summaryText: string;
  strengths: string[];
  improvements: string[];
}

export interface AptitudeQuestion {
  id: number;
  category: 'Logical Reasoning' | 'Quantitative Aptitude' | 'Technical / Programming' | 'Verbal & Communication';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningRoadmapWeek {
  week: number;
  title: string;
  description: string;
  topics: string[];
  resources: { name: string; type: 'course' | 'doc' | 'video' | 'project'; link?: string }[];
  practicalProject: string;
  completed?: boolean;
}

export interface LearningRoadmap {
  careerId: string;
  careerName: string;
  totalDurationWeeks: number;
  overview: string;
  prerequisites: string[];
  weeks: LearningRoadmapWeek[];
  capstoneProject: string;
  recommendedCertifications: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
