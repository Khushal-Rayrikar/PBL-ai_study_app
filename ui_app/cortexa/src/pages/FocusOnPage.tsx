import { useGetDashboard } from "../lib/api";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { AlertCircle, Lightbulb, BookOpen, TrendingDown, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface ChapterAnalysis {
  id: string;
  name: string;
  weaknessLevel: "Critical" | "High" | "Medium";
  currentScore: number;
  targetScore: number;
  timeSpent: number;
  conceptsMissed: string[];
  suggestedTechniques: string[];
}

interface StudyTechniqueAdvice {
  technique: string;
  description: string;
  benefit: string;
  example: string;
}

export default function FocusOnPage() {
  const { isLoading, isError } = useGetDashboard();

  // Sample AI analysis - would be fetched from backend
  const chaptersNeedingFocus: ChapterAnalysis[] = [
    {
      id: "ch1",
      name: "Chapter 1: Quantum Computing Basics",
      weaknessLevel: "Critical",
      currentScore: 42,
      targetScore: 80,
      timeSpent: 45,
      conceptsMissed: [
        "Quantum superposition principles",
        "Entanglement mechanics",
        "Qubit operations"
      ],
      suggestedTechniques: [
        "Spaced repetition for quantum concepts",
        "Visual diagramming of superposition",
        "Problem-solving practice with varying difficulty"
      ]
    },
    {
      id: "ch2",
      name: "Chapter 2: Advanced Algorithms",
      weaknessLevel: "High",
      currentScore: 58,
      targetScore: 85,
      timeSpent: 120,
      conceptsMissed: [
        "Time complexity analysis",
        "Dynamic programming patterns"
      ],
      suggestedTechniques: [
        "Interleaved practice mixing different algorithm types",
        "Elaborative interrogation - explain the 'why'",
        "Teach-back method to others"
      ]
    },
    {
      id: "ch3",
      name: "Chapter 3: Data Structures",
      weaknessLevel: "Medium",
      currentScore: 72,
      targetScore: 90,
      timeSpent: 180,
      conceptsMissed: [
        "Graph traversal optimization"
      ],
      suggestedTechniques: [
        "Concrete example mapping",
        "Hands-on implementation exercises"
      ]
    }
  ];

  const studyTechniques: StudyTechniqueAdvice[] = [
    {
      technique: "Spaced Repetition",
      description: "Reviewing material at increasing intervals to combat forgetting curve",
      benefit: "Improves long-term retention by 40-50%",
      example: "Review Chapter 1 today, then in 2 days, then 5 days"
    },
    {
      technique: "Interleaving",
      description: "Mix different types of problems rather than grouping same types",
      benefit: "Enhances ability to compare concepts and transfer learning",
      example: "Alternate between algorithm problems instead of doing all sorting together"
    },
    {
      technique: "Elaborative Interrogation",
      description: "Ask yourself 'Why?' and 'How?' questions while learning",
      benefit: "Deeper understanding and better transfer to new problems",
      example: "Why does this algorithm work? How would it change with this constraint?"
    },
    {
      technique: "Concrete Examples",
      description: "Always pair abstract concepts with concrete, relatable examples",
      benefit: "Makes abstract ideas tangible and memorable",
      example: "Use real-world quantum computing applications like cryptography"
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
        <h2 className="text-2xl font-bold text-destructive">Failed to load analysis</h2>
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
        className="rounded-3xl overflow-hidden glass-card p-8 bg-gradient-to-r from-red-500/5 via-background to-background shadow-lg"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-extrabold text-foreground">
              Focus On
            </h1>
            <p className="text-muted-foreground mt-1">
              AI-powered analysis of your weak areas and personalized study recommendations
            </p>
          </div>
        </div>
      </motion.div>

      {/* Critical Chapters Section */}
      <div>
        <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5 text-red-500" />
          Chapters Needing Attention
        </h2>

        <div className="space-y-4">
          {chaptersNeedingFocus.map((chapter, idx) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className={`p-6 rounded-2xl glass-card hover:shadow-lg transition-all border-l-4 ${
                chapter.weaknessLevel === "Critical"
                  ? "border-l-red-500"
                  : chapter.weaknessLevel === "High"
                  ? "border-l-orange-500"
                  : "border-l-yellow-500"
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <h3 className="text-lg font-bold text-foreground">{chapter.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Study time: {chapter.timeSpent} minutes
                    </p>
                  </div>
                  <div className={`flex items-center justify-center w-16 h-16 rounded-xl font-display font-bold text-lg ${
                    chapter.weaknessLevel === "Critical"
                      ? "bg-red-500/10 text-red-600"
                      : chapter.weaknessLevel === "High"
                      ? "bg-orange-500/10 text-orange-600"
                      : "bg-yellow-500/10 text-yellow-600"
                  }`}>
                    {chapter.currentScore}%
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Current vs Target</span>
                    <span>Target: {chapter.targetScore}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(chapter.currentScore / chapter.targetScore) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                    />
                  </div>
                </div>

                {/* Concepts Missed */}
                <div className="mb-4 p-4 rounded-lg bg-secondary/50">
                  <p className="text-xs font-semibold text-foreground mb-2">Concepts Needing Improvement:</p>
                  <ul className="space-y-1">
                    {chapter.conceptsMissed.map((concept, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        {concept}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggested Techniques */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
                  <p className="text-xs font-semibold text-foreground mb-2">📚 Suggested Study Techniques:</p>
                  <ul className="space-y-1">
                    {chapter.suggestedTechniques.map((tech, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">✓</span>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button className="mt-4 w-full py-2 px-4 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 font-semibold text-sm transition-colors">
                  Start Focused Practice
                </button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Study Techniques Guide */}
      <div>
        <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Recommended Study Techniques
        </h2>

        <div className="grid gap-4">
          {studyTechniques.map((technique, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <Card className="p-5 rounded-2xl glass-card hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{technique.technique}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{technique.description}</p>
                    <div className="flex items-start gap-3 text-xs">
                      <div className="flex-1 p-2 rounded bg-green-500/10">
                        <p className="font-semibold text-green-700 mb-1">Benefit:</p>
                        <p className="text-muted-foreground">{technique.benefit}</p>
                      </div>
                      <div className="flex-1 p-2 rounded bg-blue-500/10">
                        <p className="font-semibold text-blue-700 mb-1">Example:</p>
                        <p className="text-muted-foreground">{technique.example}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Improvement Plan */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 rounded-2xl glass-card border-2 border-green-500/30 bg-gradient-to-r from-green-500/5 to-emerald-500/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🎯</span>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Your Personalized Improvement Plan</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Focus on Chapter 1 for the next 3 days with spaced repetition
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Use interleaved practice for algorithm problems
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Optimal session length: 45 minutes with 10-minute breaks
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Revisit concepts through teach-back sessions
                </li>
              </ul>
              <button className="mt-4 px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors">
                Start Improvement Plan
              </button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
