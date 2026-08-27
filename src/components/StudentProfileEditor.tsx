import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { SKILL_TAXONOMY, CAREERS_DATA } from '../data/careersData';
import { X, Plus, Check, Sparkles, User, Award, BookOpen, BrainCircuit } from 'lucide-react';

interface StudentProfileEditorProps {
  profile: StudentProfile;
  onSave: (updated: StudentProfile) => void;
  onClose: () => void;
}

export const StudentProfileEditor: React.FC<StudentProfileEditorProps> = ({
  profile,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<StudentProfile>({ ...profile });
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [customInterestInput, setCustomInterestInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof SKILL_TAXONOMY>('Programming Languages');

  const toggleTechnicalSkill = (skill: string) => {
    const sLower = skill.toLowerCase();
    if (formData.technicalSkills.includes(sLower)) {
      setFormData({
        ...formData,
        technicalSkills: formData.technicalSkills.filter(s => s !== sLower),
      });
    } else {
      setFormData({
        ...formData,
        technicalSkills: [...formData.technicalSkills, sLower],
      });
    }
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    const s = customSkillInput.trim().toLowerCase();
    if (!formData.technicalSkills.includes(s)) {
      setFormData({
        ...formData,
        technicalSkills: [...formData.technicalSkills, s],
      });
    }
    setCustomSkillInput('');
  };

  const addCustomInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInterestInput.trim()) return;
    const i = customInterestInput.trim().toLowerCase();
    if (!formData.interests.includes(i)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, i],
      });
    }
    setCustomInterestInput('');
  };

  const removeInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(i => i !== interest),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#0c0c0e] rounded-2xl shadow-2xl border border-zinc-800 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121216]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-blue-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight text-white">Edit Student Academic & Skill Profile</h2>
              <p className="text-xs text-zinc-400">Update your academic credentials, technical skills, and target career</p>
            </div>
          </div>
          <button
            id="close-profile-modal-btn"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Academic & Basic Info */}
          <div>
            <h3 className="text-xs font-black uppercase font-mono tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" /> Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold font-mono uppercase text-zinc-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-zinc-800 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-[#141418] text-zinc-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold font-mono uppercase text-zinc-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-zinc-800 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-[#141418] text-zinc-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold font-mono uppercase text-zinc-300 mb-1">Degree Program</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={e => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g. B.Tech in Computer Science"
                  className="w-full px-3.5 py-2 text-sm border border-zinc-800 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-[#141418] text-zinc-100 placeholder-zinc-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold font-mono uppercase text-zinc-300 mb-1">Specialization / Branch</label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={e => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="e.g. Artificial Intelligence & Data"
                  className="w-full px-3.5 py-2 text-sm border border-zinc-800 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-[#141418] text-zinc-100 placeholder-zinc-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold font-mono uppercase text-zinc-300 mb-1">
                  Cumulative GPA / CGPA (Scale of 10 or 4)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={e => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2 text-sm border border-zinc-800 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-[#141418] text-zinc-100 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold font-mono uppercase text-zinc-300 mb-1">
                  Aptitude Assessment Score (1-100)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={formData.aptitudeScore}
                    onChange={e => setFormData({ ...formData, aptitudeScore: parseInt(e.target.value, 10) })}
                    className="flex-1 accent-blue-500"
                  />
                  <span className="text-sm font-black font-mono text-blue-400 w-10 text-right">
                    {formData.aptitudeScore}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Target Career & Desired Role */}
          <div>
            <h3 className="text-xs font-black uppercase font-mono tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-orange-400" /> Target Career Focus
            </h3>
            <select
              value={formData.targetCareerId || ''}
              onChange={e => setFormData({ ...formData, targetCareerId: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm font-mono border border-zinc-800 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-[#141418] text-zinc-100 font-semibold"
            >
              <option value="">-- Let AI Recommend Based on Skills --</option>
              {CAREERS_DATA.map(c => (
                <option key={c.id} value={c.id} className="bg-[#141418] text-zinc-100">
                  {c.name} ({c.category} • {c.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* Technical Skills Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-black uppercase font-mono tracking-wider text-zinc-400 flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-emerald-400" /> Technical Skills & Tools ({formData.technicalSkills.length} selected)
              </h3>
              <span className="text-xs font-mono text-zinc-500">Click chips to toggle</span>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 mb-3 bg-[#121216] p-1.5 rounded-xl border border-zinc-800">
              {Object.keys(SKILL_TAXONOMY).map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat as keyof typeof SKILL_TAXONOMY)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono font-bold uppercase transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Chips in selected category */}
            <div className="flex flex-wrap gap-2 p-3 bg-[#141418] border border-zinc-800 rounded-xl mb-3 min-h-[72px]">
              {SKILL_TAXONOMY[selectedCategory].map(skill => {
                const isSelected = formData.technicalSkills.includes(skill.toLowerCase());
                return (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => toggleTechnicalSkill(skill)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/30'
                        : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-blue-500/40 hover:bg-zinc-800'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    {skill}
                  </button>
                );
              })}
            </div>

            {/* Custom Skill Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add custom skill (e.g. Next.js, PyTorch, LangChain, Rust)..."
                value={customSkillInput}
                onChange={e => setCustomSkillInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomSkill(e);
                  }
                }}
                className="flex-1 px-3.5 py-2 text-xs font-mono border border-zinc-800 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-[#141418] text-zinc-100 placeholder-zinc-600"
              />
              <button
                type="button"
                onClick={addCustomSkill}
                className="px-3.5 py-2 text-xs font-mono font-bold uppercase bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl border border-zinc-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            {/* Active Selected Skills Preview */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {formData.technicalSkills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-bold bg-zinc-900 text-blue-400 border border-blue-500/30"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => toggleTechnicalSkill(skill)}
                    className="hover:text-rose-400 focus:outline-hidden"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Interests & Passions */}
          <div>
            <h3 className="text-xs font-black uppercase font-mono tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" /> Career Interests & Domain Passions
            </h3>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add interest (e.g. Artificial Intelligence, Cloud Security, FinTech, Game Dev)..."
                value={customInterestInput}
                onChange={e => setCustomInterestInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomInterest(e);
                  }
                }}
                className="flex-1 px-3.5 py-2 text-xs font-mono border border-zinc-800 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-[#141418] text-zinc-100 placeholder-zinc-600"
              />
              <button
                type="button"
                onClick={addCustomInterest}
                className="px-3.5 py-2 text-xs font-mono font-bold uppercase bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl border border-zinc-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.interests.map(interest => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-bold bg-zinc-900 text-purple-400 border border-purple-500/30"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="hover:text-rose-400 focus:outline-hidden"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800 bg-[#121216]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold uppercase font-mono tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            id="save-profile-btn"
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 text-xs font-bold uppercase font-mono tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md shadow-blue-900/30 transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" /> Save Profile & Update Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};
