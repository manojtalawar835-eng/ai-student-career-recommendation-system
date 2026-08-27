import React, { useState, useRef, useEffect } from 'react';
import { StudentProfile, ChatMessage } from '../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  RefreshCw, 
  Trash2, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface AdvisorChatViewProps {
  profile: StudentProfile;
  initialTopic?: string;
}

export const AdvisorChatView: React.FC<AdvisorChatViewProps> = ({
  profile,
  initialTopic,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'assistant',
      text: `Hello **${profile.fullName}**! I'm your AI Career Counselor & Placement Advisor. Based on your degree in **${profile.degree}** and skills (*${profile.technicalSkills.slice(0, 4).join(', ') || 'Tech Stack'}*), I'm ready to guide your portfolio, interview preparation, and career strategy. How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'What project should I build to boost my resume?',
        'How should I prepare for technical coding interviews?',
        'What are the top 3 high-demand skills I should learn next?',
        'How do I tailor my resume for campus placements?'
      ]
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialTopic) {
      handleSendMessage(`Give me targeted career advice and a roadmap strategy for becoming a ${initialTopic}.`);
    }
  }, [initialTopic]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string = input) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          profile,
          history: messages.slice(-6),
        }),
      });

      if (!response.ok) throw new Error('Advisor response failed');
      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.text || 'I analyzed your request. Keep practicing core technical algorithms and building portfolio projects.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: data.suggestions || [
          'What are common system design questions for freshers?',
          'How can I improve my aptitude test score?'
        ],
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: `Based on your profile in **${profile.degree}**, prioritize building 2 comprehensive full-stack or ML capstone applications, solve 50+ medium LeetCode problems, and keep your aptitude score above 80% for top campus placements.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: `m-init-${Date.now()}`,
        sender: 'assistant',
        text: `Chat cleared! What career or skill question would you like to explore, **${profile.fullName}**?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'How to transition into Artificial Intelligence?',
          'What certifications matter for Cloud Engineers?',
          'How do I prepare for behavioral HR rounds?'
        ]
      }
    ]);
  };

  return (
    <div className="space-y-4 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#0c0c0e] rounded-2xl p-5 border border-zinc-800/90 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-900/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
              CareerPilot AI Advisor
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            </h1>
            <p className="text-xs text-zinc-400">Personalized student placement mentoring & technical advice</p>
          </div>
        </div>

        <button
          onClick={handleClear}
          title="Clear Chat"
          className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-zinc-900 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-[#0c0c0e] rounded-2xl border border-zinc-800/90 shadow-sm p-5 min-h-[460px] max-h-[560px] overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-900 border border-zinc-800 text-blue-400'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[82%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30 rounded-tr-xs'
                : 'bg-[#141418] border border-zinc-800 text-zinc-200 shadow-sm rounded-tl-xs'
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <span className={`text-[10px] font-mono block mt-1.5 ${
                msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-zinc-500'
              }`}>
                {msg.timestamp}
              </span>

              {/* Suggestions chips */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-zinc-800 space-y-1.5">
                  <span className="text-[10px] font-black uppercase font-mono tracking-wider text-zinc-400 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-400" /> Suggested Follow-ups:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[11px] font-mono font-semibold text-left px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-blue-400 border border-zinc-800 hover:border-blue-500/40 transition-all shadow-xs"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 text-blue-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#141418] border border-zinc-800 p-4 rounded-2xl rounded-tl-xs flex items-center gap-2 text-xs font-mono text-zinc-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
              <span>Synthesizing career advice...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="bg-[#0c0c0e] rounded-2xl border border-zinc-800/90 shadow-sm p-2 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask anything (e.g. How to prepare for Data Scientist campus drive?)..."
          className="flex-1 px-4 py-2.5 text-xs md:text-sm border-none focus:outline-hidden bg-transparent text-zinc-100 placeholder-zinc-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md shadow-blue-900/30 transition-colors disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
