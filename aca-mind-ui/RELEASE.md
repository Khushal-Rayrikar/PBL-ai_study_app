# 🚀 ACA Mind - Release Guide

This document explains how to download, install, and run ACA Mind on different platforms.

## 📥 Download

You can download releases from:
- **GitHub Releases**: https://github.com/Khushal-Rayrikar/PBL-ai_study_app/releases
- **Web Version**: Available as a zip file or tar archive
- **Android Version**: Available as APK (Android 8.0+)

---

## 🌐 Web Version

### Windows / Mac / Linux

#### Option 1: Using Python (Easiest)
```bash
# Extract the release package
unzip aca-mind-ui-v1.0.0-2026-04-01.zip
cd aca-mind-ui-v1.0.0-2026-04-01

# Start a simple HTTP server (Python 3)
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser and visit: **http://localhost:8000**

#### Option 2: Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Run it
http-server

# Default: http://localhost:8080
```

#### Option 3: Using PHP
```bash
cd path/to/extracted/folder
php -S localhost:8000
```

Then visit: **http://localhost:8000**

#### Option 4: Using Docker
```bash
# Create a Dockerfile in the extracted folder
docker run -d -p 8080:80 -v $(pwd):/usr/share/nginx/html nginx:alpine
```

Visit: **http://localhost:8080**

---

## 📱 Android Version

### Prerequisites
- Android phone with Android 8.0 or higher
- ~50 MB free storage

### Installation

1. **Download APK**
   - Download `aca-mind-ui-vX.X.X.apk` from releases

2. **Enable Installation from Unknown Sources**
   - Go to Settings → Apps → Special App Access → Install Unknown Apps
   - Allow your file manager to install apps
   - Or Settings → Security → Unknown Sources (Android 7 and below)

3. **Install APK**
   - Locate the downloaded APK file
   - Tap to install
   - Confirm permissions

4. **Launch**
   - Find "ACA Mind" in your app drawer
   - Tap to open

### Features on Mobile
- ✅ Full responsive design
- ✅ Touch optimized UI
- ✅ Works offline (cached data)
- ✅ Portrait and landscape modes

---

## 🖥️ Desktop (Electron)

> Coming in future releases

---

## 📋 Features Overview

### Dashboard 📊
- Real-time progress tracking
- XP and levels system
- Study streak counter
- Overall mastery percentage
- Recent quiz history

### Revision Hub 🔄
- AI-recommended revision topics
- Track last review dates
- Accuracy metrics per unit
- Smart scheduling

### Theory & Concepts 📚
- Organized by difficulty levels
- Key concepts summary
- Save favorite topics
- Personalized learning path

### Focus On 🎯
- AI detects weak areas
- Recommends study techniques:
  - Spaced repetition
  - Interleaving
  - Elaborative interrogation
  - Concrete examples
- Personalized improvement plan

### Adaptive Quiz 🧠
- Questions adjust based on performance
- Difficulty increases if accuracy > 80%
- Difficulty decreases if accuracy < 50%
- Real-time score tracking
- Instant feedback with explanations

### Analytics 📈
- Time vs Marks analysis
- Optimal study time recommendations
- Performance trends
- Unit-wise breakdown

---

## 🔧 Troubleshooting

### Web Version Issues

**"Cannot find index.html"**
- Make sure you're in the correct directory
- Check that index.html exists in the folder
- Clear browser cache (Ctrl+Shift+Delete)

**"Port already in use"**
```bash
# Use a different port
python -m http.server 9000
# Visit: http://localhost:9000
```

**"Connection refused"**
- Verify the server is running
- Check firewall settings
- Try http://127.0.0.1:8000 instead of localhost

### Android Version Issues

**"App won't install"**
- Check you have ~50 MB free space
- Ensure "Unknown Sources" is enabled
- Try clearing Play Store cache first

**"App crashes on startup"**
- Clear app cache: Settings → Apps → ACA Mind → Storage → Clear Cache
- Reinstall the app
- Update Android OS if available

**"Features not working offline"**
- Some features require internet connection (AI analysis)
- Basic quiz features work offline
- Sync when internet is available

---

## 📖 System Requirements

| Platform | Requirement |
|----------|------------|
| **Web** | Modern browser (Chrome, Firefox, Safari, Edge) |
| **Android** | Android 8.0 or higher, 50MB storage |
| **Desktop** | Coming soon |

---

## 🔐 Privacy & Security

- ✅ All data is processed locally on your device
- ✅ No personal data is stored on external servers
- ✅ Quiz responses are encrypted
- ✅ Open source - inspect the code anytime

---

## 🤝 Support & Issues

### Report Issues
- GitHub Issues: https://github.com/Khushal-Rayrikar/PBL-ai_study_app/issues
- Include:
  - Platform (Web/Android/Desktop)
  - Browser/Android version
  - Steps to reproduce
  - Screenshots if applicable

### Feature Requests
- GitHub Discussions: https://github.com/Khushal-Rayrikar/PBL-ai_study_app/discussions

---

## 📊 Build from Source

### Prerequisites
- Node.js 16+ and npm
- Java 11+ (for Android builds)
- Android Studio (optional, for Android development)

### Clone & Build

```bash
# Clone repository
git clone https://github.com/Khushal-Rayrikar/PBL-ai_study_app.git
cd PBL-ai_study_app/aca-mind-ui

# Install dependencies
npm install

# Build web version
npm run build

# Run development server
npm run dev

# Build Android APK (requires Android setup)
npm run cap:add:android
npm run cap:build:android
npm run cap:open:android
```

### Development

```bash
# Start dev server with hot reload
npm run dev

# Run linting
npm run lint

# Preview production build locally
npm run build && npm run preview
```

---

## 📝 Version History

### v1.0.0 (April 1, 2026) - Initial Release ✨
- ✨ Complete UI with modern design
- 📊 Time vs Marks analysis
- 🎯 AI-powered "Focus On" page
- 🧠 Adaptive quiz system
- 📚 Revision and Theory pages
- 🎨 Glassmorphism aesthetic
- 📈 Unit-wise performance breakdown

---

## 🎓 Quick Start Guide

### For Students
1. **Download** the app for your platform
2. **Install** following the instructions above
3. **Create Account** (or demo mode)
4. **Upload** your study materials
5. **Take Quizzes** and start improving!

### For Teachers/Trainers
1. **Set up** the app for your class
2. **Create** custom learning materials
3. **Monitor** student progress via dashboard
4. **Analyze** performance trends
5. **Adjust** curriculum based on data

---

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

## 🙏 Credits

- **Developed by**: Khushal Rayrikar & Team
- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **AI Engine**: Custom Python-based analysis
- **Mobile**: Capacitor for Android/iOS

---

## 📞 Contact

- **GitHub**: https://github.com/Khushal-Rayrikar
- **Project**: https://github.com/Khushal-Rayrikar/PBL-ai_study_app
- **Issues**: Report via GitHub Issues

---

**Happy Learning! 🎉**
