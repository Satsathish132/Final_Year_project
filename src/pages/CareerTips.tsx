import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Target, BookOpen, Zap, Users, Award } from 'lucide-react';

const tips = [
  {
    icon: Target,
    title: 'Set Clear Career Goals',
    description: 'Define specific, measurable career objectives with timelines. Break your 5-year vision into quarterly milestones. Track progress regularly and adjust your strategy based on industry changes.',
    category: 'Planning',
  },
  {
    icon: BookOpen,
    title: 'Never Stop Learning',
    description: 'Dedicate at least 5 hours per week to learning new technologies. Follow industry blogs, take online courses, and participate in coding challenges to keep your skills sharp and relevant.',
    category: 'Growth',
  },
  {
    icon: Users,
    title: 'Build Your Network',
    description: 'Attend tech meetups, contribute to open source, and engage on LinkedIn. Your network is your net worth — 70% of jobs are filled through networking rather than job boards.',
    category: 'Networking',
  },
  {
    icon: Zap,
    title: 'Master One Thing First',
    description: 'Instead of being a jack of all trades, become deeply proficient in one technology stack. Specialists command higher salaries and are more sought after by employers.',
    category: 'Skills',
  },
  {
    icon: Award,
    title: 'Get Certified',
    description: 'Industry certifications like AWS Solutions Architect, Google Cloud Professional, or PMP validate your expertise and can increase your salary by 10-20% on average.',
    category: 'Credentials',
  },
  {
    icon: Lightbulb,
    title: 'Build Projects That Solve Real Problems',
    description: 'Employers value practical experience. Build side projects that address real-world problems, document your process, and showcase them in your portfolio.',
    category: 'Portfolio',
  },
  {
    icon: Target,
    title: 'Tailor Your Resume for Each Role',
    description: 'Customize your resume to match each job description. Use keywords from the posting, quantify your achievements, and highlight relevant projects and technologies.',
    category: 'Job Search',
  },
  {
    icon: Users,
    title: 'Find a Mentor',
    description: 'A good mentor can accelerate your career by years. Look for mentors within your company, at meetups, or through platforms like ADPList and MentorCruise.',
    category: 'Mentorship',
  },
  {
    icon: Zap,
    title: 'Practice System Design',
    description: 'For senior roles, system design knowledge is crucial. Study distributed systems, learn about scalability patterns, and practice designing real-world systems like URL shorteners or chat apps.',
    category: 'Interviews',
  },
];

const CareerTips = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Career Tips</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Actionable Career Advice
          </h1>
          <p className="text-lg text-muted-foreground">
            Proven strategies and expert tips to help you navigate your tech career, land your dream job, and grow professionally.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={tip.title}
              className="bg-card rounded-2xl border border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <tip.icon className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="outline" className="mb-3 text-xs">{tip.category}</Badge>
              <h3 className="text-lg font-bold text-foreground mb-2">{tip.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CareerTips;
