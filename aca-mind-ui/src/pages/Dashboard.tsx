import { Link } from "wouter";
import { useGetDashboard, useAuth } from "../lib/api";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import {
  FileText, Trophy, Target, Sparkles, Plus, ArrowRight,
  PlayCircle, UploadCloud, Flame, Zap, Star, TrendingUp, Award
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

function ProgressRing({ percentage, size = 96, stroke = 8 }: { percentage: number; size?: number; stroke?: number }) {
  const r = (size / 2) - stroke;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeWidth={stroke} fill="transparent" className="text-secondary" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke="currentColor" strokeWidth={stroke} fill="transparent"
          strokeDasharray={circ} strokeDashoffset={offset}
          className="text-primary transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-display font-bold text-2xl text-foreground leading-none">{percentage}%</span>
        <span className="text-[10px] text-muted-foreground font-medium mt-0.5">Mastery</span>
      </div>
    </div>
  );
}

function XpBar({ current, max }: { current: number; max: number }) {
  const pct = max > 0 ? Math.min(100, Math.round((current / max) * 100)) : 0;
  return (
    <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
      />
    </div>
  );
}

function StreakFlame({ count }: { count: number }) {
  const active = count > 0;
  return (
    <div className={`flex flex-col items-center gap-1 ${active ? "text-orange-500" : "text-muted-foreground"}`}>
      <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center ${active ? "bg-orange-500/10" : "bg-secondary"}`}>
        <Flame className={`w-8 h-8 ${active ? "drop-shadow-[0_0_8px_rgba(249,115,22,0.7)]" : ""}`} />
        {active && count >= 7 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">🔥</span>
        )}
      </div>
      <span className="text-2xl font-display font-bold text-foreground leading-none">{count}</span>
      <span className="text-xs text-muted-foreground font-medium">day streak</span>
    </div>
  );
}

export default function Dashboard() {
  const { data: stats, isLoading, isError } = useGetDashboard();
  const { user } = useAuth();

  const firstName = user?.firstName || "Scholar";

  // XP level thresholds (every 500 XP = 1 level)
  const xpPerLevel = 500;
  const level = stats ? Math.floor(stats.totalXp / xpPerLevel) + 1 : 1;
  const xpIntoLevel = stats ? stats.totalXp % xpPerLevel : 0;
  const xpToNextLevel = xpPerLevel;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-48 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-36 rounded-2xl" />
          <Skeleton className="h-36 rounded-2xl" />
          <Skeleton className="h-36 rounded-2xl" />
        </div>
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-destructive">Failed to load dashboard</h2>
        <p className="text-muted-foreground mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">

      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden glass-card p-8 md:p-10 shadow-lg"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Welcome back, {firstName}!
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-foreground mb-3">
              Ready to crush your next study session?
            </h1>
            <p className="text-muted-foreground">
              Upload lecture notes, and AI will instantly generate gamified quizzes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/upload" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                <UploadCloud className="w-4 h-4" />
                Upload Material
              </Link>
              <Link href="/quizzes" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all">
                <PlayCircle className="w-4 h-4" />
                Start a Quiz
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <ProgressRing percentage={stats.overallPercentage || 0} size={120} stroke={10} />
          </div>
        </div>
      </motion.div>

      {/* ── Gamification section ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-display font-bold text-foreground">Your Progress</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Streak card */}
          <Card className="p-6 rounded-2xl glass-card flex flex-col items-center gap-4 hover:shadow-lg transition-shadow">
            <StreakFlame count={stats.currentStreak} />
            <div className="w-full text-center">
              <p className="text-xs text-muted-foreground">
                Longest: <span className="font-bold text-foreground">{stats.longestStreak} days</span>
              </p>
              {stats.currentStreak === 0 && (
                <p className="text-xs text-muted-foreground mt-1">Complete a quiz today to start your streak!</p>
              )}
            </div>
          </Card>

          {/* XP + Level card */}
          <Card className="p-6 rounded-2xl glass-card flex flex-col justify-between gap-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total XP</p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-3xl font-display font-bold text-foreground">{stats.totalXp.toLocaleString()}</span>
                  <Zap className="w-5 h-5 text-yellow-500 mb-1" />
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-display font-extrabold text-yellow-600">L{level}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Level {level}</span>
                <span>{xpIntoLevel} / {xpToNextLevel} XP</span>
              </div>
              <XpBar current={xpIntoLevel} max={xpToNextLevel} />
              <p className="text-xs text-muted-foreground">{xpToNextLevel - xpIntoLevel} XP to Level {level + 1}</p>
            </div>
          </Card>

          {/* Overall progress card */}
          <Card className="p-6 rounded-2xl glass-card flex flex-col justify-between gap-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Mastery</p>
                <p className="text-3xl font-display font-bold text-foreground mt-1">{stats.overallPercentage}%</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Avg score</span>
                <span>{stats.averageScore} XP / quiz</span>
              </div>
              <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.overallPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${stats.overallPercentage >= 80 ? "bg-green-500" : stats.overallPercentage >= 60 ? "bg-primary" : "bg-amber-500"}`}
                />
              </div>
              <p className="text-xs text-muted-foreground">{stats.totalSessions} quiz sessions completed</p>
            </div>
          </Card>

        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="p-5 rounded-2xl glass-card flex items-center gap-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Documents</p>
            <h3 className="text-2xl font-display font-bold text-foreground">{stats.totalDocuments}</h3>
          </div>
        </Card>

        <Card className="p-5 rounded-2xl glass-card flex items-center gap-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Quizzes Generated</p>
            <h3 className="text-2xl font-display font-bold text-foreground">{stats.totalQuizzes}</h3>
          </div>
        </Card>

        <Card className="p-5 rounded-2xl glass-card flex items-center gap-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Avg Score</p>
            <h3 className="text-2xl font-display font-bold text-foreground">{stats.averageScore}%</h3>
          </div>
        </Card>
      </motion.div>

      {/* Recent quizzes */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-foreground">Recent Quizzes</h2>
          <Link href="/quizzes" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.recentQuizzes.map((quiz) => (
            <Card key={quiz.id} className="p-5 rounded-2xl glass-card hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-foreground line-clamp-1">{quiz.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{format(quiz.date, "MMM d, yyyy")}</p>
                </div>
                <div className={`px-2 py-1 rounded-md text-xs font-bold ${quiz.score >= 90 ? "bg-green-500/10 text-green-700" : quiz.score >= 70 ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-700"}`}>
                  {quiz.score}%
                </div>
              </div>
              <Link href={`/quiz/${quiz.id}`} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                <PlayCircle className="w-4 h-4" />
                Retake Quiz
              </Link>
            </Card>
          ))}
        </div>
      </motion.div>

    </div>
  );
}