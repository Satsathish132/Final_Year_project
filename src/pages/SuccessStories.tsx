import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Briefcase, GraduationCap, ExternalLink } from 'lucide-react';

const stories = [
  {
    name: 'Thomas Hepner',
    role: 'Data Scientist',
    previousRole: 'College Graduate (Non-CS)',
    avatar: '📊',
    quote: 'I became a Data Scientist by quitting my job and competing in Kaggle competitions. After graduating in early 2014, I knew I wanted to become a Data Scientist but did not have the skillset yet. I taught myself Python, statistics, and machine learning through online courses and hands-on Kaggle projects. Within two years I landed my first data science role.',
    journey: '~2 years',
    rating: 5,
    source: 'https://thomashepner.net/posts/my-journey-to-self-taught-data-scientist',
  },
  {
    name: 'Alan Fullagar',
    role: 'BI Developer',
    previousRole: 'BPO Advisor (No Degree)',
    avatar: '💻',
    quote: 'I was 40 with no degree and no coding skills. I spent nine years at FirstSource Solutions handling multi-channel work, starting as an advisor and working up to deputy team leader. I decided to teach myself SQL, Python, and data visualization tools. Within two years of focused self-study, I transitioned into a full-time BI Developer role — proof that age and background are no barrier.',
    journey: '2 years',
    rating: 5,
    source: 'https://medium.com/@alan.fullagar/i-was-40-with-no-degree-and-no-coding-skills-heres-how-i-became-a-bi-developer-in-2-years-2adb4a3456aa',
  },
  {
    name: 'Troy Hunt',
    role: 'Cybersecurity Expert & Creator of "Have I Been Pwned"',
    previousRole: 'Software Developer',
    avatar: '🔐',
    quote: 'I started as a regular software developer and became passionate about web security. I built "Have I Been Pwned" as a side project to help people check if their data had been compromised in breaches. It grew into one of the most important cybersecurity tools on the internet, used by governments and organizations worldwide. Following your curiosity can lead to extraordinary impact.',
    journey: 'Ongoing',
    rating: 5,
    source: 'https://www.troyhunt.com/',
  },
  {
    name: 'Rebecca (Supermums Graduate)',
    role: 'Senior Customer Success Executive at GWI',
    previousRole: 'Teacher',
    avatar: '👩‍🏫',
    quote: 'I changed career from teaching into tech. After years in the classroom, I realized I wanted a new challenge. I completed a Salesforce Admin certification and leveraged my communication and organizational skills from teaching. Now I work as a Senior Customer Success Executive at GWI, a global data and AI company. Teaching gave me transferable skills I use every day.',
    journey: '~1 year',
    rating: 5,
    source: 'https://supermums.org/case-studies/career-change-from-teaching-to-tech-rebeccas-story/',
  },
  {
    name: 'Christopher Piccus',
    role: 'Software Developer',
    previousRole: 'Farmer & Construction Worker',
    avatar: '🌾',
    quote: 'I am a farmer, turned construction worker, turned programmer. I grew up on farms — my dad instilled a fierce work ethic in me. When I turned 19, I moved into construction. But I always had a curiosity about technology. I taught myself programming from scratch, studying nights and weekends. That same work ethic from farming and construction carried me through the tough learning curve into a new career in software development.',
    journey: 'Self-taught',
    rating: 5,
    source: 'https://linkedin.com/in/christopher-piccus-a6840918b',
  },
  {
    name: 'Career Changer from Nigeria',
    role: 'Professional Developer',
    previousRole: 'Non-Tech Professional',
    avatar: '🌍',
    quote: 'At the age of 41, and a little over two and a half years into my self-study journey, I was finally adjudged to have learned enough code to land a job where someone agreed to pay me regularly for writing it professionally. This milestone was especially sweet — breaking into tech at midlife, juggling fatherhood, and proving that it is never too late to reinvent yourself.',
    journey: '2.5 years',
    rating: 5,
    source: 'https://dev.to/trae_z/breaking-into-tech-at-midlife-a-nigerians-career-transition-story-4ghi',
  },
];

const SuccessStories = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Success Stories</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Real People, Real Transformations
          </h1>
          <p className="text-lg text-muted-foreground">
            These are real stories of people who changed their careers and broke into tech — from teachers and farmers to warehouse workers and mid-life career changers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div
              key={story.name}
              className="bg-card rounded-2xl border border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{story.avatar}</div>
                <div>
                  <h3 className="font-bold text-foreground">{story.name}</h3>
                  <p className="text-sm text-primary font-medium">{story.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: story.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <div className="relative mb-4">
                <Quote className="w-6 h-6 text-primary/20 absolute -top-1 -left-1" />
                <p className="text-sm text-muted-foreground leading-relaxed pl-6 italic">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    From: {story.previousRole}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    Journey: {story.journey}
                  </span>
                </div>
                <a
                  href={story.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  Read More <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SuccessStories;
