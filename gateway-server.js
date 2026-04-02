/**
 * Cortexa Unified Gateway
 * Serves both frontend and backend on a single port (3000)
 */

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static frontend files
const frontendPath = path.join(__dirname, 'ui_app', 'aca-mind-ui', 'dist');

// Check if frontend is built
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  console.log('✅ Serving frontend from dist folder');
} else {
  console.warn('⚠️  Frontend dist folder not found. Build frontend first with: npm run build');
}

// API proxy - all requests to /api go to backend
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:8000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '' // Remove /api prefix when forwarding to backend
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Backend service unavailable' });
  }
}));

// Health check endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'gateway' });
});

app.get('/health/frontend', (req, res) => {
  res.json({ status: 'ok', service: 'frontend' });
});

app.get('/health/backend', (req, res) => {
  // Try to reach backend
  const http = require('http');
  http.get('http://localhost:8000/', (res2) => {
    res.json({ status: 'ok', service: 'backend', port: 8000 });
  }).on('error', () => {
    res.status(503).json({ status: 'error', service: 'backend', port: 8000 });
  });
});

// Serve index.html for client-side routing
app.get('*', (req, res) => {
  const indexPath = path.join(frontendPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Frontend not found. Build with: npm run build' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n');
  console.log('╔════════════════════════════════════════╗');
  console.log('║   CORTEXA UNIFIED GATEWAY              ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('\n');
  console.log(`✅ Gateway running on: http://localhost:${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔌 Backend API: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log('\n');
  console.log('Make sure the AI backend is running on port 8000:');
  console.log('  cd ai-study-assistant && python main.py');
  console.log('\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\nShutting down gateway...');
  process.exit(0);
});
