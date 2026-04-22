import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Heart, Briefcase, User, ChevronRight, X } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  skills,
  interests,
  personalities,
  workStyles,
  type UserPreferences,
} from '@/data/careerRecommendations';

const CareerRecommendationInput = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedPersonality, setSelectedPersonality] = useState<string[]>([]);
  const [selectedWorkStyle, setSelectedWorkStyle] = useState<string[]>([]);

  const toggleSelection = (
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((s) => s !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const hasAnySelection =
    selectedSkills.length > 0 ||
    selectedInterests.length > 0 ||
    selectedPersonality.length > 0 ||
    selectedWorkStyle.length > 0;

  const clearAll = () => {
    setSelectedSkills([]);
    setSelectedInterests([]);
    setSelectedPersonality([]);
    setSelectedWorkStyle([]);
  };

  const handleGetRecommendations = () => {
    const preferences: UserPreferences = {
      skills: selectedSkills,
      interests: selectedInterests,
      personality: selectedPersonality,
      workStyle: selectedWorkStyle,
    };
    
    // Store preferences in sessionStorage and navigate to results
    sessionStorage.setItem('careerPreferences', JSON.stringify(preferences));
    navigate('/career-recommendation/results');
  };

  const SelectableTag = ({
    label,
    selected,
    onClick,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        selected
          ? 'bg-primary text-primary-foreground shadow-md scale-105'
          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-102'
      }`}
    >
      {label}
    </button>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Recommendations</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Find Your Perfect Career</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your skills, interests, personality, and work preferences. 
            We'll recommend careers that match your unique profile.
          </p>
        </div>

        {/* Clear All Button */}
        {hasAnySelection && (
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground">
              <X className="w-4 h-4 mr-1" />
              Clear All Selections
            </Button>
          </div>
        )}

        {/* Input Sections */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Skills Section */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Skills</CardTitle>
                  <CardDescription>Select your technical skills</CardDescription>
                </div>
              </div>
              {selectedSkills.length > 0 && (
                <Badge variant="secondary" className="w-fit mt-2">
                  {selectedSkills.length} selected
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <SelectableTag
                    key={skill}
                    label={skill}
                    selected={selectedSkills.includes(skill)}
                    onClick={() => toggleSelection(skill, selectedSkills, setSelectedSkills)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interests Section */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-success" />
                </div>
                <div>
                  <CardTitle className="text-lg">Interests</CardTitle>
                  <CardDescription>What excites you the most?</CardDescription>
                </div>
              </div>
              {selectedInterests.length > 0 && (
                <Badge variant="secondary" className="w-fit mt-2">
                  {selectedInterests.length} selected
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <SelectableTag
                    key={interest}
                    label={interest}
                    selected={selectedInterests.includes(interest)}
                    onClick={() => toggleSelection(interest, selectedInterests, setSelectedInterests)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personality Section */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">Personality</CardTitle>
                  <CardDescription>How would you describe yourself?</CardDescription>
                </div>
              </div>
              {selectedPersonality.length > 0 && (
                <Badge variant="secondary" className="w-fit mt-2">
                  {selectedPersonality.length} selected
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {personalities.map((personality) => (
                  <SelectableTag
                    key={personality}
                    label={personality}
                    selected={selectedPersonality.includes(personality)}
                    onClick={() => toggleSelection(personality, selectedPersonality, setSelectedPersonality)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Work Style Section */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Work Style</CardTitle>
                  <CardDescription>Your preferred work environment</CardDescription>
                </div>
              </div>
              {selectedWorkStyle.length > 0 && (
                <Badge variant="secondary" className="w-fit mt-2">
                  {selectedWorkStyle.length} selected
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {workStyles.map((style) => (
                  <SelectableTag
                    key={style}
                    label={style}
                    selected={selectedWorkStyle.includes(style)}
                    onClick={() => toggleSelection(style, selectedWorkStyle, setSelectedWorkStyle)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selection Summary */}
        {hasAnySelection && (
          <Card className="mb-8 bg-muted/30 border-border">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground mb-4">Your Selection Summary</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedSkills.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedSkills.map((skill) => (
                        <Badge key={skill} variant="default" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedInterests.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Interests</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedInterests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs bg-success/10 text-success">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedPersonality.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Personality</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedPersonality.map((p) => (
                        <Badge key={p} variant="secondary" className="text-xs bg-accent/10 text-accent">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedWorkStyle.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Work Style</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedWorkStyle.map((style) => (
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
        )}

        {/* Submit Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleGetRecommendations}
            disabled={!hasAnySelection}
            className="px-8 py-6 text-lg font-semibold"
          >
            Get Career Recommendations
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          {!hasAnySelection && (
            <p className="text-sm text-muted-foreground mt-3">
              Select at least one option from any category to get recommendations
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CareerRecommendationInput;
