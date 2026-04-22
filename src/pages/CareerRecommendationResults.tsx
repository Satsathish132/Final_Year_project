import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, DollarSign, Briefcase, Sparkles, CheckCircle, Brain, Heart, User } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getCareerRecommendations,
  type UserPreferences,
  type RecommendationResult,
} from '@/data/careerRecommendations';
import { trackActivity } from '@/lib/activityTracker';

const CareerRecommendationResults = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    const storedPreferences = sessionStorage.getItem('careerPreferences');
    if (!storedPreferences) {
      navigate('/career-recommendation');
      return;
    }

    const prefs: UserPreferences = JSON.parse(storedPreferences);
    setPreferences(prefs);
    const results = getCareerRecommendations(prefs);
    setRecommendations(results);
    trackActivity('Completed', 'Career Assessment');
  }, [navigate]);

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High':
        return 'bg-success/10 text-success border-success/20';
      case 'High':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-accent/10 text-accent border-accent/20';
    }
  };

  const getMatchStrength = (score: number) => {
    if (score >= 10) return { label: 'Excellent Match', color: 'bg-success text-success-foreground' };
    if (score >= 6) return { label: 'Strong Match', color: 'bg-primary text-primary-foreground' };
    if (score >= 3) return { label: 'Good Match', color: 'bg-accent text-accent-foreground' };
    return { label: 'Potential Match', color: 'bg-muted text-muted-foreground' };
  };

  if (!preferences) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/career-recommendation')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recommendation Form
          </Button>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Career Recommendations</h1>
              <p className="text-muted-foreground">
                Based on your skills, interests, personality, and work style
              </p>
            </div>
          </div>
        </div>

        {/* Input Summary */}
        <Card className="mb-8 bg-muted/30 border-border">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Your Profile Summary
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {preferences.skills.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <p className="text-xs font-medium text-muted-foreground">Skills</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {preferences.skills.map((skill) => (
                      <Badge key={skill} variant="default" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {preferences.interests.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-success" />
                    <p className="text-xs font-medium text-muted-foreground">Interests</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {preferences.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs bg-success/10 text-success">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {preferences.personality.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-accent" />
                    <p className="text-xs font-medium text-muted-foreground">Personality</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {preferences.personality.map((p) => (
                      <Badge key={p} variant="secondary" className="text-xs bg-accent/10 text-accent">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {preferences.workStyle.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-foreground" />
                    <p className="text-xs font-medium text-muted-foreground">Work Style</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {preferences.workStyle.map((style) => (
                      <Badge key={style} variant="outline" className="text-xs">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Found {recommendations.length} career{recommendations.length !== 1 ? 's' : ''} matching your profile
        </p>

        {/* Career Cards */}
        {recommendations.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((career, index) => {
              const matchStrength = getMatchStrength(career.matchScore);
              return (
                <Card
                  key={career.id}
                  className="border-border overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className={matchStrength.color}>
                        {matchStrength.label}
                      </Badge>
                      <Badge variant="outline" className={getDemandColor(career.demand)}>
                        {career.demand} Demand
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{career.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{career.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Matched Factors */}
                    <div className="space-y-2">
                      {career.matchedSkills.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Brain className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <div className="flex flex-wrap gap-1">
                            {career.matchedSkills.map((skill) => (
                              <Badge key={skill} variant="default" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {career.matchedInterests.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Heart className="w-4 h-4 text-success mt-0.5 shrink-0" />
                          <div className="flex flex-wrap gap-1">
                            {career.matchedInterests.map((interest) => (
                              <Badge key={interest} variant="secondary" className="text-xs bg-success/10 text-success">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {career.matchedPersonality.length > 0 && (
                        <div className="flex items-start gap-2">
                          <User className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <div className="flex flex-wrap gap-1">
                            {career.matchedPersonality.map((p) => (
                              <Badge key={p} variant="secondary" className="text-xs bg-accent/10 text-accent">
                                {p}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {career.matchedWorkStyle.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Briefcase className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div className="flex flex-wrap gap-1">
                            {career.matchedWorkStyle.map((style) => (
                              <Badge key={style} variant="outline" className="text-xs">
                                {style}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Why Recommended Section */}
                    <div className="bg-muted/50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Why This Career?
                      </h4>
                      <ul className="space-y-1">
                        {career.explanation.map((exp, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-success mt-1 shrink-0" />
                            {exp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                      <div className="text-center">
                        <DollarSign className="w-4 h-4 mx-auto text-success mb-1" />
                        <p className="text-xs text-muted-foreground">Salary</p>
                        <p className="text-xs font-medium text-foreground">{career.salary}</p>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-4 h-4 mx-auto text-primary mb-1" />
                        <p className="text-xs text-muted-foreground">Growth</p>
                        <p className="text-xs font-medium text-foreground">{career.growth}</p>
                      </div>
                      <div className="text-center">
                        <Briefcase className="w-4 h-4 mx-auto text-accent mb-1" />
                        <p className="text-xs text-muted-foreground">Demand</p>
                        <p className="text-xs font-medium text-foreground">{career.demand}</p>
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link to={`/roadmaps/${career.id}`}>
                        View Career Roadmap →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Matches Found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find careers matching your current selections. Try adjusting your preferences.
              </p>
              <Button onClick={() => navigate('/career-recommendation')} variant="outline">
                Update Your Preferences
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CareerRecommendationResults;
