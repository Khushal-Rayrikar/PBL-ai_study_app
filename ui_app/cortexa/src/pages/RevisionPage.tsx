import { useGetDashboard } from "../lib/api";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { RotateCw, Clock, BookOpen, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface RevisionTopic {
  id: string;
  title: string;
  lastReviewed: string;
  accuracy: number;
  quizzesTaken: number;
  nextReviewDate: string;
}

export default function RevisionPage() {
  const { isLoading, isError } = useGetDashboard();

  // Sample revision topics - would be fetched from API
  const revisionTopics: RevisionTopic[] = [
    {
      id: "1",
      title: "Unit 1: Fundamentals",
      lastReviewed: "2 days ago",
      accuracy: 85,
      quizzesTaken: 12,
      nextReviewDate: "Today"
    },
    {
      id: "2",
      title: "Unit 2: Advanced Concepts",
      lastReviewed: "5 days ago",
      accuracy: 72,
      quizzesTaken: 8,
      nextReviewDate: "Tomorrow"
    },
    {
      id: "3",
      title: "Unit 3: Applications",
      lastReviewed: "1 week ago",
      accuracy: 60,
      quizzesTaken: 5,
      nextReviewDate: "This week"
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-24 rounded-3xl" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-destructive">Failed to load revision topics</h2>
        <p className="text-muted-foreground mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl overflow-hidden glass-card p-8 shadow-lg"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <RotateCw className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-extrabold text-foreground">
              Revision Hub
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and revise topics based on AI-powered recommendations
            </p>
          </div>
        </div>
      </motion.div>

      {/* Revision Topics */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Your Topics
        </h2>

        <div className="grid gap-4">
          {revisionTopics.map((topic, idx) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-6 rounded-2xl glass-card hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {topic.quizzesTaken} quizzes completed
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                    <span className="text-2xl font-display font-bold text-primary">
                      {topic.accuracy}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.accuracy}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      topic.accuracy >= 80
                        ? "bg-green-500"
                        : topic.accuracy >= 60
                        ? "bg-primary"
                        : "bg-amber-500"
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Last reviewed {topic.lastReviewed}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    Review {topic.nextReviewDate}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Recommendation Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 rounded-2xl glass-card border-primary/30 border-2">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">AI Recommendation</h3>
              <p className="text-sm text-muted-foreground">
                Based on your performance, we recommend focusing on <strong>Unit 3: Applications</strong> this week.
                Your accuracy declined by 15% since last week. Take a few quizzes to refresh these concepts.
              </p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                Start Revision Quiz
              </button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
