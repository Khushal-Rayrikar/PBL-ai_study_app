import { Link, useLocation } from "wouter";
import { BookOpen, RotateCw, Home, Upload, AlertCircle, Brain, Play } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/revision", label: "Revision", icon: RotateCw },
    { href: "/theory", label: "Theory", icon: BookOpen },
    { href: "/quizzes", label: "Quizzes", icon: Brain },
    { href: "/videos", label: "Videos", icon: Play },
    { href: "/focus", label: "Focus On", icon: AlertCircle },
    { href: "/upload", label: "Upload", icon: Upload },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-secondary overflow-x-auto scrollbar-hide">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary hover:text-primary/80 transition-colors shrink-0">
            <span className="text-2xl">🎓</span>
            <span className="hidden sm:inline">Cortexa</span>
          </Link>

          <div className="flex items-center gap-1 bg-secondary/50 rounded-full p-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full font-medium transition-all whitespace-nowrap text-sm ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shrink-0">
            SG
          </div>
        </div>
      </div>
    </nav>
  );
}
