# Aca Mind UI

A React application for uploading study materials and generating AI-powered quizzes.

## Features

- Drag & drop file upload (PDF, TXT, DOCX)
- Real-time upload progress
- AI analysis integration with backend
- Toast notifications
- Responsive design with Tailwind CSS

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Ensure the backend server is running on `http://localhost:8000` for analysis.

## Backend Integration

The app sends uploaded files to the backend's `/analyze/` endpoint with the file and exam type. Make sure the backend is configured with the correct OpenAI API key.

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Dropzone
- Lucide Icons