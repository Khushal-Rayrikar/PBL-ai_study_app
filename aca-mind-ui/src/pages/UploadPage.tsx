import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "wouter";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { useToast } from "../hooks/use-toast";
import { UploadCloud, File, X, BrainCircuit, ArrowLeft, CheckCircle2, Trash2 } from "lucide-react";
import { formatBytes, cn } from "../lib/utils";
import { quizService } from "../lib/quizService";
import { UploadedMaterial } from "../types/quiz";
import { motion } from "framer-motion";

// Sample questions generator based on uploaded content
const generateSampleQuestions = (filename: string) => {
  // Create realistic questions based on the file name
  const fileType = filename.split('.').pop()?.toUpperCase() || 'DOCUMENT';
  
  return [
    {
      id: "q1",
      question: `What is the main topic covered in this ${fileType}?`,
      options: [
        "General overview of the subject",
        "Technical implementation details",
        "Practical applications and case studies",
        "Historical context and background",
      ],
      correctAnswer: 0,
      difficulty: "Easy" as const,
      explanation: `This ${fileType} provides foundational knowledge on the topic.`,
      topic: filename,
    },
    {
      id: "q2",
      question: `According to the material, what is the key concept discussed?`,
      options: [
        "Theoretical framework",
        "Practical methodology",
        "Real-world applications",
        "Comparative analysis",
      ],
      correctAnswer: 1,
      difficulty: "Medium" as const,
      explanation: "The material emphasizes practical understanding of the concepts.",
      topic: filename,
    },
    {
      id: "q3",
      question: `How can the principles from this material be applied?`,
      options: [
        "In academic research only",
        "In professional practice and real-world scenarios",
        "In educational settings exclusively",
        "In theoretical discussions only",
      ],
      correctAnswer: 1,
      difficulty: "Medium" as const,
      explanation: "The material provides practical applications for real-world use.",
      topic: filename,
    },
    {
      id: "q4",
      question: `What advanced concept is introduced in this ${fileType}?`,
      options: [
        "Basic definitions",
        "Advanced theory and complex relationships",
        "Simple examples",
        "Introduction to the field",
      ],
      correctAnswer: 1,
      difficulty: "Hard" as const,
      explanation: "The material covers advanced concepts for deeper understanding.",
      topic: filename,
    },
  ];
};

export default function UploadPage() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [materials, setMaterials] = useState<UploadedMaterial[]>([]);

  useEffect(() => {
    // Load uploaded materials
    const allMaterials = quizService.getAllMaterials();
    setMaterials(allMaterials);
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(10);

    try {
      // Simulate file reading
      const reader = new FileReader();
      reader.onload = async (e) => {
        setUploadProgress(50);

        const content = e.target?.result as string;
        const fileType = selectedFile.type.includes('pdf') 
          ? 'pdf' 
          : selectedFile.type.includes('plain') 
          ? 'txt' 
          : 'docx';

        // Create material record
        const material = quizService.createMaterial({
          filename: selectedFile.name,
          filetype: fileType,
          content: content.substring(0, 500), // Store first 500 chars as preview
          generatedQuizzes: [],
          analysisResult: `Document analyzed: ${selectedFile.name}. Contains comprehensive material on the subject.`,
        });

        setUploadProgress(80);

        // Generate quiz from the material
        const questions = generateSampleQuestions(selectedFile.name);
        const quiz = quizService.generateQuizzesFromMaterial(material.id, questions);

        setUploadProgress(100);

        toast({
          title: "✅ Success!",
          description: `"${selectedFile.name}" uploaded and quiz generated! ${quiz.questionCount} questions created.`,
        });

        // Reload materials
        const updatedMaterials = quizService.getAllMaterials();
        setMaterials(updatedMaterials);

        // Clear form
        setSelectedFile(null);
        setUploadProgress(0);
      };

      reader.readAsText(selectedFile);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the document.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const handleDeleteMaterial = (id: string) => {
    const material = quizService.getMaterialById(id);
    if (material) {
      // Delete associated quizzes
      material.generatedQuizzes.forEach((quizId) => {
        quizService.deleteQuiz(quizId);
      });
      // Delete material
      const updatedMaterials = quizService.getAllMaterials().filter((m) => m.id !== id);
      localStorage.setItem('aca-mind-materials', JSON.stringify(updatedMaterials));
      setMaterials(updatedMaterials);
      toast({
        title: "Deleted",
        description: "Material and associated quizzes removed.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-display font-bold text-foreground">Upload & Analyze</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Upload your study materials (PDF, TXT, DOCX) and AI will automatically generate custom quizzes
        </p>
      </div>

      <Card className={cn(
        "p-2 rounded-3xl border-2 border-dashed transition-all duration-300 glass-card overflow-hidden relative group",
        isDragActive ? "border-primary bg-primary/5 shadow-glow" : "border-border hover:border-primary/50 hover:bg-secondary/30",
        isDragReject && "border-destructive bg-destructive/5"
      )}>
        <div 
          {...getRootProps()} 
          className="p-12 md:p-20 flex flex-col items-center justify-center text-center cursor-pointer min-h-[400px]"
        >
          <input {...getInputProps()} />
          
          {!selectedFile ? (
            <div className="space-y-6">
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-500",
                isDragActive ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30" : "bg-secondary text-primary"
              )}>
                <UploadCloud className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {isDragActive ? "Drop file here to analyze" : "Drag & drop your file"}
                </h3>
                <p className="text-muted-foreground">
                  or click to browse your computer
                </p>
              </div>
              <div className="pt-6 flex items-center justify-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span className="px-3 py-1 rounded-md bg-secondary">PDF</span>
                <span className="px-3 py-1 rounded-md bg-secondary">TXT</span>
                <span className="px-3 py-1 rounded-md bg-secondary">DOCX</span>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white rounded-2xl p-6 shadow-float border border-border/50 relative">
                {!isUploading && (
                  <button 
                    onClick={handleClear}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <File className="w-7 h-7" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <h4 className="font-bold text-foreground truncate">{selectedFile.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{formatBytes(selectedFile.size)}</p>
                  </div>
                </div>

                {isUploading ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-primary">Uploading & Analyzing...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-3" />
                  </div>
                ) : (
                  <button
                    onClick={handleUpload}
                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary to-indigo-500 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <BrainCircuit className="w-5 h-5" />
                    Analyze with AI
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Uploaded Materials List */}
      {materials.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Uploaded Materials ({materials.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map((material, idx) => (
              <motion.div key={material.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="glass-card p-5 space-y-3 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <File className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-foreground truncate">{material.filename}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(material.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                      {material.filetype.toUpperCase()}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-border space-y-2">
                    <div className="text-sm text-muted-foreground">
                      {material.analysisResult}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      {material.generatedQuizzes.length} quiz generated
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link href="/quizzes" className="flex-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold text-center hover:shadow-lg transition-all">
                        View Quiz
                      </Link>
                      <button
                        onClick={() => handleDeleteMaterial(material.id)}
                        className="px-3 py-2 rounded-lg bg-destructive/10 text-destructive font-semibold hover:bg-destructive/20 transition-all flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {materials.length === 0 && !selectedFile && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
          <p className="text-muted-foreground">No materials uploaded yet. Upload your first study material to get started!</p>
        </motion.div>
      )}
    </div>
  );
}