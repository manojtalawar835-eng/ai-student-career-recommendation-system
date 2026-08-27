import { ResumeAnalysis } from '../types';
import { CAREERS_DATA } from '../data/careersData';

const COMMON_TECH_KEYWORDS = [
  'python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'sql', 'html', 'css',
  'react', 'next.js', 'vue', 'angular', 'node.js', 'express', 'django', 'flask', 'fastapi',
  'machine learning', 'deep learning', 'nlp', 'pytorch', 'tensorflow', 'scikit-learn', 'pandas', 'numpy',
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'linux', 'git', 'ci/cd', 'terraform', 'graphql',
  'mongodb', 'postgresql', 'mysql', 'redis', 'spark', 'tableau', 'power bi', 'figma', 'ui design',
  'networking', 'security', 'ethical hacking', 'flutter', 'react native', 'agile', 'scrum'
];

const SOFT_SKILLS_KEYWORDS = [
  'communication', 'leadership', 'teamwork', 'problem solving', 'critical thinking',
  'adaptability', 'collaboration', 'time management', 'presentation', 'analytical',
  'work ethic', 'mentorship', 'stakeholder management', 'creativity'
];

export function parseResumeText(rawText: string, fileName?: string): ResumeAnalysis {
  const textLower = rawText.toLowerCase();

  // Extract technical skills
  const extractedSkills: string[] = [];
  for (const keyword of COMMON_TECH_KEYWORDS) {
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(textLower)) {
      extractedSkills.push(keyword);
    }
  }

  // Extract soft skills
  const extractedSoftSkills: string[] = [];
  for (const keyword of SOFT_SKILLS_KEYWORDS) {
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(textLower)) {
      extractedSoftSkills.push(keyword);
    }
  }

  // Section checks (Education, Experience, Projects, Skills)
  const hasEducation = /education|university|college|b\.tech|b\.e|bachelor|degree/i.test(textLower);
  const hasExperience = /experience|internship|employment|work history|role/i.test(textLower);
  const hasProjects = /project|developed|built|implemented|created|portfolio/i.test(textLower);
  const hasContact = /email|phone|linkedin|github|@/i.test(textLower);

  let formattingScore = 40;
  if (hasEducation) formattingScore += 15;
  if (hasExperience) formattingScore += 15;
  if (hasProjects) formattingScore += 15;
  if (hasContact) formattingScore += 15;

  // Calculate ATS Score
  const skillCount = extractedSkills.length;
  const keywordScore = Math.min(60, skillCount * 6);
  const atsScore = Math.min(98, Math.round((keywordScore * 0.6) + (formattingScore * 0.4)));

  // Match against careers
  const suggestedCareers = CAREERS_DATA.map(career => {
    const matched = career.requiredSkills.filter(req => 
      extractedSkills.some(es => es === req.toLowerCase() || es.includes(req.toLowerCase()) || req.toLowerCase().includes(es))
    );
    const matchScore = Math.min(100, Math.round((matched.length / career.requiredSkills.length) * 100));
    return {
      name: career.name,
      matchScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);

  // Missing recommended keywords
  const topCareer = CAREERS_DATA[0];
  const missingKeywords = topCareer.requiredSkills.filter(s => !extractedSkills.includes(s.toLowerCase())).slice(0, 5);

  const strengths: string[] = [];
  if (extractedSkills.length >= 6) strengths.push(`Identified strong technical portfolio (${extractedSkills.length} verified technical keywords).`);
  if (hasProjects) strengths.push('Clear project outcomes with active implementation verbs.');
  if (hasEducation) strengths.push('Well-structured academic credential section.');
  if (extractedSoftSkills.length > 0) strengths.push(`Demonstrates collaborative abilities: ${extractedSoftSkills.slice(0, 3).join(', ')}.`);
  if (strengths.length === 0) strengths.push('Clean plain-text format easily readable by automated ATS parsers.');

  const improvements: string[] = [];
  if (!hasProjects) improvements.push('Add a dedicated "Projects" section highlighting GitHub repository links and impact metrics.');
  if (extractedSkills.length < 5) improvements.push('Include specific tools and frameworks (e.g. Docker, Git, Cloud platforms) to pass ATS filters.');
  if (!hasExperience) improvements.push('List relevant hackathons, freelance work, open-source contributions, or academic capstones.');
  improvements.push('Quantify accomplishments with measurable metrics (e.g., "improved load time by 35%").');

  return {
    fileName: fileName || 'Uploaded_Resume.pdf',
    atsScore,
    extractedSkills,
    extractedSoftSkills,
    suggestedCareers,
    missingKeywords,
    formattingScore,
    summaryText: `Parsed ${rawText.split(/\s+/).length} words. Found ${extractedSkills.length} core technical competencies across ${suggestedCareers.length} industry paths.`,
    strengths,
    improvements
  };
}
