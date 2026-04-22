import { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  Code,
  BookOpen,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { getQuestionsForStep, type QuizQuestion } from '@/data/stepQuestions';

interface StepQuizProps {
  skills: string[];
  stepId: number;
  careerId: string;
  onPass?: () => void;
}

// ✅ Proper Fisher–Yates Shuffle
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]; // prevent mutation
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const StepQuiz = ({ skills, stepId, careerId, onPass }: StepQuizProps) => {

  // ✅ Always generate fresh random 5
  const generateQuestions = () => {
    const allQuestions = [...getQuestionsForStep(skills)]; // clone to avoid reference issues
    return shuffleArray(allQuestions).slice(0, 5);
  };

  const [questions, setQuestions] = useState<QuizQuestion[]>(generateQuestions);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  if (questions.length === 0) return null;

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
  };

  const calculateScore = () => {
    return questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.correctAnswer ? 1 : 0),
      0
    );
  };

  const handleSubmit = () => {
    const correct = calculateScore();
    const percentage = Math.round((correct / questions.length) * 100);

    setSubmitted(true);

    if (percentage >= 60 && onPass) {
      onPass();
    }
  };

  const handleRetry = () => {
    setQuestions(generateQuestions()); // 🔥 new random 5
    setAnswers({});
    setSubmitted(false);
    setResetKey((prev) => prev + 1);
  };

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);

    if (next) {
      // 🔥 generate fresh set every open
      setQuestions(generateQuestions());
      setAnswers({});
      setSubmitted(false);
      setResetKey((prev) => prev + 1);
    }
  };

  const score = submitted ? calculateScore() : 0;

  const allAnswered = questions.every(
    (_, index) => answers[index] !== undefined
  );

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <HelpCircle className="w-4 h-4" />
        Practice Questions ({questions.length})
      </Button>

      {isOpen && (
        <div key={resetKey} className="mt-3 space-y-4">
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className={`rounded-xl border p-4 transition-colors ${
                submitted
                  ? answers[qIndex] === q.correctAnswer
                    ? 'border-success/50 bg-success/5'
                    : 'border-destructive/50 bg-destructive/5'
                  : 'border-border bg-muted/30'
              }`}
            >
              {/* Question Type */}
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className={`text-[10px] gap-1 ${
                    q.type === 'code'
                      ? 'border-primary/50 text-primary'
                      : 'border-muted-foreground/50 text-muted-foreground'
                  }`}
                >
                  {q.type === 'code' ? (
                    <Code className="w-3 h-3" />
                  ) : (
                    <BookOpen className="w-3 h-3" />
                  )}
                  {q.type === 'code' ? 'Code Question' : 'MCQ'}
                </Badge>
              </div>

              {/* Question */}
              <p
                className={`text-sm font-medium text-foreground mb-3 ${
                  q.type === 'code'
                    ? 'font-mono whitespace-pre-wrap bg-muted/50 rounded-lg p-3 border border-border'
                    : ''
                }`}
              >
                {qIndex + 1}. {q.question}
              </p>

              {/* Options */}
              <RadioGroup
                value={
                  answers[qIndex] !== undefined
                    ? answers[qIndex].toString()
                    : ''
                }
                onValueChange={(val) =>
                  handleSelect(qIndex, parseInt(val))
                }
              >
                <div className="space-y-2">
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <RadioGroupItem
                        value={oIndex.toString()}
                        id={`q${stepId}-${qIndex}-${oIndex}`}
                        disabled={submitted}
                      />
                      <Label
                        htmlFor={`q${stepId}-${qIndex}-${oIndex}`}
                        className={`text-sm cursor-pointer ${
                          submitted && oIndex === q.correctAnswer
                            ? 'text-success font-medium'
                            : submitted &&
                              answers[qIndex] === oIndex &&
                              oIndex !== q.correctAnswer
                            ? 'text-destructive line-through'
                            : 'text-foreground'
                        }`}
                      >
                        {option}
                      </Label>

                      {submitted && oIndex === q.correctAnswer && (
                        <CheckCircle className="w-3.5 h-3.5 text-success" />
                      )}
                      {submitted &&
                        answers[qIndex] === oIndex &&
                        oIndex !== q.correctAnswer && (
                          <XCircle className="w-3.5 h-3.5 text-destructive" />
                        )}
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {/* Explanation */}
              {submitted && (
                <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">
                        Explanation:
                      </span>{' '}
                      {q.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Footer */}
          {submitted ? (
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Score: {score}/{questions.length} (
                {Math.round((score / questions.length) * 100)}%)
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retry
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="gap-2"
            >
              Submit Answers
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default StepQuiz;