export interface CareerRecommendation {
  id: string;
  title: string;
  description: string;
  skills: string[];
  interests: string[];
  personality: string[];
  workStyle: string[];
  salary: string;
  growth: string;
  demand: 'High' | 'Very High' | 'Growing';
}

// Updated skill categories
export const skills = [
  'Programming Languages',
  'Web / App Development',
  'Data Analysis',
  'Machine Learning',
  'Cloud Computing',
  'Networking',
  'Cybersecurity',
  'UI/UX Design',
  'Testing & Automation',
] as const;

// Updated interest categories
export const interests = [
  'Problem Solving',
  'Data & Research',
  'Designing Interfaces',
  'Security & Ethical Hacking',
  'Building Products',
  'Teaching & Mentoring',
  'Innovation & Startups',
  'Gaming / AR / VR',
] as const;

// Updated personality options
export const personalities = [
  'Analytical',
  'Creative',
  'Logical Thinker',
  'Detail-Oriented',
  'Leadership-Oriented',
  'Research-Focused',
] as const;

// Updated work style options
export const workStyles = [
  'Individual-focused',
  'Team-based',
  'Remote-friendly',
  'Structured environment',
  'Flexible environment',
  'Fast-paced startup style',
] as const;

// All 25 predefined careers
export const careers: CareerRecommendation[] = [
  {
    id: 'software-developer',
    title: 'Software Developer / Software Engineer',
    description: 'Design, develop, test, and maintain software applications across various platforms and domains.',
    skills: ['Programming Languages', 'Web / App Development', 'Testing & Automation'],
    interests: ['Problem Solving', 'Building Products'],
    personality: ['Logical Thinker', 'Detail-Oriented', 'Analytical'],
    workStyle: ['Team-based', 'Remote-friendly', 'Flexible environment'],
    salary: '$80k - $150k',
    growth: '+25%',
    demand: 'High',
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    description: 'Build and maintain websites and web applications using modern frontend and backend technologies.',
    skills: ['Web / App Development', 'Programming Languages', 'UI/UX Design'],
    interests: ['Building Products', 'Designing Interfaces', 'Problem Solving'],
    personality: ['Creative', 'Detail-Oriented', 'Logical Thinker'],
    workStyle: ['Remote-friendly', 'Flexible environment', 'Team-based'],
    salary: '$70k - $130k',
    growth: '+23%',
    demand: 'High',
  },
  {
    id: 'mobile-app-developer',
    title: 'Mobile App Developer',
    description: 'Create native and cross-platform mobile applications for iOS and Android devices.',
    skills: ['Web / App Development', 'Programming Languages', 'UI/UX Design'],
    interests: ['Building Products', 'Designing Interfaces', 'Problem Solving'],
    personality: ['Creative', 'Detail-Oriented', 'Logical Thinker'],
    workStyle: ['Remote-friendly', 'Flexible environment', 'Individual-focused'],
    salary: '$85k - $145k',
    growth: '+22%',
    demand: 'High',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Analyze data sets to identify trends, create visualizations, and support business decisions.',
    skills: ['Data Analysis', 'Programming Languages'],
    interests: ['Data & Research', 'Problem Solving'],
    personality: ['Analytical', 'Detail-Oriented', 'Logical Thinker'],
    workStyle: ['Structured environment', 'Team-based', 'Remote-friendly'],
    salary: '$65k - $110k',
    growth: '+20%',
    demand: 'High',
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Extract insights from complex data sets using statistical analysis and machine learning techniques.',
    skills: ['Data Analysis', 'Machine Learning', 'Programming Languages'],
    interests: ['Data & Research', 'Problem Solving', 'Innovation & Startups'],
    personality: ['Analytical', 'Research-Focused', 'Logical Thinker'],
    workStyle: ['Individual-focused', 'Remote-friendly', 'Flexible environment'],
    salary: '$110k - $170k',
    growth: '+28%',
    demand: 'Very High',
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    description: 'Build, deploy, and maintain machine learning models and systems at scale.',
    skills: ['Machine Learning', 'Programming Languages', 'Cloud Computing', 'Data Analysis'],
    interests: ['Data & Research', 'Problem Solving', 'Innovation & Startups'],
    personality: ['Analytical', 'Research-Focused', 'Logical Thinker'],
    workStyle: ['Remote-friendly', 'Flexible environment', 'Team-based'],
    salary: '$120k - $200k',
    growth: '+40%',
    demand: 'Very High',
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    description: 'Design and implement artificial intelligence solutions including NLP, computer vision, and deep learning systems.',
    skills: ['Machine Learning', 'Programming Languages', 'Cloud Computing'],
    interests: ['Innovation & Startups', 'Data & Research', 'Problem Solving'],
    personality: ['Research-Focused', 'Analytical', 'Creative'],
    workStyle: ['Flexible environment', 'Remote-friendly', 'Fast-paced startup style'],
    salary: '$130k - $210k',
    growth: '+45%',
    demand: 'Very High',
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    description: 'Design, implement, and manage cloud infrastructure and services for scalable applications.',
    skills: ['Cloud Computing', 'Networking', 'Programming Languages'],
    interests: ['Problem Solving', 'Building Products'],
    personality: ['Logical Thinker', 'Analytical', 'Detail-Oriented'],
    workStyle: ['Team-based', 'Remote-friendly', 'Structured environment'],
    salary: '$100k - $180k',
    growth: '+35%',
    demand: 'Very High',
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Bridge development and operations through automation, CI/CD pipelines, and infrastructure management.',
    skills: ['Cloud Computing', 'Programming Languages', 'Testing & Automation', 'Networking'],
    interests: ['Building Products', 'Problem Solving'],
    personality: ['Logical Thinker', 'Detail-Oriented', 'Analytical'],
    workStyle: ['Team-based', 'Remote-friendly', 'Fast-paced startup style'],
    salary: '$100k - $165k',
    growth: '+24%',
    demand: 'High',
  },
  {
    id: 'systems-engineer',
    title: 'Systems Engineer',
    description: 'Design, implement, and maintain complex IT infrastructure and system architectures.',
    skills: ['Networking', 'Cloud Computing', 'Programming Languages'],
    interests: ['Problem Solving', 'Building Products'],
    personality: ['Logical Thinker', 'Analytical', 'Detail-Oriented'],
    workStyle: ['Structured environment', 'Team-based', 'Individual-focused'],
    salary: '$90k - $150k',
    growth: '+18%',
    demand: 'High',
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from cyber threats through monitoring, analysis, and incident response.',
    skills: ['Cybersecurity', 'Networking', 'Programming Languages'],
    interests: ['Security & Ethical Hacking', 'Problem Solving', 'Data & Research'],
    personality: ['Detail-Oriented', 'Analytical', 'Logical Thinker'],
    workStyle: ['Structured environment', 'Team-based', 'Individual-focused'],
    salary: '$85k - $140k',
    growth: '+32%',
    demand: 'Very High',
  },
  {
    id: 'ethical-hacker',
    title: 'Ethical Hacker',
    description: 'Conduct authorized penetration testing to identify vulnerabilities and strengthen security.',
    skills: ['Cybersecurity', 'Networking', 'Programming Languages'],
    interests: ['Security & Ethical Hacking', 'Problem Solving'],
    personality: ['Analytical', 'Creative', 'Detail-Oriented'],
    workStyle: ['Individual-focused', 'Flexible environment', 'Remote-friendly'],
    salary: '$95k - $160k',
    growth: '+35%',
    demand: 'Very High',
  },
  {
    id: 'network-engineer',
    title: 'Network Engineer',
    description: 'Design, implement, and maintain network infrastructure including routers, switches, and firewalls.',
    skills: ['Networking', 'Cybersecurity', 'Cloud Computing'],
    interests: ['Problem Solving', 'Building Products'],
    personality: ['Logical Thinker', 'Detail-Oriented', 'Analytical'],
    workStyle: ['Structured environment', 'Team-based', 'Individual-focused'],
    salary: '$75k - $130k',
    growth: '+15%',
    demand: 'High',
  },
  {
    id: 'software-tester',
    title: 'Software Tester',
    description: 'Ensure software quality through manual and automated testing methodologies.',
    skills: ['Testing & Automation', 'Programming Languages'],
    interests: ['Problem Solving', 'Data & Research'],
    personality: ['Detail-Oriented', 'Analytical', 'Logical Thinker'],
    workStyle: ['Team-based', 'Structured environment', 'Remote-friendly'],
    salary: '$60k - $100k',
    growth: '+15%',
    demand: 'High',
  },
  {
    id: 'automation-test-engineer',
    title: 'Automation Test Engineer',
    description: 'Develop and maintain automated test frameworks and scripts for continuous testing.',
    skills: ['Testing & Automation', 'Programming Languages', 'Web / App Development'],
    interests: ['Problem Solving', 'Building Products'],
    personality: ['Logical Thinker', 'Detail-Oriented', 'Analytical'],
    workStyle: ['Team-based', 'Remote-friendly', 'Flexible environment'],
    salary: '$80k - $130k',
    growth: '+20%',
    demand: 'High',
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    description: 'Create intuitive and visually appealing user interfaces and experiences for digital products.',
    skills: ['UI/UX Design', 'Web / App Development'],
    interests: ['Designing Interfaces', 'Building Products', 'Problem Solving'],
    personality: ['Creative', 'Detail-Oriented', 'Analytical'],
    workStyle: ['Flexible environment', 'Remote-friendly', 'Team-based'],
    salary: '$75k - $130k',
    growth: '+18%',
    demand: 'High',
  },
  {
    id: 'technical-product-manager',
    title: 'Technical Product Manager',
    description: 'Lead product development by bridging business goals with technical implementation.',
    skills: ['Web / App Development', 'Data Analysis'],
    interests: ['Building Products', 'Problem Solving', 'Innovation & Startups'],
    personality: ['Leadership-Oriented', 'Analytical', 'Creative'],
    workStyle: ['Team-based', 'Fast-paced startup style', 'Flexible environment'],
    salary: '$110k - $175k',
    growth: '+22%',
    demand: 'High',
  },
  {
    id: 'research-scientist',
    title: 'Research Scientist',
    description: 'Conduct cutting-edge research in computer science, AI, or related fields.',
    skills: ['Machine Learning', 'Programming Languages', 'Data Analysis'],
    interests: ['Data & Research', 'Innovation & Startups', 'Problem Solving'],
    personality: ['Research-Focused', 'Analytical', 'Creative'],
    workStyle: ['Individual-focused', 'Flexible environment', 'Structured environment'],
    salary: '$100k - $180k',
    growth: '+30%',
    demand: 'Very High',
  },
  {
    id: 'computer-vision-engineer',
    title: 'Computer Vision Engineer',
    description: 'Develop systems that can interpret and analyze visual information from images and videos.',
    skills: ['Machine Learning', 'Programming Languages', 'Data Analysis'],
    interests: ['Data & Research', 'Innovation & Startups', 'Problem Solving'],
    personality: ['Research-Focused', 'Analytical', 'Detail-Oriented'],
    workStyle: ['Team-based', 'Flexible environment', 'Remote-friendly'],
    salary: '$115k - $190k',
    growth: '+35%',
    demand: 'Very High',
  },
  {
    id: 'blockchain-developer',
    title: 'Blockchain Developer',
    description: 'Build decentralized applications and smart contracts on blockchain platforms.',
    skills: ['Programming Languages', 'Web / App Development', 'Cybersecurity'],
    interests: ['Innovation & Startups', 'Building Products', 'Security & Ethical Hacking'],
    personality: ['Logical Thinker', 'Analytical', 'Creative'],
    workStyle: ['Remote-friendly', 'Fast-paced startup style', 'Flexible environment'],
    salary: '$100k - $180k',
    growth: '+28%',
    demand: 'Growing',
  },
  {
    id: 'game-developer',
    title: 'Game Developer',
    description: 'Create interactive games for various platforms including PC, console, and mobile.',
    skills: ['Programming Languages', 'Web / App Development', 'UI/UX Design'],
    interests: ['Gaming / AR / VR', 'Building Products', 'Designing Interfaces'],
    personality: ['Creative', 'Logical Thinker', 'Detail-Oriented'],
    workStyle: ['Team-based', 'Flexible environment', 'Fast-paced startup style'],
    salary: '$70k - $140k',
    growth: '+18%',
    demand: 'Growing',
  },
  {
    id: 'ar-vr-developer',
    title: 'AR / VR Developer',
    description: 'Build immersive augmented and virtual reality experiences and applications.',
    skills: ['Programming Languages', 'Web / App Development', 'UI/UX Design'],
    interests: ['Gaming / AR / VR', 'Innovation & Startups', 'Designing Interfaces'],
    personality: ['Creative', 'Analytical', 'Logical Thinker'],
    workStyle: ['Team-based', 'Flexible environment', 'Fast-paced startup style'],
    salary: '$85k - $160k',
    growth: '+25%',
    demand: 'Growing',
  },
  {
    id: 'technical-support-engineer',
    title: 'Technical Support Engineer',
    description: 'Provide technical assistance and troubleshooting support for software and hardware products.',
    skills: ['Networking', 'Programming Languages', 'Cloud Computing'],
    interests: ['Problem Solving', 'Teaching & Mentoring'],
    personality: ['Detail-Oriented', 'Analytical', 'Logical Thinker'],
    workStyle: ['Team-based', 'Structured environment', 'Remote-friendly'],
    salary: '$55k - $95k',
    growth: '+12%',
    demand: 'High',
  },
  {
    id: 'cs-lecturer',
    title: 'Computer Science Lecturer / Trainer',
    description: 'Teach and train students or professionals in computer science concepts and technologies.',
    skills: ['Programming Languages', 'Data Analysis', 'Web / App Development'],
    interests: ['Teaching & Mentoring', 'Data & Research', 'Problem Solving'],
    personality: ['Leadership-Oriented', 'Creative', 'Analytical'],
    workStyle: ['Structured environment', 'Individual-focused', 'Flexible environment'],
    salary: '$60k - $120k',
    growth: '+10%',
    demand: 'High',
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneur',
    description: 'Start and grow technology-based businesses and startups.',
    skills: ['Web / App Development', 'Cloud Computing', 'Data Analysis'],
    interests: ['Innovation & Startups', 'Building Products', 'Problem Solving'],
    personality: ['Leadership-Oriented', 'Creative', 'Analytical'],
    workStyle: ['Fast-paced startup style', 'Flexible environment', 'Individual-focused'],
    salary: 'Variable',
    growth: '+15%',
    demand: 'Growing',
  },
];

export interface UserPreferences {
  skills: string[];
  interests: string[];
  personality: string[];
  workStyle: string[];
}

export interface RecommendationResult extends CareerRecommendation {
  matchScore: number;
  matchedSkills: string[];
  matchedInterests: string[];
  matchedPersonality: string[];
  matchedWorkStyle: string[];
  explanation: string[];
}

export function getCareerRecommendations(preferences: UserPreferences): RecommendationResult[] {
  const { skills: userSkills, interests: userInterests, personality: userPersonality, workStyle: userWorkStyle } = preferences;

  // Check if any preferences are selected
  const hasPreferences = 
    userSkills.length > 0 || 
    userInterests.length > 0 || 
    userPersonality.length > 0 || 
    userWorkStyle.length > 0;

  if (!hasPreferences) {
    return [];
  }

  const results: RecommendationResult[] = careers.map((career) => {
    const matchedSkills = career.skills.filter((s) => userSkills.includes(s));
    const matchedInterests = career.interests.filter((i) => userInterests.includes(i));
    const matchedPersonality = career.personality.filter((p) => userPersonality.includes(p));
    const matchedWorkStyle = career.workStyle.filter((w) => userWorkStyle.includes(w));

    // Calculate match score (weighted)
    const skillScore = matchedSkills.length * 3; // Skills weighted highest
    const interestScore = matchedInterests.length * 2;
    const personalityScore = matchedPersonality.length * 1.5;
    const workStyleScore = matchedWorkStyle.length * 1;

    const matchScore = skillScore + interestScore + personalityScore + workStyleScore;

    // Generate explanations
    const explanation: string[] = [];
    
    if (matchedSkills.length > 0) {
      explanation.push(`Recommended because your skills in ${matchedSkills.join(', ')} match this role.`);
    }
    if (matchedInterests.length > 0) {
      explanation.push(`Matches your interest in ${matchedInterests.join(' and ').toLowerCase()}.`);
    }
    if (matchedPersonality.length > 0) {
      explanation.push(`Suitable for your ${matchedPersonality.join(', ').toLowerCase()} personality.`);
    }
    if (matchedWorkStyle.length > 0) {
      explanation.push(`Fits your preference for ${matchedWorkStyle.join(', ').toLowerCase()} work.`);
    }

    return {
      ...career,
      matchScore,
      matchedSkills,
      matchedInterests,
      matchedPersonality,
      matchedWorkStyle,
      explanation,
    };
  });

  // Filter out careers with no matches and sort by score
  return results
    .filter((r) => r.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}
