import { useGetDashboard } from "../lib/api";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Lightbulb, ArrowRight, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

interface TheoryTopic {
  id: string;
  unit: string;
  title: string;
  description: string;
  keyPoints: string[];
  readTime: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  saved: boolean;
}

export default function TheoryPage() {
  const { isLoading, isError } = useGetDashboard();

  // Sample theory topics - would be fetched from API
  const theoryTopics: TheoryTopic[] = [
    {
      id: "1",
      unit: "Unit 1",
      title: "Fundamentals of Study Engineering",
      description: "Learn the core principles and concepts that form the foundation of effective learning strategies.",
      keyPoints: [
        "Active learning principles",
        "Spaced repetition techniques",
        "Memory consolidation",
        "Metacognitive awareness"
      ],
      readTime: 12,
      difficulty: "Beginner",
      saved: true
    },
    {
      id: "2",
      unit: "Unit 2",
      title: "Advanced Learning Methodologies",
      description: "Explore sophisticated learning techniques including interleaving, elaboration, and transfer learning.",
      keyPoints: [
        "Interleaving practice",
        "Elaborative interrogation",
        "Transfer of learning",
        "Dual coding theory"
      ],
      readTime: 18,
      difficulty: "Advanced",
      saved: false
    },
    {
      id: "3",
      unit: "Unit 3",
      title: "AI-Powered Personalized Learning",
      description: "Understand how artificial intelligence adapts learning paths based on individual performance and preferences.",
      keyPoints: [
        "Adaptive algorithms",
        "Performance analytics",
        "Personalization engines",
        "Content recommendation systems"
      ],
      readTime: 15,
      difficulty: "Intermediate",
      saved: false
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-24 rounded-3xl" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-destructive">Failed to load theory content</h2>
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
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-extrabold text-foreground">
              Theory & Concepts
            </h1>
            <p className="text-muted-foreground mt-1">
              Deep dive into key concepts with AI-curated explanations
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search topics..."
            className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder-muted-foreground border border-secondary hover:border-primary/50 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <select className="px-4 py-3 rounded-xl bg-secondary text-foreground border border-secondary hover:border-primary/50 focus:outline-none focus:border-primary transition-colors">
          <option>All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      {/* Theory Topics */}
      <div className="grid gap-6">
        {theoryTopics.map((topic, idx) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="p-6 rounded-2xl glass-card hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {topic.unit}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      topic.difficulty === "Beginner"
                        ? "bg-green-500/10 text-green-600"
                        : topic.difficulty === "Intermediate"
                        ? "bg-blue-500/10 text-blue-600"
                        : "bg-red-500/10 text-red-600"
                    }`}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {topic.description}
                  </p>
                </div>
                <button className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  topic.saved
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}>
                  <Bookmark className={`w-5 h-5 ${topic.saved ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Key Points */}
              <div className="mb-4 p-4 rounded-xl bg-secondary/50">
                <h4 className="text-sm font-semibold text-foreground mb-2">Key Points:</h4>
                <ul className="space-y-1">
                  {topic.keyPoints.map((point, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-secondary">
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{topic.readTime}</span> min read
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors group/btn">
                  Read Theory
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Learning Path */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 rounded-2xl glass-card border-accent/30 border-2">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🎯</span>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">AI Learning Path</h3>
              <p className="text-sm text-muted-foreground">
                We've created a personalized learning path based on your performance. Start with <strong>Fundamentals of Study Engineering</strong> before moving to advanced topics.
              </p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition-colors">
                View Learning Path
              </button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
