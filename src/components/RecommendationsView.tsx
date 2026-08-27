import React, { useState } from 'react';
import { RecommendationResult, StudentProfile } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  DollarSign, 
  GraduationCap, 
  ArrowRight, 
  Filter, 
  Info,
  ChevronDown,
  ChevronUp,
  Layers,
  Award
} from 'lucide-react';

interface RecommendationsViewProps {
  recommendations: RecommendationResult[];
  profile: StudentProfile;
  onSelectCareerRoadmap: (careerId: string) => void;
  onOpenAdvisorChat: (careerName: string) => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  recommendations,
  profile,
  onSelectCareerRoadmap,
  onOpenAdvisorChat,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(recommendations[0]?.careerId || null);
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);

  const categories = ['All', 'Software Engineering', 'Data & AI', 'Cloud & DevOps', 'Security & Infrastructure', 'Product & Design'];
  const difficulties = ['All', 'Entry Level', 'Intermediate', 'Advanced'];

  const filteredRecs = recommendations.filter(r => {
    const matchCat = selectedCategory === 'All' || r.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'All' || r.difficulty === selectedDifficulty;
    return matchCat && matchDiff;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Match Formula Breakdown */}
      <div className="bg-[#0c0c0e] rounded-2xl p-6 border border-zinc-800/90 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-blue-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">AI Career Recommendation Engine</h1>
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Ranked results computed using hybrid TF-IDF Cosine Similarity, Jaccard Skill Overlap, and ML-weighted Aptitude & Academic scoring for <strong className="text-zinc-200">{profile.fullName}</strong>.
            </p>
          </div>

          <button
            id="toggle-formula-info-btn"
            onClick={() => setShowFormulaDetails(!showFormulaDetails)}
            className="px-3.5 py-2 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors flex items-center gap-1.5 self-start md:self-auto uppercase tracking-wider font-mono"
          >
            <Info className="w-3.5 h-3.5 text-blue-400" />
            {showFormulaDetails ? 'Hide Scoring Logic' : 'Scoring Logic'}
          </button>
        </div>

        {/* Scoring Breakdown Callout */}
        {showFormulaDetails && (
          <div className="mt-4 p-4 rounded-xl bg-[#141418] border border-zinc-800 text-xs text-zinc-400 space-y-2 animate-in fade-in duration-150">
            <h4 className="font-black text-white flex items-center gap-1.5 uppercase tracking-wider font-mono">
              <Layers className="w-4 h-4 text-blue-400" /> Hybrid Scoring Formula:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-[#0c0c0e] border border-zinc-800">
                <span className="font-black text-blue-400 text-sm font-mono block">50% Weight</span>
                <p className="text-[11px] text-zinc-400 mt-1">TF-IDF Vector Cosine Similarity + Direct Required Skill Intersection</p>
              </div>
              <div className="p-3 rounded-xl bg-[#0c0c0e] border border-zinc-800">
                <span className="font-black text-emerald-400 text-sm font-mono block">25% Weight</span>
                <p className="text-[11px] text-zinc-400 mt-1">Verified Aptitude & Logical Problem Solving Assessment ({profile.aptitudeScore}%)</p>
              </div>
              <div className="p-3 rounded-xl bg-[#0c0c0e] border border-zinc-800">
                <span className="font-black text-purple-400 text-sm font-mono block">15% Weight</span>
                <p className="text-[11px] text-zinc-400 mt-1">Interests & Domain Passion Keyword Alignment</p>
              </div>
              <div className="p-3 rounded-xl bg-[#0c0c0e] border border-zinc-800">
                <span className="font-black text-orange-400 text-sm font-mono block">10% Weight</span>
                <p className="text-[11px] text-zinc-400 mt-1">Normalized CGPA & Academic Performance ({profile.cgpa}/10)</p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-zinc-800/80">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-zinc-400 mr-1 flex items-center gap-1 uppercase tracking-wider font-mono">
              <Filter className="w-3 h-3" /> Category:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all font-mono uppercase tracking-wider ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 text-xs border border-zinc-800 rounded-lg bg-zinc-900 font-bold text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            >
              {difficulties.map(d => (
                <option key={d} value={d} className="bg-zinc-900 text-zinc-200">{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecs.length === 0 ? (
          <div className="bg-[#0c0c0e] rounded-2xl p-12 text-center border border-zinc-800">
            <p className="text-sm text-zinc-400">No careers matched your active filters. Try selecting "All Categories".</p>
          </div>
        ) : (
          filteredRecs.map((rec, index) => {
            const isExpanded = expandedId === rec.careerId;
            const scoreColor = rec.score >= 80 ? 'text-emerald-400 bg-zinc-900 border-emerald-500/40' : rec.score >= 60 ? 'text-blue-400 bg-zinc-900 border-blue-500/40' : 'text-orange-400 bg-zinc-900 border-orange-500/40';
            const barColor = rec.score >= 80 ? 'bg-emerald-500' : rec.score >= 60 ? 'bg-blue-600' : 'bg-orange-500';

            return (
              <div
                key={rec.careerId}
                className={`bg-[#0c0c0e] rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                  isExpanded ? 'border-blue-500/80 ring-2 ring-blue-500/20 shadow-lg' : 'border-zinc-800/90 hover:border-zinc-700'
                }`}
              >
                {/* Main Card Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : rec.careerId)}
                  className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-black font-mono text-sm flex items-center justify-center shrink-0 mt-0.5">
                      0{index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="text-lg font-black text-white tracking-tight">{rec.name}</h2>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                          {rec.category}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase font-mono rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {rec.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                        {rec.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Score & Toggle */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-xl border text-base font-black font-mono inline-flex items-center gap-1.5 ${scoreColor}`}>
                        <Award className="w-4 h-4" />
                        {rec.score}% MATCH
                      </div>
                    </div>
                    <button className="p-1 text-zinc-400 hover:text-white">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Progress Visual */}
                <div className="px-5 pb-1">
                  <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-zinc-800/60">
                    <div className={`h-full rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${rec.score}%` }} />
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="p-5 bg-[#141418] border-t border-zinc-800 space-y-5 animate-in fade-in duration-200">
                    {/* 3-Column Skills & Gaps Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Matched Skills */}
                      <div className="bg-[#0c0c0e] p-4 rounded-xl border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400 uppercase tracking-wider font-mono mb-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Verified Skills ({rec.matchedSkills.length})
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {rec.matchedSkills.length > 0 ? (
                            rec.matchedSkills.map(s => (
                              <span key={s} className="px-2 py-1 rounded bg-zinc-900 text-emerald-400 text-xs font-bold font-mono border border-emerald-500/30">
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-zinc-500 italic">No direct required skills logged yet.</span>
                          )}
                        </div>
                      </div>

                      {/* Missing Skills (Skill Gap) */}
                      <div className="bg-[#0c0c0e] p-4 rounded-xl border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-xs font-black text-rose-400 uppercase tracking-wider font-mono mb-2.5">
                          <XCircle className="w-4 h-4 text-rose-400" />
                          Skill Gaps to Bridge ({rec.missingSkills.length})
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {rec.missingSkills.length > 0 ? (
                            rec.missingSkills.map(s => (
                              <span key={s} className="px-2 py-1 rounded bg-zinc-900 text-rose-400 text-xs font-bold font-mono border border-rose-500/30">
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-emerald-400 font-bold font-mono">FULL SKILL COVERAGE!</span>
                          )}
                        </div>
                      </div>

                      {/* Compensation & Market Health */}
                      <div className="bg-[#0c0c0e] p-4 rounded-xl border border-zinc-800">
                        <div className="text-xs font-black text-zinc-300 uppercase tracking-wider font-mono mb-2.5 flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                          Market Snapshot
                        </div>
                        <div className="space-y-2 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Average Salary:</span>
                            <span className="font-bold text-white">{rec.avgSalaryUSD}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Skill Alignment:</span>
                            <span className="font-bold text-blue-400">{rec.skillMatchPercentage}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Aptitude Fit:</span>
                            <span className="font-bold text-emerald-400">{rec.aptitudeMatchPercentage}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actionable Next Steps */}
                    {rec.actionableTips && rec.actionableTips.length > 0 && (
                      <div className="bg-[#0c0c0e] rounded-xl p-4 border border-zinc-800">
                        <h4 className="text-xs font-black text-blue-400 uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                          Recommended Placement Action Steps:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-zinc-300">
                          {rec.actionableTips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-4 h-4 rounded bg-zinc-900 border border-zinc-800 text-blue-400 text-[10px] font-black font-mono flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="leading-relaxed">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                      <button
                        id={`ask-advisor-${rec.careerId}`}
                        onClick={() => onOpenAdvisorChat(rec.name)}
                        className="px-4 py-2 text-xs font-bold uppercase font-mono tracking-wider text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        Ask AI Advisor
                      </button>
                      <button
                        id={`generate-roadmap-${rec.careerId}`}
                        onClick={() => onSelectCareerRoadmap(rec.careerId)}
                        className="px-4 py-2 text-xs font-bold uppercase font-mono tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md shadow-blue-900/30 transition-all flex items-center gap-1.5"
                      >
                        Generate 4-Week Skill Roadmap <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
