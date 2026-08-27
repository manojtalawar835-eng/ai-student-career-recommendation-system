import React, { useState, useEffect } from 'react';
import { Career, LearningRoadmap, StudentProfile } from '../types';
import { CAREERS_DATA } from '../data/careersData';
import { 
  MapPin, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  FolderGit2, 
  Award, 
  Sparkles, 
  RefreshCw, 
  ArrowRight,
  ExternalLink,
  Layers,
  GraduationCap
} from 'lucide-react';

interface RoadmapViewProps {
  careerId: string;
  profile: StudentProfile;
  onSelectCareer: (careerId: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  careerId,
  profile,
  onSelectCareer,
}) => {
  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  const selectedCareer = CAREERS_DATA.find(c => c.id === careerId) || CAREERS_DATA[0];

  useEffect(() => {
    fetchRoadmap(selectedCareer.id);
  }, [selectedCareer.id]);

  const fetchRoadmap = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerId: id,
          careerName: selectedCareer.name,
          userSkills: profile.technicalSkills,
        }),
      });

      if (!response.ok) throw new Error('Failed to load roadmap');
      const data = await response.json();
      setRoadmap(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTopic = (topicKey: string) => {
    setCompletedTopics(prev => ({
      ...prev,
      [topicKey]: !prev[topicKey],
    }));
  };

  // Calculate progress
  const allTopicsCount = roadmap?.weeks.reduce((acc, w) => acc + w.topics.length, 0) || 1;
  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = Math.min(100, Math.round((completedCount / allTopicsCount) * 100));

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Career Switcher */}
      <div className="bg-[#0c0c0e] rounded-2xl p-6 border border-zinc-800/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-blue-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">4-Week Accelerated Career Roadmap</h1>
              <p className="text-xs text-zinc-400 mt-1">
                Personalized milestone plan to bridge skill gaps for <strong className="text-blue-400">{selectedCareer.name}</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Career Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-black uppercase font-mono text-zinc-500">Target Role:</label>
          <select
            value={selectedCareer.id}
            onChange={e => onSelectCareer(e.target.value)}
            className="px-3 py-1.5 text-xs font-bold font-mono uppercase border border-zinc-800 rounded-xl bg-[#141418] text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          >
            {CAREERS_DATA.map(c => (
              <option key={c.id} value={c.id} className="bg-[#141418] text-zinc-200">
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="bg-[#0c0c0e] rounded-2xl p-16 border border-zinc-800 text-center flex flex-col items-center justify-center min-h-[400px]">
          <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mb-3" />
          <h3 className="text-base font-black uppercase text-white tracking-tight">Synthesizing Milestone Curriculum</h3>
          <p className="text-xs text-zinc-400 mt-1 font-mono">Analyzing missing skills and structuring week-by-week learning goals...</p>
        </div>
      ) : (
        roadmap && (
          <div className="space-y-6">
            {/* Overview & Progress Bar Banner */}
            <div className="bg-[#0c0c0e] border border-zinc-800 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase font-mono tracking-wider bg-zinc-900 text-blue-400 border border-blue-500/30">
                  {selectedCareer.category} • 4-Week Fast Track
                </span>
                <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">{roadmap.careerName} Career Pathway</h2>
                <p className="text-xs text-zinc-400 leading-relaxed">{roadmap.overview}</p>
              </div>

              {/* Progress Dial */}
              <div className="bg-[#141418] p-4 rounded-xl border border-zinc-800 shrink-0 w-full md:w-56 text-center">
                <span className="text-[10px] font-black uppercase font-mono text-zinc-400 tracking-wider block">Milestone Progress</span>
                <div className="text-2xl font-black text-white mt-0.5 font-mono">{progressPercent}%</div>
                <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-2">
                  <div className="bg-blue-500 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                  {completedCount} of {allTopicsCount} topics completed
                </span>
              </div>
            </div>

            {/* Week Milestones (Vertical Timeline) */}
            <div className="space-y-4">
              {roadmap.weeks.map((week, idx) => (
                <div
                  key={week.week || idx}
                  className="bg-[#0c0c0e] rounded-2xl border border-zinc-800/90 shadow-sm overflow-hidden p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-3 border-b border-zinc-800/80">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm font-mono flex items-center justify-center shrink-0">
                        W{week.week}
                      </span>
                      <div>
                        <h3 className="text-base font-black uppercase tracking-tight text-white">{week.title}</h3>
                        <p className="text-xs text-zinc-400">{week.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Topics with Interactive Checkboxes (7 Cols) */}
                    <div className="lg:col-span-7 space-y-2.5">
                      <span className="text-xs font-black uppercase font-mono text-zinc-500 tracking-wider block">
                        Core Learning Modules & Competencies:
                      </span>
                      <div className="space-y-2">
                        {week.topics.map((topic, tIdx) => {
                          const topicKey = `w${week.week}_t${tIdx}`;
                          const isDone = !!completedTopics[topicKey];

                          return (
                            <div
                              key={tIdx}
                              onClick={() => toggleTopic(topicKey)}
                              className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                                isDone
                                  ? 'bg-zinc-900 border-emerald-500/40 text-emerald-400'
                                  : 'bg-[#141418] border-zinc-800 hover:border-blue-500/40 text-zinc-300'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <Circle className="w-4 h-4 text-zinc-500 shrink-0" />
                                )}
                                <span className={isDone ? 'line-through opacity-80' : ''}>{topic}</span>
                              </div>
                              <span className="text-[10px] uppercase font-mono font-bold text-zinc-500">
                                {isDone ? 'Done' : 'Click to complete'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Resources & Practical Mini Project (5 Cols) */}
                    <div className="lg:col-span-5 space-y-4">
                      {/* Practical Project */}
                      <div className="p-4 rounded-xl bg-[#141418] border border-purple-500/30 space-y-1.5">
                        <span className="text-[10px] font-black uppercase font-mono tracking-wider text-purple-400 flex items-center gap-1">
                          <FolderGit2 className="w-3.5 h-3.5" /> Hands-On Weekly Project:
                        </span>
                        <p className="text-xs font-bold text-zinc-200 leading-relaxed">
                          {week.practicalProject}
                        </p>
                      </div>

                      {/* Curated Resources */}
                      {week.resources && week.resources.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-black uppercase font-mono tracking-wider text-zinc-500 flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Recommended Free Learning:
                          </span>
                          <div className="space-y-1">
                            {week.resources.map((res, rIdx) => (
                              <div
                                key={rIdx}
                                className="p-2 rounded-lg bg-[#141418] border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between"
                              >
                                <span className="truncate">{res.name}</span>
                                <span className="px-1.5 py-0.5 rounded bg-zinc-900 text-blue-400 font-mono text-[9px] uppercase font-bold shrink-0 ml-2 border border-zinc-800">
                                  {res.type}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Capstone Project & Certifications Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0c0c0e] rounded-2xl p-5 border border-zinc-800 shadow-sm space-y-2">
                <span className="text-xs font-black uppercase font-mono tracking-wider text-blue-400 flex items-center gap-1.5">
                  <FolderGit2 className="w-4 h-4" /> Capstone Portfolio Project
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                  {roadmap.capstoneProject}
                </p>
              </div>

              <div className="bg-[#0c0c0e] rounded-2xl p-5 border border-zinc-800 shadow-sm space-y-2">
                <span className="text-xs font-black uppercase font-mono tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Target Industry Certifications
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(roadmap.recommendedCertifications || selectedCareer.recommendedCertifications).map(cert => (
                    <span key={cert} className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-zinc-900 text-emerald-400 border border-emerald-500/30">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
