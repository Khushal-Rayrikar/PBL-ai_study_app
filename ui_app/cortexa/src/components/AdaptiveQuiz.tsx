import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import { CheckCircle2, XCircle, Brain, Zap } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import { analyzeText } from "../lib/analyzeText";
import { ExamType, AdaptiveAnalysisResult } from "../types/quiz";

async function extractTextFromPDF(file: File): Promise<string> {
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result as ArrayBuffer);

      const pdf = await pdfjsLib.getDocument(typedarray).promise;
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ");
      }

      resolve(text);
    };

    reader.readAsArrayBuffer(file);
  });
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "Easy" | "Medium" | "Hard";
  explanation: string;
}

interface AdaptiveQuizProps {
  questions: Question[];
  onComplete: (score: number, difficulty: string) => void;
}

export function AdaptiveQuiz({ questions, onComplete }: AdaptiveQuizProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [answered, setAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [output, setOutput] = useState<AdaptiveAnalysisResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamType>("HSC");

  // Adaptive difficulty logic
  useEffect(() => {
    if (answered > 0 && answered % 5 === 0) {
      const accuracyPercent = (correctAnswers / answered) * 100;

      if (accuracyPercent >= 80) {
        // User is doing well, increase difficulty
        if (difficulty === "Easy") setDifficulty("Medium");
        else if (difficulty === "Medium") setDifficulty("Hard");
      } else if (accuracyPercent < 50) {
        // User is struggling, decrease difficulty
        if (difficulty === "Hard") setDifficulty("Medium");
        else if (difficulty === "Medium") setDifficulty("Easy");
      }
    }
  }, [answered, correctAnswers, difficulty]);

  const currentQuestion = questions[currentQuestionIdx];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const progress = ((currentQuestionIdx + 1) / questions.length) * 100;
  const accuracyPercent = answered > 0 ? Math.round((correctAnswers / answered) * 100) : 0;

  const handleAnswer = () => {
    setShowFeedback(true);
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      setScore(score + 10);
    }
    setAnswered(answered + 1);
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete(score, difficulty);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with progress */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl glass-card p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Question {currentQuestionIdx + 1} of {questions.length}</h3>
              <p className="text-xs text-muted-foreground">Current Level: {difficulty}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">{score} pts</p>
            <p className="text-xs text-muted-foreground">{accuracyPercent}% Accuracy</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
          <p className="text-xs text-muted-foreground text-right">{Math.round(progress)}%</p>
        </div>
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIdx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
        >
          <Card className="p-8 rounded-2xl glass-card">
            {/* Difficulty indicator */}
            <div className="mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                difficulty === "Hard"
                  ? "bg-red-500/20 text-red-600"
                  : difficulty === "Medium"
                  ? "bg-orange-500/20 text-orange-600"
                  : "bg-green-500/20 text-green-600"
              }`}>
                {difficulty} Difficulty
              </span>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => !showFeedback && setSelectedAnswer(idx)}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                    selectedAnswer === idx
                      ? "bg-primary text-primary-foreground ring-2 ring-primary"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                  } ${
                    showFeedback && idx === currentQuestion.correctAnswer
                      ? "bg-green-500/20 text-green-700 ring-2 ring-green-500"
                      : showFeedback && idx === selectedAnswer && !isCorrect
                      ? "bg-red-500/20 text-red-700 ring-2 ring-red-500"
                      : ""
                  } disabled:cursor-not-allowed`}
                  disabled={showFeedback}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      selectedAnswer === idx
                        ? "bg-primary-foreground text-primary"
                        : "bg-primary/20 text-primary"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    {option}
                    {showFeedback && idx === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 ml-auto text-green-500" />
                    )}
                    {showFeedback && idx === selectedAnswer && !isCorrect && (
                      <XCircle className="w-5 h-5 ml-auto text-red-500" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl mb-6 ${
                    isCorrect
                      ? "bg-green-500/10 border border-green-500/30"
                      : "bg-red-500/10 border border-red-500/30"
                  }`}
                >
                  <p className={`font-bold mb-2 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                    {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                  </p>
                  <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex gap-3">
              {!showFeedback ? (
                <button
                  onClick={handleAnswer}
                  disabled={selectedAnswer === null}
                  className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
                >
                  {currentQuestionIdx < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </button>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Difficulty adjustment indicator */}
      {answered > 0 && answered % 5 === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-sm text-blue-700"
        >
          <p className="font-semibold mb-1">🤖 Adaptive Difficulty Adjusted</p>
          <p className="text-xs">
            Based on your {accuracyPercent}% accuracy, difficulty has been adjusted to {difficulty} level for optimal learning.
          </p>
        </motion.div>
      )}

      {/* Analysis Results Output */}
      {output && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl glass-card bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-500/20"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">📊 Analysis Results</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-secondary/50">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Topics Detected:</p>
              <p className="text-foreground">{JSON.stringify(output, null, 2)}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
