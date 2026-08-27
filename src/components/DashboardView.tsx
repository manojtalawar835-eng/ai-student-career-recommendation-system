import React from 'react';
import { StudentProfile, RecommendationResult, Career } from '../types';
import { RadarChart } from './RadarChart';
import { 
  Award, 
  BrainCircuit, 
  Briefcase, 
  TrendingUp, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Edit3, 
  GraduationCap,
  Target
} from 'lucide-react';

interface DashboardViewProps {
  profile: StudentProfile;
  recommendations: RecommendationResult[];
  careers: Career[];
  onOpenEditProfile: () => void;
  onNavigateTab: (tab: string) => void;
  onSelectCareerRoadmap: (careerId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  recommendations,
  careers,
  onOpenEditProfile,
  onNavigateTab,
  onSelectCareerRoadmap,
}) => {
  const topMatch = recommendations[0];
  const targetCareer = careers.find(c => c.id === profile.targetCareerId) || careers[0];

  // Calculate dynamic capability stats for the student based on skills and quiz
  const studentStats = {
    programming: Math.min(95, (profile.technicalSkills.filter(s => ['python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'go', 'rust'].includes(s)).length * 20) + (profile.programmingScore ? profile.programmingScore * 0.4 : 35)),
    dataAnalytics: Math.min(95, (profile.technicalSkills.filter(s => ['sql', 'pandas', 'machine learning', 'statistics', 'spark', 'tableau', 'deep learning'].includes(s)).length * 22) + (profile.mathScore ? profile.mathScore * 0.35 : 30)),
    systemDesign: Math.min(95, (profile.technicalSkills.filter(s => ['docker', 'kubernetes', 'aws', 'rest api', 'sql', 'microservices', 'linux'].includes(s)).length * 20) + 30),
    problemSolving: Math.max(40, profile.aptitudeScore),
    communication: Math.max(45, profile.communicationScore || 75),
    toolsAndDevOps: Math.min(95, (profile.technicalSkills.filter(s => ['git', 'docker', 'linux', 'ci/cd', 'aws', 'kubernetes', 'terraform'].includes(s)).length * 22) + 25),
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Student Overview Card */}
      <div className="bg-[#0c0c0e] border border-zinc-800/90 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/50 shadow-md"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-black ring-2 ring-blue-500/50">
                  {profile.fullName.charAt(0)}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-[#0c0c0e] rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">{profile.fullName}</h1>
                <button
                  id="dashboard-edit-profile-btn"
                  onClick={onOpenEditProfile}
                  className="p-1 text-zinc-400 hover:text-white transition-colors"
                  title="Edit Profile"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-zinc-400 font-semibold flex items-center gap-1.5 mt-0.5 tracking-wide">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                {profile.degree} • {profile.branch}
              </p>
              <div className="flex flex-wrap gap-2 mt-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-zinc-900 text-blue-400 border border-zinc-800">
                  CGPA: {profile.cgpa}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-zinc-900 text-emerald-400 border border-zinc-800">
                  APTITUDE: {profile.aptitudeScore}%
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-zinc-900 text-purple-400 border border-zinc-800">
                  {profile.technicalSkills.length} SKILLS LOGGED
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="dash-quick-resume-btn"
              onClick={() => onNavigateTab('resume')}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              Analyze Resume
            </button>
            <button
              id="dash-view-recs-btn"
              onClick={() => onNavigateTab('recommendations')}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              View Recommendations
            </button>
          </div>
        </div>
      </div>

      {/* KPI 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Top Career Match */}
        <div className="bg-[#0c0c0e] p-5 rounded-2xl border border-zinc-800/90 shadow-sm flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-blue-400 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Top Career Match</span>
            <div className="text-base font-black text-white truncate tracking-tight">{topMatch?.name || 'Data Scientist'}</div>
            <div className="flex items-center gap-1 text-xs text-blue-400 font-bold font-mono mt-0.5">
              <span>{topMatch?.score || 85}% ALIGNMENT</span>
            </div>
          </div>
        </div>

        {/* Aptitude Readiness */}
        <div className="bg-[#0c0c0e] p-5 rounded-2xl border border-zinc-800/90 shadow-sm flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400 shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Aptitude Score</span>
            <div className="text-2xl font-black text-white font-mono">{profile.aptitudeScore}%</div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold font-mono mt-0.5">
              <span>SCREENING READY</span>
            </div>
          </div>
        </div>

        {/* Industry Demand */}
        <div className="bg-[#0c0c0e] p-5 rounded-2xl border border-zinc-800/90 shadow-sm flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-purple-400 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Job Market Demand</span>
            <div className="text-2xl font-black text-white font-mono">94 <span className="text-sm text-zinc-500 font-normal">/ 100</span></div>
            <div className="flex items-center gap-1 text-xs text-purple-400 font-bold font-mono mt-0.5">
              <span>HIGH GROWTH TIER</span>
            </div>
          </div>
        </div>

        {/* Target Role Status */}
        <div className="bg-[#0c0c0e] p-5 rounded-2xl border border-zinc-800/90 shadow-sm flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-orange-400 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Target Role</span>
            <div className="text-base font-black text-white truncate tracking-tight">{targetCareer.name}</div>
            <div className="flex items-center gap-1 text-xs text-orange-400 font-bold uppercase font-mono mt-0.5">
              <span>{targetCareer.difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section: Top Matches (Left) & Radar Skill Analysis (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Top AI Career Recommendations */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h2 className="text-base font-black uppercase tracking-tight text-white">Top AI Career Matches</h2>
            </div>
            <button
              id="dash-explore-all-btn"
              onClick={() => onNavigateTab('recommendations')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 uppercase tracking-wider font-mono"
            >
              Explore All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recommendations.slice(0, 3).map((rec, idx) => (
              <div
                key={rec.careerId}
                className="bg-[#0c0c0e] rounded-2xl p-5 border border-zinc-800/90 hover:border-zinc-700 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-2.5">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-black font-mono flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <h3 className="text-base font-black text-white group-hover:text-blue-400 tracking-tight transition-colors">
                        {rec.name}
                      </h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {rec.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {rec.explanation}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-black text-blue-400 font-mono tracking-tight">{rec.score}%</div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Match Score</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden mb-3 border border-zinc-800/60">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      rec.score >= 80 ? 'bg-emerald-500' : rec.score >= 60 ? 'bg-blue-600' : 'bg-orange-500'
                    }`}
                    style={{ width: `${rec.score}%` }}
                  />
                </div>

                {/* Skills Breakdown */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-zinc-800/80 text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-400 flex-wrap">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-bold text-zinc-300 font-mono text-[11px]">MATCHED ({rec.matchedSkills.length}):</span>
                    {rec.matchedSkills.slice(0, 3).map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 text-[11px] font-bold font-mono">
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    id={`dash-roadmap-btn-${rec.careerId}`}
                    onClick={() => onSelectCareerRoadmap(rec.careerId)}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 ml-auto font-mono uppercase tracking-wider"
                  >
                    View Roadmap <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick AI Tip Card */}
          {topMatch?.aiInsights && (
            <div className="bg-[#121216] rounded-2xl p-4 border border-zinc-800 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">AI Counselor Strategic Recommendation</h4>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{topMatch.aiInsights}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right 5 Cols: Skill Capabilities Radar Chart */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-blue-400" />
              Skill Radar Analysis
            </h2>
            <span className="text-xs text-zinc-400 font-mono font-bold uppercase">Target: {targetCareer.name}</span>
          </div>

          <div className="bg-[#0c0c0e] rounded-2xl p-5 border border-zinc-800/90 shadow-sm flex flex-col items-center justify-center min-h-[360px]">
            <RadarChart
              studentStats={studentStats}
              benchmarkStats={targetCareer.benchmarks}
              targetCareerName={targetCareer.name}
              size={300}
            />

            <div className="w-full mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <span className="text-zinc-400 text-[10px] font-bold uppercase font-mono block">Strongest Domain</span>
                <span className="font-black text-white text-xs">
                  {studentStats.programming >= studentStats.dataAnalytics ? 'Programming & Algorithms' : 'Data & Analytics'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <span className="text-zinc-400 text-[10px] font-bold uppercase font-mono block">Recommended Focus</span>
                <span className="font-black text-orange-400 text-xs">DevOps & System Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Grid: Aptitude & Resume Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="bg-[#0c0c0e] border border-zinc-800 text-white rounded-2xl p-6 shadow-sm flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 font-mono">Fast-Track Screening</span>
            <h3 className="text-lg font-black text-white mt-1 uppercase tracking-tight">Placement Aptitude Test</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm leading-relaxed">
              Practice 10 technical, quantitative, and logical reasoning questions to verify your placement readiness.
            </p>
            <button
              id="dash-start-quiz-btn"
              onClick={() => onNavigateTab('aptitude')}
              className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all inline-flex items-center gap-1.5 shadow-md"
            >
              Start 5-Minute Quiz <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl shrink-0 hidden sm:flex">
            <BrainCircuit className="w-10 h-10 text-blue-400" />
          </div>
        </div>

        <div className="bg-[#0c0c0e] border border-zinc-800 text-white rounded-2xl p-6 shadow-sm flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 font-mono">Automated NLP Extraction</span>
            <h3 className="text-lg font-black text-white mt-1 uppercase tracking-tight">Upload & Audit Resume</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm leading-relaxed">
              Get an instant ATS score, detect missing keywords, and sync extracted skills directly to your profile.
            </p>
            <button
              id="dash-upload-resume-btn"
              onClick={() => onNavigateTab('resume')}
              className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all inline-flex items-center gap-1.5 shadow-md"
            >
              Scan My Resume <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl shrink-0 hidden sm:flex">
            <FileText className="w-10 h-10 text-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
