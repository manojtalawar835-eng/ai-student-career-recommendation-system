import { StudentProfile } from '../types';

export const SAMPLE_PROFILES: StudentProfile[] = [
  {
    id: 'student-alex',
    fullName: 'Alex Morgan',
    email: 'alex.morgan@university.edu',
    degree: 'B.Tech in Computer Science',
    branch: 'Artificial Intelligence & Machine Learning',
    cgpa: 8.8,
    technicalSkills: ['python', 'sql', 'machine learning', 'pandas', 'scikit-learn', 'data visualization', 'git', 'numpy'],
    softSkills: ['problem solving', 'communication', 'critical thinking', 'teamwork'],
    interests: ['data science', 'artificial intelligence', 'predictive analytics', 'machine learning'],
    aptitudeScore: 88,
    programmingScore: 90,
    mathScore: 85,
    communicationScore: 80,
    targetCareerId: 'data-scientist',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'student-priya',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@techinst.edu',
    degree: 'B.E. in Information Technology',
    branch: 'Software Engineering',
    cgpa: 9.1,
    technicalSkills: ['javascript', 'typescript', 'react', 'node.js', 'html', 'css', 'tailwind css', 'git', 'sql', 'express'],
    softSkills: ['creativity', 'communication', 'teamwork', 'agile'],
    interests: ['web development', 'ui/ux', 'frontend architecture', 'product design'],
    aptitudeScore: 82,
    programmingScore: 94,
    mathScore: 78,
    communicationScore: 88,
    targetCareerId: 'full-stack-developer',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'student-marcus',
    fullName: 'Marcus Vance',
    email: 'marcus.vance@state.edu',
    degree: 'B.S. in Computer Systems',
    branch: 'Cybersecurity & Cloud Infrastructure',
    cgpa: 7.9,
    technicalSkills: ['linux', 'networking', 'security', 'docker', 'python', 'bash', 'git', 'firewalls'],
    softSkills: ['problem solving', 'attention to detail', 'curiosity', 'resilience'],
    interests: ['ethical hacking', 'information security', 'cloud computing', 'penetration testing'],
    aptitudeScore: 76,
    programmingScore: 75,
    mathScore: 80,
    communicationScore: 72,
    targetCareerId: 'cybersecurity-analyst',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'student-elena',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@designacademy.edu',
    degree: 'B.Des in Digital Media',
    branch: 'Human Computer Interaction',
    cgpa: 8.5,
    technicalSkills: ['figma', 'ui design', 'ux research', 'wireframing', 'prototyping', 'html', 'css'],
    softSkills: ['empathy', 'communication', 'user testing', 'presentation', 'storytelling'],
    interests: ['user experience', 'design systems', 'product strategy', 'visual aesthetics'],
    aptitudeScore: 85,
    programmingScore: 50,
    mathScore: 65,
    communicationScore: 96,
    targetCareerId: 'ui-ux-designer',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  }
];

export const SAMPLE_STUDENTS = SAMPLE_PROFILES;
