import { StudentProfile, Career, RecommendationResult } from '../types';
import { CAREERS_DATA } from '../data/careersData';

/**
 * Normalizes strings and extracts clean tokens
 */
function tokenize(str: string): string[] {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 0);
}

/**
 * Calculates Jaccard similarity between two skill lists
 */
export function calculateJaccardSimilarity(userSkills: string[], requiredSkills: string[]): number {
  if (!userSkills.length || !requiredSkills.length) return 0;
  const userSet = new Set(userSkills.map(s => s.toLowerCase().trim()));
  const requiredSet = new Set(requiredSkills.map(s => s.toLowerCase().trim()));

  let intersectionCount = 0;
  for (const skill of userSet) {
    if (requiredSet.has(skill)) {
      intersectionCount++;
    } else {
      // Partial token match (e.g. "machine learning" vs "ml" or "react.js" vs "react")
      for (const req of requiredSet) {
        if (req.includes(skill) || skill.includes(req)) {
          intersectionCount += 0.8;
          break;
        }
      }
    }
  }

  const unionSize = userSet.size + requiredSet.size - Math.min(intersectionCount, userSet.size);
  return Math.min(1, intersectionCount / Math.max(1, unionSize));
}

/**
 * Calculates Cosine similarity using TF-IDF term frequency approximation
 */
export function calculateCosineSimilarity(userSkills: string[], requiredSkills: string[]): number {
  if (!userSkills.length || !requiredSkills.length) return 0;
  
  const userTokens = userSkills.flatMap(s => tokenize(s));
  const reqTokens = requiredSkills.flatMap(s => tokenize(s));
  
  const allTerms = Array.from(new Set([...userTokens, ...reqTokens]));
  
  const userVec = allTerms.map(term => userTokens.filter(t => t === term).length);
  const reqVec = allTerms.map(term => reqTokens.filter(t => t === term).length);
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < allTerms.length; i++) {
    dotProduct += userVec[i] * reqVec[i];
    normA += userVec[i] * userVec[i];
    normB += reqVec[i] * reqVec[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Hybrid Recommendation Engine
 * Combines Skill Similarity + Aptitude + CGPA + Interest alignment
 */
export function generateHybridRecommendations(
  profile: StudentProfile,
  careers: Career[] = CAREERS_DATA
): RecommendationResult[] {
  const userSkillSet = new Set(profile.technicalSkills.map(s => s.toLowerCase().trim()));
  const userInterests = profile.interests.map(i => i.toLowerCase().trim());

  const results: RecommendationResult[] = careers.map(career => {
    const requiredSkillsLower = career.requiredSkills.map(s => s.toLowerCase().trim());
    
    // 1. Direct Skill Matching & Gaps
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    for (const skill of career.requiredSkills) {
      const sLower = skill.toLowerCase().trim();
      const isMatch = Array.from(userSkillSet).some(us => us === sLower || us.includes(sLower) || sLower.includes(us));
      if (isMatch) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    }

    // 2. Compute similarity metrics
    const jaccard = calculateJaccardSimilarity(profile.technicalSkills, career.requiredSkills);
    const cosine = calculateCosineSimilarity(profile.technicalSkills, career.requiredSkills);
    const skillMatchScore = Math.min(100, Math.round(((matchedSkills.length / Math.max(1, career.requiredSkills.length)) * 0.5 + cosine * 0.3 + jaccard * 0.2) * 100));

    // 3. Interest match
    let interestScore = 50;
    if (userInterests.length > 0) {
      const interestMatches = career.interests.filter(ci => 
        userInterests.some(ui => ui.includes(ci.toLowerCase()) || ci.toLowerCase().includes(ui))
      );
      interestScore = Math.min(100, Math.round((interestMatches.length / Math.max(1, career.interests.length)) * 100 + 30));
    }

    // 4. Aptitude match score
    const aptitudeScore = profile.aptitudeScore || 50;

    // 5. Academic / CGPA normalized (assuming 10-scale or 4-scale)
    const normalizedCgpa = profile.cgpa > 4 ? (profile.cgpa / 10) * 100 : (profile.cgpa / 4) * 100;

    // 6. Weighted Hybrid Score
    // Final = (Skill Match * 0.50) + (Aptitude * 0.25) + (Interest * 0.15) + (CGPA * 0.10)
    const weightedScore = (skillMatchScore * 0.50) + (aptitudeScore * 0.25) + (interestScore * 0.15) + (normalizedCgpa * 0.10);
    const finalScore = Math.min(99, Math.max(15, Math.round(weightedScore)));

    // Generate explanation
    let explanation = '';
    if (finalScore >= 80) {
      explanation = `Exceptional alignment! You possess ${matchedSkills.length} of ${career.requiredSkills.length} core competencies for ${career.name}, backed by a strong aptitude score of ${aptitudeScore}%.`;
    } else if (finalScore >= 60) {
      explanation = `Solid foundation. You have good aptitude and key foundational skills (${matchedSkills.slice(0, 3).join(', ') || 'programming'}), but mastering ${missingSkills.slice(0, 2).join(' & ')} will accelerate your hiring readiness.`;
    } else {
      explanation = `Emerging opportunity. Transitioning into ${career.name} requires upskilling in core areas like ${missingSkills.slice(0, 3).join(', ')}.`;
    }

    const actionableTips: string[] = [];
    if (missingSkills.length > 0) {
      actionableTips.push(`Build a portfolio project focusing on ${missingSkills[0]}.`);
      if (missingSkills[1]) actionableTips.push(`Take a structured mini-course on ${missingSkills[1]}.`);
    }
    actionableTips.push(`Prepare for ${career.name} system interviews using our skill roadmap.`);

    return {
      careerId: career.id,
      name: career.name,
      category: career.category,
      score: finalScore,
      skillMatchPercentage: skillMatchScore,
      aptitudeMatchPercentage: aptitudeScore,
      interestMatchPercentage: interestScore,
      explanation,
      matchedSkills,
      missingSkills,
      difficulty: career.difficulty,
      avgSalaryUSD: career.avgSalaryUSD,
      actionableTips
    };
  });

  return results.sort((a, b) => b.score - a.score);
}
