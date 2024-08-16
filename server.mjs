// server.mjs

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { createServer } from 'http';
import { execSync } from 'child_process';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if 'www' directory and 'index.html' file exist
const wwwPath = path.join(__dirname, 'www');
const indexPath = path.join(wwwPath, 'index.html');

function checkDirectoryAndFile() {
  if (!fs.existsSync(wwwPath)) {
    console.error(`[${new Date().toISOString()}] 📁 'www' directory is missing. Please create it and add 'index.html' file.`);
    runPrebuildScript();
    process.exit(1);
  }

  if (!fs.existsSync(indexPath)) {
    console.error(`[${new Date().toISOString()}] 📄 'index.html' file is missing inside the 'www' directory. Please add it.`);
    runPrebuildScript();
    process.exit(1);
  }
}

// Run prebuild script
function runPrebuildScript() {
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ⚠️ Error running prebuild script: ${error.message}`);
    process.exit(1);
  }
}

// Initialize Express app
const app = express();
const PORT = process.env.PORT_SERVER_EXPRESS || 7000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.removeHeader('X-Powered-By');
  next();
});

// Serve static files from 'www' directory
app.use(express.static(wwwPath));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

// Redirect all other routes to index.html for React Router to handle
app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Handle general errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Create and start the server
const server = createServer(app);

server.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] 🚀 Server is running on http://localhost:${PORT}`);
});

// Check the directory and file before starting
checkDirectoryAndFile();

// Run the prebuild script before starting the server
runPrebuildScript();

export default app;