#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(__dirname, '..', 'dist');
const releasesDir = path.join(__dirname, '..', '..', 'releases');

// Create releases directory if it doesn't exist
if (!fs.existsSync(releasesDir)) {
  fs.mkdirSync(releasesDir, { recursive: true });
}

// Get version from package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const version = packageJson.version || '1.0.0';
const timestamp = new Date().toISOString().split('T')[0];
const releaseFileName = `aca-mind-ui-v${version}-${timestamp}`;

// Check if dist folder exists
if (!fs.existsSync(distDir)) {
  console.error('❌ dist folder not found. Run "npm run build" first.');
  process.exit(1);
}

try {
  console.log('📦 Creating release package...');
  
  // Create a zip file (if available)
  const os = process.platform;
  
  if (os === 'win32') {
    // Windows - use tar or PowerShell
    console.log(`📁 Copying dist to ${releasesDir}/${releaseFileName}/`);
    const destDir = path.join(releasesDir, releaseFileName);
    
    if (fs.existsSync(destDir)) {
      fs.rmSync(destDir, { recursive: true });
    }
    
    // Copy dist folder
    fs.cpSync(distDir, destDir, { recursive: true });
    
    // Create a simple index.html that can be served
    const setupGuide = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ACA Mind - Release Package</title>
      <style>
        * { margin: 0; padding: 0; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 16px;
          padding: 40px;
          max-width: 600px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        h1 { color: #333; margin-bottom: 20px; }
        .info { color: #666; line-height: 1.6; margin-bottom: 30px; }
        .section {
          margin: 30px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }
        .section h3 { color: #333; margin-bottom: 10px; }
        .section p, .section li { color: #666; margin: 8px 0; }
        .section ul { margin-left: 20px; }
        .code {
          background: #1e1e1e;
          color: #00ff00;
          padding: 10px;
          border-radius: 4px;
          font-family: monospace;
          margin: 10px 0;
          overflow-x: auto;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎓 ACA Mind v${version}</h1>
        
        <div class="info">
          <p>Thank you for downloading ACA Mind! This is a comprehensive AI-powered learning platform with adaptive quizzes, performance analytics, and personalized study recommendations.</p>
        </div>

        <div class="section">
          <h3>🌐 Web Version</h3>
          <p>To run the web version:</p>
          <ol style="margin-left: 20px;">
            <li>Extract this folder</li>
            <li>Open any HTTP server in this directory</li>
            <li>Navigate to index.html in your browser</li>
          </ol>
          <p style="margin-top: 10px;"><strong>Quick start:</strong></p>
          <div class="code">python -m http.server 8000</div>
          <p>Then visit: http://localhost:8000</p>
        </div>

        <div class="section">
          <h3>📱 Android Version (Coming Soon)</h3>
          <p>Android APK build available separately. Requires Android 8.0+</p>
        </div>

        <div class="section">
          <h3>✨ Features</h3>
          <ul>
            <li>📊 Time vs Marks Analysis</li>
            <li>🎯 AI-Powered "Focus On" Page</li>
            <li>🧠 Adaptive Quiz System with Dynamic Difficulty</li>
            <li>📚 Revision & Theory Pages</li>
            <li>📈 Unit-wise Performance Breakdown</li>
            <li>🎨 Modern glassmorphism UI</li>
          </ul>
        </div>

        <div class="section">
          <h3>🔧 System Requirements</h3>
          <ul>
            <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
            <li>JavaScript enabled</li>
            <li>Screen size: 360px or larger</li>
          </ul>
        </div>

        <div class="section">
          <h3>📖 Documentation</h3>
          <p>For more information and documentation, visit:</p>
          <p><strong>Repository:</strong> https://github.com/Khushal-Rayrikar/PBL-ai_study_app</p>
        </div>

        <div class="section" style="border-left-color: #28a745;">
          <h3>✅ Ready to Start?</h3>
          <p>Click the link below to launch ACA Mind:</p>
          <p style="margin-top: 15px;">
            <a href="index.html" style="
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 12px 30px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: bold;
            ">Launch ACA Mind →</a>
          </p>
        </div>
      </div>
    </body>
    </html>
    `;
    
    fs.writeFileSync(path.join(destDir, 'SETUP.html'), setupGuide);
    
    console.log(`✅ Release package created at: ${destDir}`);
    console.log(`\n📦 Next steps:`);
    console.log(`1. Extract the folder`);
    console.log(`2. Open SETUP.html for instructions`);
    console.log(`3. Serve the web files using any HTTP server`);
    
  } else {
    // macOS/Linux - use tar
    console.log(`Creating tar archive...`);
    const tarName = `${releaseFileName}.tar.gz`;
    const tarPath = path.join(releasesDir, tarName);
    
    execSync(`cd ${path.dirname(distDir)} && tar -czf "${tarPath}" -C . dist/`, {
      stdio: 'inherit'
    });
    
    console.log(`✅ Release package created: ${tarName}`);
  }

  console.log(`\n🎉 Release package ready for distribution!`);
  
} catch (error) {
  console.error('❌ Error creating release package:', error.message);
  process.exit(1);
}
