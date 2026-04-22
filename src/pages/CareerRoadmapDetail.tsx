import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ExternalLink, TrendingUp, DollarSign, Briefcase, Star, Bookmark, Trophy, ClipboardList, ExternalLink as LinkIcon } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { roadmaps } from '@/data/careers';
import { trackActivity } from '@/lib/activityTracker';
import { isCareerSaved, toggleSaveCareer } from '@/lib/savedCareers';
import { useToast } from '@/hooks/use-toast';
import StepQuiz from '@/components/StepQuiz';
import { getFinalProjects } from '@/data/finalProjects';
const CareerRoadmapDetail = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    const saved = localStorage.getItem(`roadmap_progress_${careerId}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const [websiteUrl, setWebsiteUrl] = useState("");
const [analysisResult, setAnalysisResult] = useState<any>(null);
const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const roadmap = roadmaps.find((r) => r.id === careerId);

  useEffect(() => {
    if (roadmap) {
      trackActivity('Viewed', `${roadmap.title} Roadmap`);
      setIsSaved(isCareerSaved(roadmap.id));
    }
  }, [roadmap]);

  const handleToggleSave = () => {
    if (!roadmap) return;
    const saved = toggleSaveCareer(roadmap.id);
    setIsSaved(saved);
    toast({
      title: saved ? 'Career saved' : 'Career removed',
      description: saved ? `${roadmap.title} added to saved careers.` : `${roadmap.title} removed from saved careers.`,
    });
  };
  const handleAnalyzeWebsite = async () => {
  if (!websiteUrl) return;

  setLoadingAnalysis(true);
  setAnalysisResult(null);

  try {
    const res = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Analyze this website: ${websiteUrl}`,
      }),
    });

    const data = await res.json();

    try {
      setAnalysisResult(JSON.parse(data.reply));
    } catch {
      setAnalysisResult({ raw: data.reply });
    }
  } catch (err) {
    console.error(err);
  }

  setLoadingAnalysis(false);
};
 
   if (!roadmap) {
     return (
       <Layout>
         <div className="container mx-auto px-4 py-16 text-center">
           <h1 className="text-2xl font-bold text-foreground mb-4">Roadmap not found</h1>
           <Button onClick={() => navigate('/roadmaps')}>
             <ArrowLeft className="w-4 h-4 mr-2" />
             Back to Career Roadmaps
           </Button>
         </div>
       </Layout>
     );
   }
 
   const toggleStepComplete = (stepId: number) => {
     let updated: number[];
     if (completedSteps.includes(stepId)) {
       updated = completedSteps.filter((id) => id !== stepId);
     } else {
       updated = [...completedSteps, stepId];
     }
     setCompletedSteps(updated);
     localStorage.setItem(`roadmap_progress_${careerId}`, JSON.stringify(updated));
   };

   const handleQuizPass = (stepId: number) => {
     if (!completedSteps.includes(stepId)) {
       const updated = [...completedSteps, stepId];
       setCompletedSteps(updated);
       localStorage.setItem(`roadmap_progress_${careerId}`, JSON.stringify(updated));
     }
   };

   const allStepsCompleted = roadmap.steps.every((step) => completedSteps.includes(step.id));
 
   const IconComponent = roadmap.icon;
 
   return (
     <Layout>
       <div className="container mx-auto px-4 py-8">
         {/* Back Button */}
         <Button
           variant="ghost"
           onClick={() => navigate('/roadmaps')}
           className="mb-6 gap-2"
         >
           <ArrowLeft className="w-4 h-4" />
           Back to Career Roadmaps
         </Button>
 
         {/* Roadmap Header */}
         <div className="bg-card rounded-2xl border border-border p-8 mb-8 animate-fade-in-up">
           <div className="flex flex-col md:flex-row md:items-start gap-6">
             <div className={`w-20 h-20 rounded-2xl ${roadmap.color} flex items-center justify-center text-white shrink-0`}>
               <IconComponent className="w-10 h-10" />
             </div>
             <div className="flex-1">
               <h1 className="text-3xl font-bold text-foreground mb-2">{roadmap.title}</h1>
               <p className="text-muted-foreground text-lg mb-4">{roadmap.description}</p>
               
               {/* Stats */}
               <div className="flex flex-wrap gap-4 mb-4">
                 <div className="flex items-center gap-2">
                   <DollarSign className="w-5 h-5 text-success" />
                   <span className="text-foreground font-medium">{roadmap.salary}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <TrendingUp className="w-5 h-5 text-primary" />
                   <span className="text-foreground font-medium">{roadmap.growth} Growth</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Briefcase className="w-5 h-5 text-accent" />
                   <span className="text-foreground font-medium">{roadmap.demand} Demand</span>
                 </div>
               </div>
 
               {/* Skills */}
               <div className="flex flex-wrap gap-2 mb-4">
                 {roadmap.skills.map((skill) => (
                   <Badge key={skill} variant="secondary">
                     {skill}
                   </Badge>
                 ))}
               </div>

                <div className="flex items-center gap-4">
                  <Badge variant="outline">
                    {roadmap.steps.length} Steps
                  </Badge>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    {completedSteps.length}/{roadmap.steps.length} Completed
                  </Badge>
                  <Button
                    variant={isSaved ? "default" : "outline"}
                    size="sm"
                    onClick={handleToggleSave}
                    className="ml-auto gap-2"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'Saved' : 'Save Career'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/jobs?career=${encodeURIComponent(roadmap.title)}`)}
                    className="gap-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    View matching jobs
                  </Button>
                </div>
             </div>
           </div>
         </div>
 
         {/* Roadmap Steps */}
         <div className="relative">
           {/* Vertical line */}
           <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
 
           <div className="space-y-6">
             {roadmap.steps.map((step, index) => (
               <div
                 key={step.id}
                 className="relative flex gap-4 md:gap-8 animate-fade-in-up"
                 style={{ animationDelay: `${index * 100}ms` }}
               >
                 {/* Step indicator */}
                   <div className="hidden md:flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all ${
                        completedSteps.includes(step.id)
                          ? 'bg-success text-success-foreground'
                          : 'bg-card border-2 border-border text-muted-foreground'
                      }`}
                    >
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-bold">{step.id}</span>
                      )}
                    </div>
                  </div>
 
                 {/* Step content */}
                 <div className="flex-1 bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors">
                   <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center gap-3">
                       <div
                          className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            completedSteps.includes(step.id)
                              ? 'bg-success text-success-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {completedSteps.includes(step.id) ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <span className="font-bold text-sm">{step.id}</span>
                          )}
                        </div>
                       <div>
                         <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                         <p className="text-sm text-muted-foreground">{step.duration}</p>
                       </div>
                     </div>
                   </div>
 
                   <p className="text-muted-foreground mb-4">{step.description}</p>
 
                   {/* Skills */}
                   <div className="flex flex-wrap gap-2 mb-4">
                     {step.skills.map((skill) => (
                       <Badge key={skill} variant="secondary" className="text-xs">
                         {skill}
                       </Badge>
                     ))}
                   </div>
 
                    {/* Resources */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Resources:</p>
                      <div className="flex flex-wrap gap-2">
                        {step.resources.map((resource) => (
                          <a
                            key={resource.name}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm transition-all hover:border-primary/50 hover:bg-muted"
                          >
                            <span className="font-medium text-foreground">{resource.name}</span>
                            <span className="flex items-center gap-0.5 text-amber-500">
                              <Star className="w-3 h-3 fill-amber-500" />
                              <span className="text-xs">{resource.rating}</span>
                            </span>
                            <Badge
                              variant={resource.type === 'Free' ? 'default' : resource.type === 'Paid' ? 'destructive' : 'secondary'}
                              className="text-[10px] px-1.5 py-0"
                            >
                              {resource.type}
                            </Badge>
                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                          </a>
                        ))}
                      </div>
                     </div>

                     {/* Practice Questions - passing quiz marks step complete */}
                     <StepQuiz skills={step.skills} stepId={step.id} careerId={careerId || ''} onPass={() => handleQuizPass(step.id)} />

                     {/* Completion status */}
                     <div className="mt-4 pt-4 border-t border-border">
                       {completedSteps.includes(step.id) ? (
                         <div className="flex items-center gap-2 text-success text-sm font-medium">
                           <CheckCircle className="w-4 h-4" />
                           Step Completed
                         </div>
                       ) : (
                         <p className="text-xs text-muted-foreground">Pass the practice quiz (60%+) to complete this step.</p>
                       )}
                     </div>
                  </div>
                </div>
              ))}
            </div>
         </div>
 
          {/* Final Project Section */}
          {allStepsCompleted ? (
            <div className="mt-12 bg-card rounded-2xl border-2 border-primary/30 p-6 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">🎉 Final Project Unlocked!</h2>
                  <p className="text-sm text-muted-foreground">You've completed all steps. Now apply everything you've learned.</p>
                </div>
              </div>

              <div className="space-y-4">
                {getFinalProjects(careerId || '').map((project, idx) => (
                  <div key={idx} className="rounded-xl border border-border bg-muted/30 p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                      <Badge variant={project.difficulty === 'Beginner' ? 'secondary' : project.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                        {project.difficulty}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                        <ClipboardList className="w-4 h-4" />
                        Requirements:
                      </p>
                      <ul className="space-y-1.5">
                        {project.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-12 bg-card rounded-2xl border-2 border-border p-6 opacity-60">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-muted-foreground" />
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-foreground">🔒 Final Project</h2>
                  <p className="text-sm text-muted-foreground">Complete all {roadmap.steps.length} steps by passing their quizzes to unlock the final project. ({completedSteps.length}/{roadmap.steps.length} completed)</p>
                </div>
              </div>
            </div>
          )}
          {allStepsCompleted && (
  <div className="mt-12 bg-card rounded-2xl border border-border p-6">
    <h2 className="text-xl font-bold text-foreground mb-4">
      🌐 Final Project Evaluation (AI)
    </h2>

    <p className="text-sm text-muted-foreground mb-4">
      Submit your project website. AI will evaluate it based on final project requirements.
    </p>

    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="Enter your project URL (https://...)"
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
      />

      <Button onClick={handleAnalyzeWebsite} disabled={loadingAnalysis}>
        {loadingAnalysis ? "Evaluating..." : "Evaluate Project"}
      </Button>
    </div>

    {analysisResult && (
      <div className="space-y-4">
        {analysisResult?.explanation && (
  <p className="text-sm text-muted-foreground mb-4">
    {analysisResult.explanation}
  </p>
)}
{analysisResult?.advantages && (
  <div className="mb-4">
    <h3 className="font-semibold text-green-600">Advantages</h3>
    <ul className="list-disc pl-5 text-sm">
      {analysisResult.advantages.map((item: string, i: number) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
)}
{analysisResult?.disadvantages && (
  <div className="mb-4">
    <h3 className="font-semibold text-red-500">Disadvantages</h3>
    <ul className="list-disc pl-5 text-sm">
      {analysisResult.disadvantages.map((item: string, i: number) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
)}
        <div className="text-xl font-bold text-primary">
          Score: {analysisResult.score}/100
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>🎨 Design: {analysisResult.design}</div>
          <div>🧠 Usability: {analysisResult.usability}</div>
          <div>📄 Requirements: {analysisResult.requirements}</div>
          <div>⚙️ Functionality: {analysisResult.functionality}</div>
          <div>🔍 Code Quality: {analysisResult.code_quality}</div>
        </div>

        <div>
          <h3 className="font-semibold">Improvements:</h3>
          <ul className="list-disc pl-5 text-sm">
            {analysisResult.improvements?.map((imp: string, i: number) => (
              <li key={i}>{imp}</li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </div>
)}

          {/* Entry Level Roles */}
          <div className="mt-8 bg-card rounded-2xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Entry-Level Job Roles</h2>
            <p className="text-sm text-muted-foreground mb-4">These roles match the {roadmap.title} career path.</p>
            <div className="flex flex-wrap gap-3">
              {roadmap.entryLevelRoles.map((role) => (
                <Badge key={role} className="bg-primary/10 text-primary border-primary/20">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
       </div>
     </Layout>
   );
 };
 
 export default CareerRoadmapDetail;