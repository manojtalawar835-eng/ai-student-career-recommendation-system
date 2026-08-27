import React, { useState } from 'react';
import { Career, StudentProfile } from '../types';
import { CAREERS_DATA } from '../data/careersData';
import { 
  Search, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen,
  Filter
} from 'lucide-react';

interface CareerExplorerViewProps {
  careers: Career[];
  profile: StudentProfile;
  onSelectCareerRoadmap: (careerId: string) => void;
  onOpenAdvisorChat: (careerName: string) => void;
}

export const CareerExplorerView: React.FC<CareerExplorerViewProps> = ({
  careers = CAREERS_DATA,
  profile,
  onSelectCareerRoadmap,
  onOpenAdvisorChat,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCareerModal, setSelectedCareerModal] = useState<Career | null>(null);

  const categories = ['All', 'Software Engineering', 'Data & AI', 'Cloud & DevOps', 'Security & Infrastructure', 'Product & Design'];

  const filteredCareers = careers.filter(c => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const getMatchScore = (career: Career) => {
    const userSkills = profile.technicalSkills.map(s => s.toLowerCase().trim());
    const matched = career.requiredSkills.filter(req => 
      userSkills.some(us => us === req.toLowerCase() || us.includes(req.toLowerCase()) || req.toLowerCase().includes(us))
    );
    return Math.min(100, Math.round((matched.length / career.requiredSkills.length) * 100));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#0c0c0e] rounded-2xl p-6 border border-zinc-800/90 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-blue-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">Tech Career Directory & Skill Standards</h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Explore industry role benchmarks, required technologies, compensation ranges, and market demand.
                </p>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search careers, skills, tools..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 text-xs font-mono border border-zinc-800 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-[#141418] text-zinc-100 placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-5 pt-4 border-t border-zinc-800/70">
          <span className="text-xs font-black uppercase font-mono text-zinc-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-blue-400" /> Filter:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-bold uppercase font-mono rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/30'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Career Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCareers.map(career => {
          const matchScore = getMatchScore(career);

          return (
            <div
              key={career.id}
              className="bg-[#0c0c0e] rounded-2xl border border-zinc-800/90 hover:border-blue-500/50 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase font-mono rounded bg-zinc-900 border border-zinc-800 text-blue-400 mb-1.5 inline-block">
                      {career.category}
                    </span>
                    <h2 className="text-base font-black uppercase tracking-tight text-white group-hover:text-blue-400 transition-colors">
                      {career.name}
                    </h2>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-black font-mono rounded-lg bg-zinc-900 border border-blue-500/30 text-blue-400 shrink-0">
                    {matchScore}% Fit
                  </span>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                  {career.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-[#141418] border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-400" /> Avg Salary
                    </span>
                    <span className="font-black text-zinc-200 text-xs truncate block mt-0.5">{career.avgSalaryUSD}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#141418] border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-purple-400" /> Demand
                    </span>
                    <span className="font-black text-zinc-200 text-xs mt-0.5 block">{career.jobMarketDemand}/100</span>
                  </div>
                </div>

                {/* Required Skills Chips */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-black font-mono text-zinc-500 uppercase tracking-wider block">Required Tech Stack:</span>
                  <div className="flex flex-wrap gap-1">
                    {career.requiredSkills.slice(0, 5).map(skill => {
                      const userHasIt = profile.technicalSkills.includes(skill.toLowerCase());
                      return (
                        <span
                          key={skill}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${
                            userHasIt
                              ? 'bg-zinc-900 text-emerald-400 border-emerald-500/40'
                              : 'bg-[#141418] text-zinc-300 border-zinc-800'
                          }`}
                        >
                          {userHasIt && '✓ '}{skill}
                        </span>
                      );
                    })}
                    {career.requiredSkills.length > 5 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
                        +{career.requiredSkills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                <button
                  id={`advisor-career-${career.id}`}
                  onClick={() => onOpenAdvisorChat(career.name)}
                  className="text-xs font-bold uppercase font-mono tracking-wider text-zinc-400 hover:text-white"
                >
                  Ask Advisor
                </button>
                <button
                  id={`view-roadmap-${career.id}`}
                  onClick={() => onSelectCareerRoadmap(career.id)}
                  className="px-3 py-1.5 text-xs font-bold uppercase font-mono tracking-wider text-blue-400 hover:text-white hover:bg-blue-600 border border-blue-500/40 hover:border-blue-600 rounded-xl transition-all flex items-center gap-1"
                >
                  Skill Roadmap <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
