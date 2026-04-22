import { Code, Globe, Database, Brain, Shield, Smartphone, BarChart3, Server, Palette, Gamepad2 } from 'lucide-react';

export interface FinalProject {
  title: string;
  description: string;
  requirements: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const finalProjects: Record<string, FinalProject[]> = {
  'software-developer': [
    { title: 'Full-Stack Task Manager', description: 'Build a task management app with user auth, CRUD operations, and a REST API backend.', requirements: ['User authentication', 'Task CRUD with categories', 'REST API', 'Responsive UI', 'Database integration'], difficulty: 'Intermediate' },
    { title: 'Portfolio Website', description: 'Create a personal portfolio with project showcase, contact form, and blog section.', requirements: ['Responsive design', 'Project gallery', 'Contact form', 'Dark/light mode'], difficulty: 'Beginner' },
  ],
  'data-scientist': [
    { title: 'Predictive Analytics Dashboard', description: 'Build an end-to-end data pipeline that cleans data, trains a model, and displays predictions.', requirements: ['Data cleaning pipeline', 'ML model training', 'Visualization dashboard', 'Model evaluation metrics'], difficulty: 'Advanced' },
    { title: 'Exploratory Data Analysis Report', description: 'Analyze a public dataset and present insights with visualizations.', requirements: ['Data cleaning', 'Statistical analysis', 'Charts and graphs', 'Written insights'], difficulty: 'Beginner' },
  ],
  'web-developer': [
    { title: 'E-Commerce Store', description: 'Build a functional online store with product listings, cart, and checkout flow.', requirements: ['Product catalog', 'Shopping cart', 'Checkout process', 'Responsive design', 'Search & filters'], difficulty: 'Intermediate' },
  ],
  'mobile-developer': [
    { title: 'Social Media App', description: 'Create a mobile app with user profiles, posts, and real-time messaging.', requirements: ['User authentication', 'Post creation with images', 'Real-time chat', 'Push notifications'], difficulty: 'Advanced' },
  ],
  'cloud-engineer': [
    { title: 'Cloud-Deployed Microservice', description: 'Deploy a containerized microservice with CI/CD pipeline and monitoring.', requirements: ['Docker containerization', 'CI/CD pipeline', 'Cloud deployment', 'Monitoring & logging'], difficulty: 'Intermediate' },
  ],
  'ai-ml-engineer': [
    { title: 'AI Chatbot', description: 'Build a conversational AI chatbot with NLP capabilities and a web interface.', requirements: ['NLP model integration', 'Conversation handling', 'Web UI', 'Response evaluation'], difficulty: 'Advanced' },
  ],
  'cybersecurity-analyst': [
    { title: 'Security Audit Tool', description: 'Create a tool that scans for common vulnerabilities and generates security reports.', requirements: ['Vulnerability scanning', 'Report generation', 'Risk scoring', 'Remediation suggestions'], difficulty: 'Intermediate' },
  ],
  'devops-engineer': [
    { title: 'Infrastructure as Code Setup', description: 'Set up a complete CI/CD pipeline with automated testing, deployment, and monitoring.', requirements: ['CI/CD pipeline', 'Automated testing', 'Container orchestration', 'Monitoring dashboard'], difficulty: 'Advanced' },
  ],
  'database-administrator': [
    { title: 'Database Migration System', description: 'Build a database management tool with backup, migration, and performance monitoring.', requirements: ['Schema design', 'Migration scripts', 'Backup automation', 'Query optimization'], difficulty: 'Intermediate' },
  ],
  'ui-ux-designer': [
    { title: 'Design System', description: 'Create a comprehensive design system with component library and documentation.', requirements: ['Component library', 'Style guide', 'Accessibility guidelines', 'Interactive prototypes'], difficulty: 'Intermediate' },
  ],
};

// Default project for careers without specific entries
const defaultProject: FinalProject = {
  title: 'Capstone Portfolio Project',
  description: 'Build a comprehensive project that demonstrates all skills learned throughout the roadmap.',
  requirements: ['Apply core concepts', 'Clean code practices', 'Documentation', 'Presentation/demo'],
  difficulty: 'Intermediate',
};

export function getFinalProjects(careerId: string): FinalProject[] {
  return finalProjects[careerId] || [defaultProject];
}
