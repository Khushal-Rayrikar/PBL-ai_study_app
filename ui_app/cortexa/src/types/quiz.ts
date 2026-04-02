export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "Easy" | "Medium" | "Hard";
  explanation: string;
  topic?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  topicArea: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: number;
  questionCount: number;
  questions: Question[];
  completed?: boolean;
  averageScore?: number;
  sourceFile?: string; // Name of the uploaded file this quiz was generated from
  createdAt: Date;
  tags?: string[];
}

export interface UploadedMaterial {
  id: string;
  filename: string;
  filetype: "pdf" | "txt" | "docx";
  uploadedAt: Date;
  content: string;
  generatedQuizzes: string[]; // Quiz IDs
  analysisResult?: string;
}

export interface QuizStorage {
  quizzes: Quiz[];
  materials: UploadedMaterial[];
}
