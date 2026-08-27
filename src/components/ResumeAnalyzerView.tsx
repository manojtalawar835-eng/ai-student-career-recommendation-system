import React, { useState } from 'react';
import { ResumeAnalysis, StudentProfile } from '../types';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  Check,
  TrendingUp,
  FileCheck
} from 'lucide-react';

interface ResumeAnalyzerViewProps {
  profile: StudentProfile;
  onUpdateProfileSkills: (newSkills: string[]) => void;
}

const SAMPLE_RESUMES = {
  fullstack: `ALEX MORGAN
Email: alex.morgan@university.edu | GitHub: github.com/alexmorgan | LinkedIn: linkedin.com/in/alexmorgan

EDUCATION
Bachelor of Technology in Computer Science (Specialization in AI & Software Engineering)
State Technical University | CGPA: 8.8 / 10 | Expected Graduation: 2026

TECHNICAL SKILLS
Languages: Python, JavaScript, TypeScript, SQL, HTML, CSS, C++
Frameworks & Libraries: React, Node.js, Express, Pandas, Scikit-Learn, Tailwind CSS
Tools & Cloud: Git, Docker, AWS, Linux, REST APIs, PostgreSQL, MongoDB
Core Competencies: Data Structures & Algorithms, Object-Oriented Design, Agile Methodology

PROJECTS
1. AI Code Mentor & Analyzer (React, TypeScript, Node.js, Python, Docker)
- Architected an end-to-end full-stack code review web application used by 450+ peers.
- Built microservice REST APIs in Express and Python connected to PostgreSQL database.
- Implemented responsive React UI with Tailwind CSS, achieving 98+ Lighthouse accessibility score.

2. Predictive Job Market Telemetry Dashboard (Python, Pandas, SQL, Scikit-Learn)
- Engineered automated scraping and data ingestion pipeline processing 15,000+ job postings weekly.
- Trained Random Forest classification model with 89% precision to forecast in-demand skill trends.

EXPERIENCE & INTERNSHIPS
Software Engineering Intern | NextGen Cloud Labs (Summer 2025)
- Containerized legacy backend services using Docker, reducing onboarding deployment time by 40%.
- Developed unit test suites in Jest and PyTest, raising automated test coverage from 68% to 92%.
- Collaborated in cross-functional sprint planning, demonstrating effective communication and problem solving.`,

  dataAi: `PRIYA SHARMA
Email: priya.sharma@techinst.edu | Portfolio: priyasharma.ai

EDUCATION
B.E. in Information Technology & Data Systems | CGPA: 9.1 / 10 (2022 - 2026)

TECHNICAL EXPERTISE
Languages: Python, SQL, R, C++
Machine Learning & AI: PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy, Deep Learning, NLP
Data Engineering & Cloud: Spark, Snowflake, AWS, Docker, Git, Tableau, Power BI
Soft Skills: Analytical Thinking, Team Collaboration, Technical Presentation, Problem Solving

ACADEMIC & HACKATHON PROJECTS
1. Medical Image Diagnostic Classifier (PyTorch, Deep Learning, Python)
- Built Convolutional Neural Network (CNN) in PyTorch to detect thoracic anomalies with 94.2% ROC-AUC.
- Implemented data augmentation pipelines and deployed inference API via FastAPI and Docker on AWS.

2. Financial Sentiment & News Extractor (NLP, Python, Pandas, Scikit-Learn)
- Scraped 50,000+ financial articles; built sentiment classification and topic modeling algorithms.
- Designed interactive Tableau dashboards for executive portfolio managers.

CERTIFICATIONS
- AWS Certified Machine Learning - Specialty (2025)
- DeepLearning.AI Deep Learning Specialization`
};

export const ResumeAnalyzerView: React.FC<ResumeAnalyzerViewProps> = ({
  profile,
  onUpdateProfileSkills,
}) => {
  const [resumeText, setResumeText] = useState<string>(SAMPLE_RESUMES.fullstack);
  const [fileName, setFileName] = useState<string>('Alex_Morgan_Resume.pdf');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
  const [syncSuccess, setSyncSuccess] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      setResumeText(content || '');
      analyzeResume(content || '', file.name);
    };
    reader.readAsText(file);
  };

  const analyzeResume = async (textToAnalyze: string = resumeText, currentFileName: string = fileName) => {
    if (!textToAnalyze.trim()) return;

    setIsAnalyzing(true);
    setSyncSuccess(false);

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToAnalyze, fileName: currentFileName }),
      });

      if (!response.ok) throw new Error('Analysis failed');
      const data: ResumeAnalysis = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error(err);
      // Fallback
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSyncSkills = () => {
    if (!analysisResult) return;
    const newSkills = analysisResult.extractedSkills;
    onUpdateProfileSkills(newSkills);
    setSyncSuccess(true);
    setTimeout(() => setSyncSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#0c0c0e] rounded-2xl p-6 border border-zinc-800/90 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-blue-400">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">AI Resume Parser & ATS Auditor</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Extract technical skills via NLP, check ATS applicant tracking readability, and bridge keyword gaps for placement.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input & Upload (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* File Drag/Drop or Select */}
          <div className="bg-[#0c0c0e] rounded-2xl p-5 border border-zinc-800/90 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5 font-mono">
              <Upload className="w-4 h-4 text-blue-400" /> Upload or Paste Resume
            </h2>

            {/* Quick Sample Buttons */}
            <div className="flex gap-2 mb-3">
              <button
                id="load-sample-fullstack-btn"
                type="button"
                onClick={() => {
                  setResumeText(SAMPLE_RESUMES.fullstack);
                  setFileName('Alex_Morgan_FullStack.pdf');
                  analyzeResume(SAMPLE_RESUMES.fullstack, 'Alex_Morgan_FullStack.pdf');
                }}
                className="flex-1 py-1.5 px-2 text-[11px] font-bold uppercase font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-lg transition-colors"
              >
                Sample 1: Full-Stack
              </button>
              <button
                id="load-sample-data-btn"
                type="button"
                onClick={() => {
                  setResumeText(SAMPLE_RESUMES.dataAi);
                  setFileName('Priya_Sharma_DataAI.pdf');
                  analyzeResume(SAMPLE_RESUMES.dataAi, 'Priya_Sharma_DataAI.pdf');
                }}
                className="flex-1 py-1.5 px-2 text-[11px] font-bold uppercase font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-lg transition-colors"
              >
                Sample 2: AI & Data
              </button>
            </div>

            {/* File Upload Drop Area */}
            <label className="border-2 border-dashed border-zinc-800 hover:border-blue-500/70 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-[#141418] hover:bg-zinc-900 transition-colors mb-3">
              <Upload className="w-6 h-6 text-zinc-400 mb-1" />
              <span className="text-xs font-bold text-zinc-200">Click to upload or drag & drop</span>
              <span className="text-[10px] text-zinc-500 font-mono mt-0.5">PDF, DOCX, TXT (Plain text extraction)</span>
              <input
                type="file"
                accept=".txt,.pdf,.docx,.doc"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Textarea */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">Resume Plain Text Content</label>
              <textarea
                rows={10}
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                placeholder="Paste raw text of your resume here..."
                className="w-full p-3 text-xs font-mono border border-zinc-800 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-[#141418] text-zinc-100 leading-relaxed resize-y"
              />
            </div>

            <button
              id="analyze-resume-submit-btn"
              onClick={() => analyzeResume()}
              disabled={isAnalyzing || !resumeText.trim()}
              className="w-full mt-3 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider font-mono shadow-md shadow-blue-900/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Running NLP Skill Extraction...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze Resume & Calculate ATS Score
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Analysis Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {!analysisResult && !isAnalyzing ? (
            <div className="bg-[#0c0c0e] rounded-2xl p-12 border border-zinc-800 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 mb-3">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-base font-black uppercase text-white tracking-tight">No Resume Analyzed Yet</h3>
              <p className="text-xs text-zinc-400 max-w-sm mt-1">
                Click "Sample 1" or upload your resume on the left to extract technical skills and compute your ATS placement score.
              </p>
              <button
                id="empty-analyze-btn"
                onClick={() => analyzeResume()}
                className="mt-4 px-4 py-2 text-xs font-bold uppercase font-mono rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md"
              >
                Run Sample Resume Analysis
              </button>
            </div>
          ) : isAnalyzing ? (
            <div className="bg-[#0c0c0e] rounded-2xl p-12 border border-zinc-800 text-center flex flex-col items-center justify-center min-h-[400px]">
              <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mb-3" />
              <h3 className="text-base font-black uppercase text-white tracking-tight">Processing Document with NLP Engine</h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">Extracting technical keywords, soft skills, and scoring ATS compatibility...</p>
            </div>
          ) : (
            analysisResult && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* ATS Score & Summary Banner */}
                <div className="bg-[#0c0c0e] rounded-2xl p-5 border border-zinc-800/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    {/* Radial Score Badge */}
                    <div className="relative flex items-center justify-center w-20 h-20 shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-zinc-800"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={analysisResult.atsScore >= 80 ? 'text-emerald-500' : analysisResult.atsScore >= 60 ? 'text-blue-500' : 'text-orange-500'}
                          strokeDasharray={`${analysisResult.atsScore}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-base font-black text-white font-mono">{analysisResult.atsScore}%</span>
                        <span className="text-[8px] font-bold text-zinc-400 uppercase font-mono">ATS Fit</span>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-sm font-black text-white uppercase tracking-tight">{analysisResult.fileName || 'Parsed Resume'}</h2>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{analysisResult.summaryText}</p>
                    </div>
                  </div>

                  <button
                    id="sync-skills-to-profile-btn"
                    onClick={handleSyncSkills}
                    className={`px-4 py-2 text-xs font-bold uppercase font-mono tracking-wider rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0 ${
                      syncSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30'
                    }`}
                  >
                    {syncSuccess ? (
                      <>
                        <Check className="w-4 h-4" /> Synced to Profile!
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" /> Import Skills to Profile
                      </>
                    )}
                  </button>
                </div>

                {/* Extracted Technical & Soft Skills */}
                <div className="bg-[#0c0c0e] rounded-2xl p-5 border border-zinc-800/90 shadow-sm space-y-4">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      Extracted Technical Skills ({analysisResult.extractedSkills.length})
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.extractedSkills.map(skill => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-zinc-900 text-blue-400 text-xs font-bold font-mono border border-blue-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {analysisResult.extractedSoftSkills.length > 0 && (
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5 font-mono">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        Extracted Soft & Leadership Skills
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.extractedSoftSkills.map(skill => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-zinc-900 text-purple-400 text-xs font-bold font-mono border border-purple-500/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Strengths & Improvement Audit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="bg-[#0c0c0e] rounded-2xl p-4 border border-zinc-800">
                    <h3 className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Key Resume Strengths
                    </h3>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {analysisResult.strengths.map((str, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="bg-[#0c0c0e] rounded-2xl p-4 border border-zinc-800">
                    <h3 className="text-xs font-black text-orange-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      ATS & Placement Optimization
                    </h3>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {analysisResult.improvements.map((imp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-orange-400 font-bold">•</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
