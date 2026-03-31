import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "wouter";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { useToast } from "../hooks/use-toast";
import { UploadCloud, File, X, BrainCircuit, ArrowLeft } from "lucide-react";
import { formatBytes, cn } from "../lib/utils";

export default function UploadPage() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

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

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('exam', 'general'); // You can make this configurable

    try {
      const response = await fetch('http://localhost:8000/analyze/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Analysis Complete",
          description: data.result || "Document analyzed successfully.",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: "There was an error analyzing the document.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to the analysis service.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-display font-bold text-foreground">Upload Material</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Feed the AI your syllabus, lecture notes, or study guides to instantly generate custom quizzes.
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
    </div>
  );
}