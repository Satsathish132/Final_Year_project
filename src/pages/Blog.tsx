import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'How to Break Into Tech Without a CS Degree',
    excerpt: 'A comprehensive guide for career changers looking to transition into the tech industry through self-learning, bootcamps, and strategic networking.',
    author: 'Sarah Chen',
    date: 'Mar 28, 2026',
    readTime: '8 min read',
    category: 'Career Change',
    image: '💡',
  },
  {
    id: 2,
    title: 'The Rise of AI Engineering: What You Need to Know',
    excerpt: 'AI engineering is one of the fastest-growing fields in tech. Learn what skills you need, what the job looks like day-to-day, and how to get started.',
    author: 'James Rodriguez',
    date: 'Mar 20, 2026',
    readTime: '6 min read',
    category: 'AI & ML',
    image: '🤖',
  },
  {
    id: 3,
    title: 'Building a Portfolio That Gets You Hired',
    excerpt: 'Your portfolio is your strongest asset. Here is how to showcase projects, write case studies, and present your work to potential employers.',
    author: 'Priya Patel',
    date: 'Mar 15, 2026',
    readTime: '10 min read',
    category: 'Job Search',
    image: '🎯',
  },
  {
    id: 4,
    title: 'Remote Work in 2026: Best Practices for Developers',
    excerpt: 'Remote work is here to stay. Discover productivity tips, communication strategies, and tools that successful remote developers use every day.',
    author: 'Alex Kim',
    date: 'Mar 10, 2026',
    readTime: '7 min read',
    category: 'Workplace',
    image: '🏠',
  },
  {
    id: 5,
    title: 'Understanding Cloud Certifications: AWS vs Azure vs GCP',
    excerpt: 'A detailed comparison of the top cloud certifications, their career impact, difficulty level, and which one is right for your career goals.',
    author: 'Michael Torres',
    date: 'Mar 5, 2026',
    readTime: '12 min read',
    category: 'Cloud',
    image: '☁️',
  },
  {
    id: 6,
    title: 'The Complete Guide to Technical Interviews in 2026',
    excerpt: 'From coding challenges to system design rounds, here is everything you need to know to ace your next technical interview at top tech companies.',
    author: 'Emily Zhang',
    date: 'Feb 28, 2026',
    readTime: '15 min read',
    category: 'Interviews',
    image: '📝',
  },
];

const Blog = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Blog</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Latest Insights & Articles
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay ahead with expert advice, industry trends, and actionable career guidance from our team of professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in-up flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-5xl mb-4">{post.image}</div>
                <Badge variant="outline" className="w-fit mb-3 text-xs">{post.category}</Badge>
                <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2">{post.title}</h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
