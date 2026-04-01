import { useState } from "react";
import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import { Play, Clock, Eye, Star, BookOpen, Filter } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  views: number;
  rating: number;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  embedUrl: string;
}

const sampleVideos: Video[] = [
  {
    id: "vid-1",
    title: "Understanding Photosynthesis - Complete Guide",
    description: "Learn how plants convert light energy into chemical energy with detailed animations and explanations.",
    thumbnail: "🌱",
    duration: 12,
    views: 1250,
    rating: 4.8,
    category: "Biology",
    level: "Beginner",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "vid-2",
    title: "Cellular Respiration Explained",
    description: "Dive deep into how cells break down glucose to produce ATP. Perfect for understanding energy metabolism.",
    thumbnail: "⚡",
    duration: 15,
    views: 890,
    rating: 4.7,
    category: "Biology",
    level: "Intermediate",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "vid-3",
    title: "DNA Structure and Replication",
    description: "Explore the double helix structure of DNA and how it replicates with precision during cell division.",
    thumbnail: "🧬",
    duration: 18,
    views: 2100,
    rating: 4.9,
    category: "Biology",
    level: "Intermediate",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "vid-4",
    title: "Evolution and Natural Selection",
    description: "Understand Darwin's theory and how species adapt to their environments over time.",
    thumbnail: "🐦",
    duration: 20,
    views: 1560,
    rating: 4.6,
    category: "Biology",
    level: "Advanced",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "vid-5",
    title: "Genetics & Heredity Basics",
    description: "Learn about inheritance patterns, dominant and recessive traits, and Mendel's laws of inheritance.",
    thumbnail: "👶",
    duration: 14,
    views: 980,
    rating: 4.5,
    category: "Biology",
    level: "Beginner",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "vid-6",
    title: "Photosynthesis Lab Walkthrough",
    description: "Step-by-step guide to conducting photosynthesis experiments with common materials.",
    thumbnail: "🔬",
    duration: 10,
    views: 650,
    rating: 4.4,
    category: "Biology",
    level: "Beginner",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "vid-7",
    title: "Mitochondria: Powerhouse of the Cell",
    description: "Complete breakdown of mitochondrial structure and its role in cellular energy production.",
    thumbnail: "💪",
    duration: 13,
    views: 1120,
    rating: 4.7,
    category: "Biology",
    level: "Intermediate",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "vid-8",
    title: "Ecosystems and Food Webs",
    description: "Explore how organisms interact in ecosystems and energy flows through different trophic levels.",
    thumbnail: "🌍",
    duration: 16,
    views: 1380,
    rating: 4.8,
    category: "Biology",
    level: "Intermediate",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const levelColor = {
  Beginner: "bg-green-500/10 text-green-700",
  Intermediate: "bg-yellow-500/10 text-yellow-700",
  Advanced: "bg-red-500/10 text-red-700",
};

export default function VideosPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filteredVideos = sampleVideos.filter((video) => {
    const matchesLevel = !selectedLevel || video.level === selectedLevel;
    const matchesCategory = !selectedCategory || video.category === selectedCategory;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const categories = [...new Set(sampleVideos.map((v) => v.category))];
  const totalWatchTime = sampleVideos.reduce((sum, v) => sum + v.duration, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Learning Videos</h1>
          <p className="text-muted-foreground text-lg">
            Watch expert explanations and visual demonstrations of key concepts
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Videos</p>
                <p className="text-3xl font-bold text-foreground">{sampleVideos.length}</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Duration</p>
                <p className="text-3xl font-bold text-foreground">{totalWatchTime} hrs</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-3xl font-bold text-foreground">
                  {(sampleVideos.reduce((sum, v) => sum + v.rating, 0) / sampleVideos.length).toFixed(1)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Filter className="w-4 h-4" />
            Difficulty Level
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedLevel === level
                    ? levelColor[level as keyof typeof levelColor] + " ring-2 ring-offset-2 ring-offset-background"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <BookOpen className="w-4 h-4" />
            Category
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-offset-background"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card
              className="glass-card overflow-hidden h-full hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail */}
              <div className="relative w-full h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden group">
                <span className="text-6xl">{video.thumbnail}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                  {video.duration} min
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <h3 className="font-bold text-foreground line-clamp-2">{video.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
                </div>

                {/* Metadata */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2 py-1 rounded-full font-semibold ${levelColor[video.level]}`}>
                      {video.level}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-semibold">{video.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.views.toLocaleString()} views
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-20">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-foreground mb-2">No videos found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl"
          >
            <Card className="glass-card overflow-hidden space-y-4">
              {/* Video Embed */}
              <div className="relative w-full pt-[56.25%] bg-black rounded-t-lg overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  width="100%"
                  height="100%"
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">{selectedVideo.title}</h2>
                  <p className="text-muted-foreground">{selectedVideo.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className={`px-3 py-1 rounded-full font-semibold ${levelColor[selectedVideo.level]}`}>
                    {selectedVideo.level}
                  </span>
                  <div className="flex items-center gap-2 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{selectedVideo.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {selectedVideo.duration} minutes
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    {selectedVideo.views.toLocaleString()} views
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-full px-4 py-3 rounded-lg bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition-all"
                >
                  Close
                </button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
