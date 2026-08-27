import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { CAREERS_DATA } from './src/data/careersData.ts';
import { generateHybridRecommendations } from './src/utils/recommendationEngine.ts';
import { parseResumeText } from './src/utils/resumeParser.ts';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (e) {
      console.warn('Gemini AI initialization warning:', e);
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hasGemini: !!process.env.GEMINI_API_KEY });
  });

  // 2. Careers data endpoint
  app.get('/api/careers', (req, res) => {
    res.json(CAREERS_DATA);
  });

  // 3. Hybrid Recommendations Endpoint
  app.post('/api/recommendations', async (req, res) => {
    try {
      const profile = req.body.profile;
      if (!profile) {
        return res.status(400).json({ error: 'Profile is required' });
      }

      // Generate base algorithmic recommendations
      const baseRecs = generateHybridRecommendations(profile, CAREERS_DATA);
      const topRecs = baseRecs.slice(0, 5);

      const ai = getGemini();
      if (ai) {
        try {
          const topCareer = topRecs[0];
          const prompt = `You are a Senior Career Counselor and Tech Industry Recruiter.
Analyze this student profile and provide a concise, high-impact 2-sentence personalized strategic tip for their top career match:
Student Name: ${profile.fullName}
Degree: ${profile.degree} (${profile.branch}), CGPA: ${profile.cgpa}
Technical Skills: ${profile.technicalSkills.join(', ')}
Aptitude Score: ${profile.aptitudeScore}%
Top Career Match: ${topCareer.name} (Match score: ${topCareer.score}%)
Missing Skills: ${topCareer.missingSkills.join(', ')}

Return output strictly in JSON format with keys: "aiInsight" (2 sentences of encouraging strategic advice) and "actionTips" (array of 3 short concrete bullet steps).`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            },
          });

          if (response.text) {
            const parsed = JSON.parse(response.text);
            if (topRecs[0]) {
              topRecs[0].aiInsights = parsed.aiInsight;
              if (Array.isArray(parsed.actionTips) && parsed.actionTips.length > 0) {
                topRecs[0].actionableTips = parsed.actionTips;
              }
            }
          }
        } catch (aiErr) {
          console.log('AI enhancement fallback:', aiErr);
        }
      }

      res.json({
        recommendations: topRecs,
        allRecommendations: baseRecs,
      });
    } catch (err: any) {
      console.error('Recommendations error:', err);
      res.status(500).json({ error: err.message || 'Failed to generate recommendations' });
    }
  });

  // 4. Resume NLP Analyzer Endpoint
  app.post('/api/analyze-resume', async (req, res) => {
    try {
      const { text, fileName } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Resume text is required' });
      }

      // Base NLP extraction
      const baseAnalysis = parseResumeText(text, fileName);

      const ai = getGemini();
      if (ai) {
        try {
          const prompt = `You are an expert Technical Recruiter and ATS Resume Parser.
Analyze the following student resume text:
"""
${text.slice(0, 4000)}
"""

Extract structured data and critique for student career placement.
Return strictly JSON with:
{
  "atsScore": number (0-100),
  "extractedSkills": string[] (all technical languages, libraries, tools found),
  "extractedSoftSkills": string[],
  "summaryText": string (2-sentence executive summary of candidate profile),
  "strengths": string[] (3 bullet points),
  "improvements": string[] (3 actionable high-impact suggestions for campus placement / tech hiring),
  "topCareerPaths": [ { "name": string, "matchScore": number } ] (3 top fitting careers)
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            },
          });

          if (response.text) {
            const parsed = JSON.parse(response.text);
            const combinedSkills = Array.from(new Set([...baseAnalysis.extractedSkills, ...(parsed.extractedSkills || [])]));
            return res.json({
              fileName: fileName || 'Uploaded_Resume.pdf',
              atsScore: parsed.atsScore || baseAnalysis.atsScore,
              extractedSkills: combinedSkills,
              extractedSoftSkills: parsed.extractedSoftSkills || baseAnalysis.extractedSoftSkills,
              suggestedCareers: parsed.topCareerPaths || baseAnalysis.suggestedCareers,
              missingKeywords: baseAnalysis.missingKeywords,
              formattingScore: baseAnalysis.formattingScore,
              summaryText: parsed.summaryText || baseAnalysis.summaryText,
              strengths: parsed.strengths || baseAnalysis.strengths,
              improvements: parsed.improvements || baseAnalysis.improvements,
            });
          }
        } catch (aiErr) {
          console.log('AI Resume Parse fallback:', aiErr);
        }
      }

      res.json(baseAnalysis);
    } catch (err: any) {
      console.error('Resume parse error:', err);
      res.status(500).json({ error: err.message || 'Failed to analyze resume' });
    }
  });

  // 5. Dynamic Roadmap Generator Endpoint
  app.post('/api/generate-roadmap', async (req, res) => {
    try {
      const { careerId, careerName, userSkills = [] } = req.body;
      const career = CAREERS_DATA.find(c => c.id === careerId || c.name === careerName) || CAREERS_DATA[0];

      const missingSkills = career.requiredSkills.filter(
        reqSkill => !userSkills.map((s: string) => s.toLowerCase()).includes(reqSkill.toLowerCase())
      );

      const ai = getGemini();
      if (ai) {
        try {
          const prompt = `You are a Senior Staff Engineer and Mentor.
Create a structured 4-week fast-track learning roadmap for a student aiming to become a "${career.name}".
Student currently knows: ${userSkills.join(', ') || 'basic programming'}.
Missing key skills to bridge: ${missingSkills.join(', ') || career.requiredSkills.slice(0, 3).join(', ')}.

Return strictly a JSON object:
{
  "careerId": "${career.id}",
  "careerName": "${career.name}",
  "totalDurationWeeks": 4,
  "overview": string (concise 2-sentence summary of the roadmap),
  "prerequisites": string[],
  "weeks": [
    {
      "week": 1,
      "title": string,
      "description": string,
      "topics": string[],
      "resources": [
        { "name": string, "type": "course" | "doc" | "video" | "project" }
      ],
      "practicalProject": string
    }
  ],
  "capstoneProject": string,
  "recommendedCertifications": string[]
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            },
          });

          if (response.text) {
            const parsed = JSON.parse(response.text);
            return res.json(parsed);
          }
        } catch (aiErr) {
          console.log('AI Roadmap fallback:', aiErr);
        }
      }

      // Default high-quality structured roadmap fallback
      const fallbackRoadmap = {
        careerId: career.id,
        careerName: career.name,
        totalDurationWeeks: 4,
        overview: `A structured 4-week roadmap to master core ${career.name} competencies, build portfolio artifacts, and pass technical interviews.`,
        prerequisites: ['Basic problem solving', 'Git version control fundamentals'],
        weeks: [
          {
            week: 1,
            title: `Foundations & Core Tech Stack (${career.requiredSkills[0] || 'Core Stack'})`,
            description: `Establish solid understanding of syntax, architecture patterns, and key toolings.`,
            topics: [
              `Deep dive into ${career.requiredSkills[0] || 'core languages'}`,
              `Standard libraries, data structures, and best practices`,
              `Development environment setup and testing workflows`
            ],
            resources: [
              { name: `Official ${career.requiredSkills[0] || 'Docs'} Documentation`, type: 'doc' },
              { name: 'Crash Course & Interactive Playgrounds', type: 'video' },
              { name: 'Core Syntax Drills & Problem Sets', type: 'course' }
            ],
            practicalProject: `Build a CLI or modular utility demonstrating ${career.requiredSkills[0] || 'core fundamentals'}.`
          },
          {
            week: 2,
            title: `Frameworks & Applied Engineering (${career.requiredSkills[1] || 'Applied Systems'})`,
            description: `Apply your skills into real-world architectures, state handling, and data integration.`,
            topics: [
              `Working with ${career.requiredSkills[1] || 'modern frameworks'}`,
              `Database integration and API communication`,
              `Asynchronous operations and error handling patterns`
            ],
            resources: [
              { name: `Production Framework Guide`, type: 'course' },
              { name: `API & Database Integration Patterns`, type: 'doc' }
            ],
            practicalProject: `Develop a full-featured micro-application with database persistence.`
          },
          {
            week: 3,
            title: `Advanced Architecture, Testing & CI/CD (${career.requiredSkills[2] || 'Advanced Patterns'})`,
            description: `Level up code quality, performance profiling, unit testing, and cloud deployment.`,
            topics: [
              `Unit & integration testing suites`,
              `Performance optimization and caching strategies`,
              `Automated deployment via CI/CD workflows`
            ],
            resources: [
              { name: `Clean Code & Testing Best Practices`, type: 'doc' },
              { name: `Docker Containerization Masterclass`, type: 'video' }
            ],
            practicalProject: `Deploy the application containerized with automated tests and monitoring.`
          },
          {
            week: 4,
            title: `Capstone Production Project & Interview Readiness`,
            description: `Deliver an end-to-end portfolio capstone and master common technical interview topics.`,
            topics: [
              `System design concepts relevant to ${career.name}`,
              `Portfolio polish, README documentation, and demo deployment`,
              `Mock technical behavioral & coding interview questions`
            ],
            resources: [
              { name: `${career.name} Interview Question Bank`, type: 'doc' },
              { name: 'System Design Interview Cheatsheet', type: 'course' }
            ],
            practicalProject: `End-to-End ${career.name} Production Capstone with live demo link.`
          }
        ],
        capstoneProject: `Enterprise-grade ${career.name} Showcase Application featuring authentication, live telemetry, and automated tests.`,
        recommendedCertifications: career.recommendedCertifications || ['AWS Certified Associate', 'Google Cloud Engineer']
      };

      res.json(fallbackRoadmap);
    } catch (err: any) {
      console.error('Roadmap error:', err);
      res.status(500).json({ error: err.message || 'Failed to generate roadmap' });
    }
  });

  // 6. Interactive AI Career Advisor Chat
  app.post('/api/chat-advisor', async (req, res) => {
    try {
      const { message, profile, history = [] } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const ai = getGemini();
      if (ai) {
        try {
          const systemContext = `You are "CareerPilot AI", an expert University Career Counselor, Tech Mentor, and Recruiter.
Current Student: ${profile?.fullName || 'Student'}
Degree & Branch: ${profile?.degree || 'Computer Science'} - ${profile?.branch || 'General'}
CGPA: ${profile?.cgpa || '8.5'} | Aptitude Score: ${profile?.aptitudeScore || '80'}%
Skills: ${(profile?.technicalSkills || []).join(', ') || 'Python, JavaScript'}
Target Career: ${profile?.targetCareerId || 'Software / Data / AI'}

Guidelines:
- Provide actionable, encouraging, concise, and structured guidance.
- Give concrete project ideas, interview tips, skill priority order, or resume feedback.
- Format with clear bold headings and bullet points where helpful.
- Suggest 3 follow-up prompt chips for the student.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: `${systemContext}\n\nStudent asks: "${message}"\n\nRespond with a helpful, structured answer followed by JSON formatted suggestions on the last line like: [SUGGESTIONS: ["Prompt 1", "Prompt 2", "Prompt 3"]]`,
          });

          const rawText = response.text || '';
          let text = rawText;
          let suggestions = [
            'What projects should I build for my resume?',
            'How should I prepare for coding interviews?',
            'What are the highest-paying tech skills right now?'
          ];

          const match = rawText.match(/\[SUGGESTIONS:\s*(\[.*?\])\]/s);
          if (match) {
            try {
              suggestions = JSON.parse(match[1]);
              text = rawText.replace(/\[SUGGESTIONS:\s*\[.*?\]\]/s, '').trim();
            } catch (e) {
              // fallback
            }
          }

          return res.json({
            text,
            suggestions,
          });
        } catch (aiErr) {
          console.log('AI Chat fallback:', aiErr);
        }
      }

      // High-quality contextual fallback
      let fallbackText = `Here is my recommendation for your career trajectory in **${profile?.degree || 'Technology'}**:\n\n` +
        `1. **Skill Priority**: Focus on mastering high-impact technologies like **${profile?.technicalSkills?.[0] || 'Python'}** and cloud tools like **Docker & AWS**.\n` +
        `2. **Project Portfolio**: Build at least 2 full-stack or end-to-end data projects with live demo links, test coverage, and clean GitHub documentation.\n` +
        `3. **Interview Preparation**: Practice data structures & algorithms on LeetCode/HackerRank, alongside system design basics.\n` +
        `4. **Aptitude & Soft Skills**: Keep your aptitude score high (${profile?.aptitudeScore || 80}%) as companies use it for initial screening rounds.`;

      if (message.toLowerCase().includes('resume')) {
        fallbackText = `Here are 4 tips to get your resume shortlisted:\n\n` +
          `- **Action Verbs & Metrics**: Use the Google XYZ formula: *"Accomplished [X], as measured by [Y], by doing [Z]"*.\n` +
          `- **Keywords**: Ensure required skills like *${profile?.technicalSkills?.slice(0, 3).join(', ') || 'Python, SQL'}* are clearly listed in a dedicated Skills section.\n` +
          `- **Projects**: Highlight 2 major projects with GitHub repository and live deployment URLs.\n` +
          `- **ATS Friendly**: Keep a clean 1-column layout without complex tables or images.`;
      }

      res.json({
        text: fallbackText,
        suggestions: [
          'How can I prepare for Data Science interviews?',
          'What are the top required skills for Cloud Engineers?',
          'How do I improve my aptitude test score?'
        ]
      });
    } catch (err: any) {
      console.error('Chat error:', err);
      res.status(500).json({ error: err.message || 'Failed to chat with advisor' });
    }
  });

  // Vite development / production middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Student Career & Skill Recommendation System running on port ${PORT}`);
  });
}

startServer();
