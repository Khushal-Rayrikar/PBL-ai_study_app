import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { TrendingUp, BookOpen } from "lucide-react";

interface Unit {
  id: string;
  name: string;
  progress: number;
  topics: number;
  strength: "Strong" | "Good" | "Needs Work";
  aiInsight: string;
  lastpracticed: string;
}

interface UnitWiseBreakdownProps {
  units: Unit[];
}

export function UnitWiseBreakdown({ units }: UnitWiseBreakdownProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-display font-bold text-foreground">Unit-wise Breakdown</h2>
      </div>

      <div className="grid gap-4">
        {units.map((unit, idx) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="p-5 rounded-2xl glass-card hover:shadow-lg transition-all cursor-pointer group">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {unit.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {unit.topics} topics • Last practiced {unit.lastpracticed}
                    </p>
                  </div>
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0 ${
                    unit.strength === "Strong"
                      ? "bg-green-500/10 text-green-600"
                      : unit.strength === "Good"
                      ? "bg-blue-500/10 text-blue-600"
                      : "bg-amber-500/10 text-amber-600"
                  }`}>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground font-semibold">{unit.progress}% Mastery</span>
                    <span className={`font-semibold ${
                      unit.strength === "Strong"
                        ? "text-green-600"
                        : unit.strength === "Good"
                        ? "text-blue-600"
                        : "text-amber-600"
                    }`}>
                      {unit.strength}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${unit.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        unit.strength === "Strong"
                          ? "bg-green-500"
                          : unit.strength === "Good"
                          ? "bg-primary"
                          : "bg-amber-500"
                      }`}
                    />
                  </div>
                </div>

                {/* AI Insight */}
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-0.5">🤖</span>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">AI Insight</p>
                      <p className="text-xs text-muted-foreground">{unit.aiInsight}</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full py-2 px-3 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                  Practice {unit.name}
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
