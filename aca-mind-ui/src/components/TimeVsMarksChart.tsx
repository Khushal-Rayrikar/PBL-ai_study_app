import { Card } from "./ui/card";
import { TrendingUp, Clock, Target } from "lucide-react";
import { motion } from "framer-motion";

interface TimeMarksData {
  date: string;
  timeSpent: number; // minutes
  marksObtained: number; // percentage
}

interface TimeVsMarksChartProps {
  data: TimeMarksData[];
}

export function TimeVsMarksChart({ data }: TimeVsMarksChartProps) {
  // Calculate statistics
  const avgTime = Math.round(data.reduce((sum, d) => sum + d.timeSpent, 0) / data.length);
  const avgMarks = Math.round(data.reduce((sum, d) => sum + d.marksObtained, 0) / data.length);
  const maxMarks = Math.max(...data.map(d => d.marksObtained));
  
  // Find optimal study time (time when they got highest marks)
  const optimalEntry = data.find(d => d.marksObtained === maxMarks);
  const optimalTime = optimalEntry?.timeSpent || avgTime;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <Card className="p-6 rounded-2xl glass-card">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Time vs Marks Analysis</h3>
        </div>

        {/* Chart Visualization */}
        <div className="mb-6">
          <div className="flex items-end justify-between gap-2 h-40 px-2">
            {data.slice(-7).map((entry, idx) => {
              const heightPercent = (entry.marksObtained / maxMarks) * 100;
              return (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-purple-500 to-pink-500 relative group cursor-pointer hover:shadow-lg transition-shadow"
                  title={`${entry.date}: ${entry.marksObtained}% in ${entry.timeSpent}min`}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                    {entry.marksObtained}%
                  </div>
                </motion.div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">Last 7 sessions</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-purple-500" />
              <p className="text-xs font-medium text-muted-foreground">Avg Time</p>
            </div>
            <p className="text-sm font-bold text-foreground">{avgTime} min</p>
          </div>

          <div className="p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-pink-500" />
              <p className="text-xs font-medium text-muted-foreground">Avg Score</p>
            </div>
            <p className="text-sm font-bold text-foreground">{avgMarks}%</p>
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 border-2 border-green-500/30">
            <p className="text-xs font-medium text-muted-foreground mb-1">💡 Optimal</p>
            <p className="text-sm font-bold text-green-500">{optimalTime}min</p>
          </div>
        </div>

        {/* AI Insight */}
        <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <p className="text-xs font-semibold text-foreground mb-1">🤖 AI Insight</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your optimal study session is around <strong>{optimalTime} minutes</strong>. You achieve {maxMarks}% accuracy at this duration. Consider structuring sessions accordingly.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
