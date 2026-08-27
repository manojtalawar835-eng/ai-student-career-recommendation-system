import React, { useState } from 'react';
import { APTITUDE_QUESTIONS } from '../data/aptitudeQuestions';
import { StudentProfile } from '../types';
import confetti from 'canvas-confetti';
import { 
  BrainCircuit, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  Check, 
  Timer,
  BookOpen
} from 'lucide-react';

interface AptitudeQuizViewProps {
  profile: StudentProfile;
  onUpdateAptitudeScore: (newScore: number, breakdown: { programming: number; math: number; communication: number }) => void;
}

export const AptitudeQuizView: React.FC<AptitudeQuizViewProps> = ({
  profile,
  onUpdateAptitudeScore,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [syncSaved, setSyncSaved] = useState<boolean>(false);

  const questions = APTITUDE_QUESTIONS;
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    let techCorrect = 0;
    let mathCorrect = 0;
    let commCorrect = 0;

    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
        if (q.category === 'Technical / Programming') techCorrect++;
        if (q.category === 'Quantitative Aptitude') mathCorrect++;
        if (q.category === 'Verbal & Communication' || q.category === 'Logical Reasoning') commCorrect++;
      }
    });

    const finalScore = Math.round((correctCount / questions.length) * 100);

    if (finalScore >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    const techScore = Math.min(100, Math.round((techCorrect / Math.max(1, questions.filter(q => q.category.includes('Technical')).length)) * 100));
    const mathScore = Math.min(100, Math.round((mathCorrect / Math.max(1, questions.filter(q => q.category.includes('Quantitative')).length)) * 100));
    const commScore = Math.min(100, Math.round((commCorrect / Math.max(1, questions.filter(q => !q.category.includes('Technical') && !q.category.includes('Quantitative')).length)) * 100));

    onUpdateAptitudeScore(finalScore, {
      programming: techScore || 75,
      math: mathScore || 75,
      communication: commScore || 80,
    });
    setSyncSaved(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setSyncSaved(false);
  };

  // Calculate score summary if submitted
  const score = isSubmitted
    ? Math.round((questions.filter(q => selectedAnswers[q.id] === q.correctIndex).length / questions.length) * 100)
    : 0;

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#0c0c0e] rounded-2xl p-6 border border-zinc-800/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-purple-400">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">Placement Aptitude & Domain Assessment</h1>
              <p className="text-xs text-zinc-400 mt-1">
                10 targeted questions covering Quantitative, Logical Reasoning, Algorithms, and Technical Problem Solving.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold font-mono uppercase tracking-wider px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
            Profile Score: <strong className="text-blue-400">{profile.aptitudeScore}%</strong>
          </span>
        </div>
      </div>

      {!isSubmitted ? (
        /* Active Quiz Screen */
        <div className="bg-[#0c0c0e] rounded-2xl border border-zinc-800/90 shadow-sm overflow-hidden">
          {/* Progress Bar & Question Counter */}
          <div className="p-5 border-b border-zinc-800 bg-[#121216] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black uppercase font-mono text-zinc-300">
              <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-mono">
                {currentQuestionIndex + 1}
              </span>
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-blue-400 text-[11px] font-bold font-mono uppercase tracking-wider">
              {currentQ.category}
            </span>
          </div>

          <div className="w-full bg-zinc-900 h-1.5">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Body */}
          <div className="p-6 md:p-8 space-y-6">
            <h2 className="text-base md:text-lg font-black text-white leading-relaxed tracking-tight">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-950/40 text-white font-bold ring-1 ring-blue-500/50'
                        : 'border-zinc-800 hover:border-zinc-700 bg-[#141418] hover:bg-zinc-900 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg text-xs font-black font-mono flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{option}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-5 border-t border-zinc-800 bg-[#121216] flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 text-xs font-bold uppercase font-mono tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors disabled:opacity-30"
            >
              Previous
            </button>

            <div className="flex items-center gap-3">
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 text-xs font-bold uppercase font-mono tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md shadow-blue-900/30 transition-all flex items-center gap-1.5"
                >
                  Next Question <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  id="submit-aptitude-quiz-btn"
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2 text-xs font-bold uppercase font-mono tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Submit Assessment
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results & Question Explanations */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Result Banner */}
          <div className="bg-[#0c0c0e] border border-zinc-800 text-white rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <Award className="w-10 h-10 text-yellow-400" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-blue-400 font-mono">Assessment Finished</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5 tracking-tight font-mono">{score}% Aptitude Score</h2>
                <p className="text-xs text-zinc-400 mt-1 max-w-lg leading-relaxed">
                  {score >= 80 ? 'Outstanding! Ready for Tier-1 engineering & analytics placements.' : score >= 60 ? 'Solid performance. Review the explanations below to refine problem-solving speed.' : 'Foundational level. Regular practice will boost your competitive test performance.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="retake-aptitude-quiz-btn"
                type="button"
                onClick={handleRetake}
                className="px-4 py-2 text-xs font-bold uppercase font-mono tracking-wider rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Retake Test
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-tight text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" /> Question Breakdown & Explanations
            </h3>

            {questions.map((q, idx) => {
              const selectedIdx = selectedAnswers[q.id];
              const isCorrect = selectedIdx === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`bg-[#0c0c0e] rounded-2xl p-5 border shadow-sm transition-all ${
                    isCorrect ? 'border-emerald-500/40 bg-[#0c0c0e]' : 'border-rose-500/40 bg-[#0c0c0e]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-lg text-xs font-black font-mono flex items-center justify-center text-white ${
                        isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}>
                        0{idx + 1}
                      </span>
                      <span className="text-xs font-bold font-mono text-zinc-400 uppercase">[{q.category}]</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono border ${
                      isCorrect ? 'bg-zinc-900 border-emerald-500/30 text-emerald-400' : 'bg-zinc-900 border-rose-500/30 text-rose-400'
                    }`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm font-black text-zinc-100 mb-3 tracking-tight">{q.question}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3 font-mono">
                    <div className="p-2.5 rounded-xl bg-[#141418] border border-zinc-800">
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">Your Selection:</span>
                      <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {selectedIdx !== undefined ? q.options[selectedIdx] : 'Not Answered'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#141418] border border-zinc-800">
                      <span className="text-zinc-500 block text-[10px] uppercase font-bold">Correct Answer:</span>
                      <span className="text-emerald-400 font-bold">{q.options[q.correctIndex]}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141418] border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                    <strong className="text-blue-400 font-mono">Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
