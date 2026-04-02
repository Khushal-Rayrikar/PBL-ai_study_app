import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { AdaptiveQuiz } from "../components/AdaptiveQuiz";
import { quizService } from "../lib/quizService";
import { Quiz } from "../types/quiz";

export default function QuizDetailPage() {
  const [match, params] = useRoute("/quiz/:quizId");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizResult, setQuizResult] = useState<null | { score: number; difficulty: string }>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (match && params?.quizId) {
      const quizData = quizService.getQuizById(params.quizId);
      setQuiz(quizData);
      setLoading(false);
    }
  }, [match, params]);

  if (!match) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-destructive">Quiz not found</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-12 h-12 border-4 border-secondary border-t-primary rounded-full animate-spin mx-auto"></div>
        <p className="text-muted-foreground mt-4">Loading quiz...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center py-20">
        <Link href="/quizzes" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Quizzes
        </Link>
        <h2 className="text-2xl font-bold text-destructive mt-4">Quiz not found</h2>
        <p className="text-muted-foreground">This quiz doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {!quizStarted && !quizResult && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Link href="/quizzes" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Quizzes
          </Link>

          <Card className="glass-card p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">{quiz.title}</h1>
              <p className="text-muted-foreground text-lg">{quiz.description}</p>
              {quiz.sourceFile && (
                <p className="text-xs text-muted-foreground">📄 Source: {quiz.sourceFile}</p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="text-2xl font-bold text-foreground">{quiz.questionCount}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-sm text-muted-foreground">Est. Duration</p>
                <p className="text-2xl font-bold text-foreground">{quiz.duration} min</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="text-2xl font-bold text-foreground">{quiz.difficulty}</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setQuizStarted(true)}
                className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Start Quiz
              </button>
            </div>
          </Card>
        </motion.div>
      )}

      {quizStarted && !quizResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Link
            href="/quizzes"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Quizzes
          </Link>

          <AdaptiveQuiz questions={quiz.questions} onComplete={(score, difficulty) => setQuizResult({ score, difficulty })} />
        </motion.div>
      )}

      {quizResult && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <Link href="/quizzes" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Quizzes
          </Link>

          <Card className="glass-card p-8 text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Quiz Complete!</h2>
              <p className="text-muted-foreground">Great effort on {quiz.title}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
              <div>
                <p className="text-muted-foreground text-sm">Your Score</p>
                <p className="text-4xl font-bold text-primary">{quizResult.score}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Difficulty Level</p>
                <p className="text-2xl font-bold text-foreground">{quizResult.difficulty}</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setQuizStarted(false);
                  setQuizResult(null);
                }}
                className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Retake Quiz
              </button>
              <Link href="/quizzes" className="block px-6 py-3 rounded-xl bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-all">
                Back to All Quizzes
              </Link>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
