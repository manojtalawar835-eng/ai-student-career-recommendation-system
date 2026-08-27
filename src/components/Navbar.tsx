import React from 'react';
import { StudentProfile } from '../types';
import { SAMPLE_STUDENTS } from '../data/sampleProfiles';
import { 
  LayoutDashboard, 
  Sparkles, 
  FileText, 
  BrainCircuit, 
  Briefcase, 
  MapPin, 
  Bot, 
  User, 
  Edit3, 
  Compass,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeProfile: StudentProfile;
  onSelectSampleProfile: (profile: StudentProfile) => void;
  onOpenEditProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  activeProfile,
  onSelectSampleProfile,
  onOpenEditProfile,
}) => {
  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'recommendations', label: 'Recommendations', icon: Sparkles },
    { id: 'resume', label: 'Resume Parser', icon: FileText },
    { id: 'aptitude', label: 'Aptitude Test', icon: BrainCircuit },
    { id: 'explorer', label: 'Career Directory', icon: Briefcase },
    { id: 'roadmap', label: 'Learning Roadmap', icon: MapPin },
    { id: 'advisor', label: 'AI Advisor', icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800/90 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onTabChange('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
              <Compass className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white uppercase">CareerPilot</span>
                <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-wider border border-blue-500/30 font-mono">
                  AI ML
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-semibold tracking-wide uppercase hidden sm:block">
                Student Career & Skill Guidance
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#121216] border border-zinc-800/90 p-1 rounded-xl">
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Student Profile Switcher & Action */}
          <div className="flex items-center gap-3">
            {/* Student Persona Select */}
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider font-mono">Persona:</span>
              <select
                value={activeProfile.id}
                onChange={e => {
                  const found = SAMPLE_STUDENTS.find(s => s.id === e.target.value);
                  if (found) onSelectSampleProfile(found);
                }}
                className="text-xs font-bold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                {SAMPLE_STUDENTS.map(p => (
                  <option key={p.id} value={p.id} className="bg-zinc-900 text-zinc-200">
                    {p.fullName} ({p.degree.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Profile Avatar & Edit Profile Button */}
            <button
              id="navbar-profile-btn"
              onClick={onOpenEditProfile}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all group"
            >
              {activeProfile.avatarUrl ? (
                <img
                  src={activeProfile.avatarUrl}
                  alt={activeProfile.fullName}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-zinc-700"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  {activeProfile.fullName.charAt(0)}
                </div>
              )}
              <div className="text-left hidden md:block">
                <span className="text-xs font-bold text-zinc-100 block leading-tight">{activeProfile.fullName}</span>
                <span className="text-[10px] text-blue-400 font-bold font-mono block">CGPA {activeProfile.cgpa}</span>
              </div>
              <Edit3 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Mobile Nav Tabs Bar */}
        <div className="flex lg:hidden overflow-x-auto gap-1 py-2 border-t border-zinc-800/80 no-scrollbar">
          {navTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
