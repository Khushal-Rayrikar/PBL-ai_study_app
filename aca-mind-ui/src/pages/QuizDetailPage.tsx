import { useState } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { AdaptiveQuiz } from "../components/AdaptiveQuiz";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "Easy" | "Medium" | "Hard";
  explanation: string;
}

// Sample quiz questions
const quizzes: Record<string, { title: string; questions: Question[] }> = {
  "quiz-1": {
    title: "Photosynthesis Basics",
    questions: [
      {
        id: "q1",
        question: "What is the primary purpose of photosynthesis?",
        options: [
          "To break down glucose for energy",
          "To convert light energy into chemical energy (glucose)",
          "To release oxygen as waste",
          "To absorb nutrients from soil",
        ],
        correctAnswer: 1,
        difficulty: "Easy",
        explanation:
          "Photosynthesis converts light energy into chemical energy stored in glucose molecules. This is the fundamental purpose of the process.",
      },
      {
        id: "q2",
        question: "Which organelle is responsible for photosynthesis?",
        options: ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"],
        correctAnswer: 2,
        difficulty: "Easy",
        explanation:
          "Chloroplasts contain chlorophyll and are the site of photosynthesis in plant cells. They transform light energy into chemical energy.",
      },
      {
        id: "q3",
        question: "What are the two main stages of photosynthesis?",
        options: [
          "Glycolysis and Krebs cycle",
          "Light-dependent and light-independent reactions",
          "Anabolism and catabolism",
          "Fermentation and respiration",
        ],
        correctAnswer: 1,
        difficulty: "Medium",
        explanation:
          "Photosynthesis consists of light-dependent reactions (in thylakoids) and light-independent reactions/Calvin cycle (in stroma).",
      },
      {
        id: "q4",
        question: "During the light-dependent reactions, which molecule is produced?",
        options: ["Glucose", "ATP and NADPH", "Oxygen", "Water"],
        correctAnswer: 1,
        difficulty: "Medium",
        explanation:
          "Light-dependent reactions produce ATP (energy) and NADPH (reducing power), which are used in the Calvin cycle.",
      },
      {
        id: "q5",
        question: "What is the primary function of the Calvin cycle?",
        options: [
          "To absorb light energy",
          "To produce oxygen",
          "To synthesize glucose from CO2",
          "To break down water molecules",
        ],
        correctAnswer: 2,
        difficulty: "Medium",
        explanation:
          "The Calvin cycle or light-independent reactions use ATP and NADPH from light reactions to fix CO2 and produce glucose.",
      },
      {
        id: "q6",
        question: "Which wavelengths of light are most effectively used in photosynthesis?",
        options: [
          "Red and blue light",
          "Green and yellow light",
          "Ultraviolet light",
          "Infrared light",
        ],
        correctAnswer: 0,
        difficulty: "Hard",
        explanation:
          "Chlorophyll absorbs red and blue light most effectively, while reflecting green light (which is why plants appear green).",
      },
    ],
  },
  "quiz-2": {
    title: "Mitochondrial Functions",
    questions: [
      {
        id: "q1",
        question: "What is the primary function of mitochondria?",
        options: [
          "Protein synthesis",
          "Cellular respiration and ATP production",
          "Photosynthesis",
          "DNA replication",
        ],
        correctAnswer: 1,
        difficulty: "Easy",
        explanation:
          "Mitochondria are the powerhouses of the cell, producing ATP through cellular respiration to provide energy for cell functions.",
      },
      {
        id: "q2",
        question: "How many membranes does a mitochondrion have?",
        options: ["One", "Two", "Three", "Four"],
        correctAnswer: 1,
        difficulty: "Easy",
        explanation:
          "Mitochondria have a double membrane structure - an outer membrane and an inner membrane with cristae.",
      },
      {
        id: "q3",
        question:
          "What is produced when glucose is completely oxidized in mitochondria?",
        options: ["2 ATP", "30-32 ATP", "100 ATP", "5 ATP"],
        correctAnswer: 1,
        difficulty: "Hard",
        explanation:
          "Complete oxidation of one glucose molecule produces approximately 30-32 ATP molecules through aerobic respiration.",
      },
    ],
  },
  "quiz-3": {
    title: "Ecosystems & Food Chains",
    questions: [
      {
        id: "q1",
        question: "What is a food chain?",
        options: [
          "A sequence of organisms where each eats the next",
          "A type of restaurant chain",
          "A chain made of food particles",
          "The path food takes through a store",
        ],
        correctAnswer: 0,
        difficulty: "Easy",
        explanation:
          "A food chain shows the linear transfer of energy and nutrients from organisms at different trophic levels.",
      },
    ],
  },
};

export default function QuizDetailPage() {
  const [match, params] = useRoute("/quiz/:quizId");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizResult, setQuizResult] = useState<null | { score: number; difficulty: string }>(null);

  if (!match) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-destructive">Quiz not found</h2>
      </div>
    );
  }

  const quizData = quizzes[params!.quizId];

  if (!quizData) {
    return (
      <div className="text-center py-20">
        <Link href="/quizzes" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Quizzes
        </Link>
        <h2 className="text-2xl font-bold text-destructive mt-4">Quiz not found</h2>
        <p className="text-muted-foreground">This quiz doesn't exist yet.</p>
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
              <h1 className="text-3xl font-bold text-foreground">{quizData.title}</h1>
              <p className="text-muted-foreground text-lg">
                Test your knowledge with {quizData.questions.length} questions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="text-2xl font-bold text-foreground">{quizData.questions.length}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-sm text-muted-foreground">Est. Duration</p>
                <p className="text-2xl font-bold text-foreground">{quizData.questions.length * 2} min</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="text-2xl font-bold text-foreground">Mixed</p>
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

          <AdaptiveQuiz questions={quizData.questions} onComplete={(score, difficulty) => setQuizResult({ score, difficulty })} />
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
              <p className="text-muted-foreground">Great effort on {quizData.title}</p>
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
