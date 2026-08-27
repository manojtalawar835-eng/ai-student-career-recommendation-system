import React, { useState, useEffect } from 'react';
import { StudentProfile, RecommendationResult, Career } from './types';
import { SAMPLE_STUDENTS } from './data/sampleProfiles';
import { CAREERS_DATA } from './data/careersData';
import { generateHybridRecommendations } from './utils/recommendationEngine';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { RecommendationsView } from './components/RecommendationsView';
import { ResumeAnalyzerView } from './components/ResumeAnalyzerView';
import { AptitudeQuizView } from './components/AptitudeQuizView';
import { CareerExplorerView } from './components/CareerExplorerView';
import { RoadmapView } from './components/RoadmapView';
import { AdvisorChatView } from './components/AdvisorChatView';
import { StudentProfileEditor } from './components/StudentProfileEditor';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeProfile, setActiveProfile] = useState<StudentProfile>(SAMPLE_STUDENTS[0]);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [selectedRoadmapCareerId, setSelectedRoadmapCareerId] = useState<string>('full-stack-engineer');
  const [advisorTopic, setAdvisorTopic] = useState<string | undefined>(undefined);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [isLoadingRecs, setIsLoadingRecs] = useState<boolean>(false);

  // Recalculate recommendations whenever active profile changes
  useEffect(() => {
    fetchRecommendations(activeProfile);
  }, [activeProfile]);

  const fetchRecommendations = async (profile: StudentProfile) => {
    setIsLoadingRecs(true);
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.allRecommendations && data.allRecommendations.length > 0) {
          setRecommendations(data.allRecommendations);
          return;
        }
      }
      // Local fallback
      const localRecs = generateHybridRecommendations(profile, CAREERS_DATA);
      setRecommendations(localRecs);
    } catch (err) {
      console.warn('Using client fallback for recommendations calculation:', err);
      const localRecs = generateHybridRecommendations(profile, CAREERS_DATA);
      setRecommendations(localRecs);
    } finally {
      setIsLoadingRecs(false);
    }
  };

  const handleSaveProfile = (updatedProfile: StudentProfile) => {
    setActiveProfile(updatedProfile);
    setIsEditProfileOpen(false);
  };

  const handleUpdateProfileSkills = (newSkills: string[]) => {
    const existing = new Set(activeProfile.technicalSkills.map(s => s.toLowerCase()));
    newSkills.forEach(s => existing.add(s.toLowerCase()));

    setActiveProfile({
      ...activeProfile,
      technicalSkills: Array.from(existing),
    });
  };

  const handleUpdateAptitudeScore = (
    newScore: number,
    breakdown: { programming: number; math: number; communication: number }
  ) => {
    setActiveProfile({
      ...activeProfile,
      aptitudeScore: newScore,
      programmingScore: breakdown.programming,
      mathScore: breakdown.math,
      communicationScore: breakdown.communication,
    });
  };

  const handleSelectCareerRoadmap = (careerId: string) => {
    setSelectedRoadmapCareerId(careerId);
    setActiveTab('roadmap');
  };

  const handleOpenAdvisorChat = (careerName: string) => {
    setAdvisorTopic(careerName);
    setActiveTab('advisor');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navbar with Profile Switcher */}
      <Navbar
        activeTab={activeTab}
        onTabChange={tab => {
          setActiveTab(tab);
          if (tab !== 'advisor') setAdvisorTopic(undefined);
        }}
        activeProfile={activeProfile}
        onSelectSampleProfile={p => setActiveProfile(p)}
        onOpenEditProfile={() => setIsEditProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            profile={activeProfile}
            recommendations={recommendations}
            careers={CAREERS_DATA}
            onOpenEditProfile={() => setIsEditProfileOpen(true)}
            onNavigateTab={tab => setActiveTab(tab)}
            onSelectCareerRoadmap={handleSelectCareerRoadmap}
          />
        )}

        {activeTab === 'recommendations' && (
          <RecommendationsView
            recommendations={recommendations}
            profile={activeProfile}
            onSelectCareerRoadmap={handleSelectCareerRoadmap}
            onOpenAdvisorChat={handleOpenAdvisorChat}
          />
        )}

        {activeTab === 'resume' && (
          <ResumeAnalyzerView
            profile={activeProfile}
            onUpdateProfileSkills={handleUpdateProfileSkills}
          />
        )}

        {activeTab === 'aptitude' && (
          <AptitudeQuizView
            profile={activeProfile}
            onUpdateAptitudeScore={handleUpdateAptitudeScore}
          />
        )}

        {activeTab === 'explorer' && (
          <CareerExplorerView
            careers={CAREERS_DATA}
            profile={activeProfile}
            onSelectCareerRoadmap={handleSelectCareerRoadmap}
            onOpenAdvisorChat={handleOpenAdvisorChat}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            careerId={selectedRoadmapCareerId}
            profile={activeProfile}
            onSelectCareer={setSelectedRoadmapCareerId}
          />
        )}

        {activeTab === 'advisor' && (
          <AdvisorChatView
            profile={activeProfile}
            initialTopic={advisorTopic}
          />
        )}
      </main>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <StudentProfileEditor
          profile={activeProfile}
          onSave={handleSaveProfile}
          onClose={() => setIsEditProfileOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-[#09090b] border-t border-zinc-800/80 py-6 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-bold tracking-tight text-zinc-400">CareerPilot AI • Student Career & Skill Recommendation System</span>
          <span className="text-[11px] text-zinc-500">Hybrid ML Scoring & Gemini AI Engine</span>
        </div>
      </footer>
    </div>
  );
}
