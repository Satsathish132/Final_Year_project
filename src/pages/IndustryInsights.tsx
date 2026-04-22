import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, Globe, Cpu, Shield, Cloud } from 'lucide-react';

const insights = [
  {
    icon: Cpu,
    title: 'AI & Machine Learning Domination',
    stat: '40%',
    statLabel: 'Job Growth',
    description: 'AI/ML roles are growing faster than any other tech sector. Companies across all industries are investing heavily in AI capabilities, creating unprecedented demand for engineers who can build and deploy machine learning models.',
    trend: 'Rising',
  },
  {
    icon: Shield,
    title: 'Cybersecurity Skills Gap Widens',
    stat: '3.5M',
    statLabel: 'Unfilled Jobs',
    description: 'The global cybersecurity workforce gap continues to grow. Organizations are desperate for security professionals who understand cloud security, threat detection, and compliance frameworks.',
    trend: 'Critical',
  },
  {
    icon: Cloud,
    title: 'Cloud Computing Becomes Standard',
    stat: '94%',
    statLabel: 'Enterprise Adoption',
    description: 'Nearly all enterprises now use cloud services. Multi-cloud strategies are becoming the norm, driving demand for cloud architects and DevOps engineers who can work across AWS, Azure, and GCP.',
    trend: 'Stable Growth',
  },
  {
    icon: Globe,
    title: 'Remote-First Is the New Normal',
    stat: '65%',
    statLabel: 'Remote Roles',
    description: 'The majority of tech companies now offer remote or hybrid positions. This has expanded the talent pool globally and changed how teams collaborate, communicate, and deliver software.',
    trend: 'Established',
  },
  {
    icon: TrendingUp,
    title: 'Full-Stack Developers in High Demand',
    stat: '$120K',
    statLabel: 'Avg Salary',
    description: 'Companies prefer developers who can work across the entire stack. Full-stack engineers with expertise in React, Node.js, and cloud deployment are commanding premium salaries.',
    trend: 'Growing',
  },
  {
    icon: BarChart3,
    title: 'Data Engineering Surpasses Data Science',
    stat: '2.5x',
    statLabel: 'More Openings',
    description: 'While data science remains popular, data engineering roles now outnumber data scientist positions. Organizations need professionals who can build robust data pipelines and infrastructure.',
    trend: 'Accelerating',
  },
];

const IndustryInsights = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Industry Insights</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tech Industry Trends & Analysis
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay informed with the latest industry data, emerging trends, and market analysis to make smarter career decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {insights.map((insight, index) => (
            <div
              key={insight.title}
              className="bg-card rounded-2xl border border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <insight.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-foreground">{insight.title}</h3>
                    <Badge variant="outline" className="text-xs">{insight.trend}</Badge>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-primary">{insight.stat}</span>
                    <span className="text-sm text-muted-foreground">{insight.statLabel}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndustryInsights;
