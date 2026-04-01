import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import { PlayCircle, BookOpen, Zap, Brain, Clock, Target } from "lucide-react";
import { quizService } from "../lib/quizService";
import { Quiz } from "../types/quiz";

const difficultyColor = {
  Easy: "bg-green-500/10 text-green-700",
  Medium: "bg-yellow-500/10 text-yellow-700",
  Hard: "bg-red-500/10 text-red-700",
};

const difficultyBorder = {
  Easy: "border-green-200",
  Medium: "border-yellow-200",
  Hard: "border-red-200",
};

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load quizzes from localStorage
    const allQuizzes = quizService.getAllQuizzes();
    setQuizzes(allQuizzes);
    setLoading(false);
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesDifficulty = !selectedDifficulty || quiz.difficulty === selectedDifficulty;
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const completedCount = quizzes.filter((q) => q.completed).length;
  const totalXpEarned = quizzes.reduce((sum, q) => sum + (q.averageScore ? Math.floor(q.averageScore * 10) : 0), 0);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-12 h-12 border-4 border-secondary border-t-primary rounded-full animate-spin mx-auto"></div>
        <p className="text-muted-foreground mt-4">Loading quizzes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Quiz Master</h1>
          <p className="text-muted-foreground text-lg">
            {quizzes.length === 0
              ? "No quizzes yet. Upload study materials to generate custom quizzes!"
              : "Test your knowledge with quizzes generated from your study materials"}
          </p>
        </div>

        {quizzes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                  <p className="text-3xl font-bold text-foreground">{completedCount}/{quizzes.length}</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">XP Earned</p>
                  <p className="text-3xl font-bold text-foreground">{totalXpEarned}</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
                  <p className="text-3xl font-bold text-foreground">
                    {quizzes.length > 0
                      ? Math.round(quizzes.reduce((sum, q) => sum + (q.averageScore || 0), 0) / quizzes.filter((q) => q.completed).length || 0)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </motion.div>

      {quizzes.length > 0 && (
        <>
          {/* Filters */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-secondary/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-2 flex-wrap">
                {["Easy", "Medium", "Hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedDifficulty(selectedDifficulty === level ? null : level)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedDifficulty === level
                        ? difficultyColor[level as keyof typeof difficultyColor] + " ring-2 ring-offset-2 ring-offset-background"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quiz Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz, idx) => (
              <motion.div key={quiz.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Link href={`/quiz/${quiz.id}`}>
                  <Card
                    className={`glass-card p-6 h-full cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all border ${
                      difficultyBorder[quiz.difficulty as keyof typeof difficultyBorder]
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-foreground">{quiz.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{quiz.topicArea}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${difficultyColor[quiz.difficulty as keyof typeof difficultyColor]}`}>
                          {quiz.difficulty}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground">{quiz.description}</p>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {quiz.duration} min
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {quiz.questionCount} Q
                        </div>
                      </div>

                      {/* Score if completed */}
                      {quiz.completed && (
                        <div className="pt-2 space-y-2 border-t border-border">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-foreground">Your Score</span>
                            <span className="text-lg font-bold text-green-600">{quiz.averageScore}%</span>
                          </div>
                          <button className="w-full px-3 py-2 rounded-lg bg-secondary text-foreground text-sm font-semibold hover:bg-secondary/80 transition-all">
                            Retake Quiz
                          </button>
                        </div>
                      )}

                      {/* Start button if not completed */}
                      {!quiz.completed && (
                        <button className="w-full px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2">
                          <PlayCircle className="w-4 h-4" />
                          Start
                        </button>
                      )}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredQuizzes.length === 0 && (
            <div className="text-center py-20">
              <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-foreground mb-2">No quizzes found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          )}
        </>
      )}

      {quizzes.length === 0 && (
        <div className="text-center py-20">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-foreground mb-2">No quizzes available</h3>
          <p className="text-muted-foreground mb-6">Start by uploading your study materials to generate custom quizzes</p>
          <Link href="/upload" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">
            Upload Material
          </Link>
        </div>
      )}
    </div>
  );
}
