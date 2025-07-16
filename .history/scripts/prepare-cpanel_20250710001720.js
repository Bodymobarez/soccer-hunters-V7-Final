#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.dirname(__dirname);

console.log('🔧 Preparing Soccer Hunters for cPanel deployment...');

// Create public_html directory structure for cPanel
const publicHtmlDir = path.join(rootDir, 'public_html');
const distDir = path.join(rootDir, 'dist');
const clientDistDir = path.join(rootDir, 'client', 'dist');

// Ensure directories exist
if (!fs.existsSync(publicHtmlDir)) {
  fs.mkdirSync(publicHtmlDir, { recursive: true });
}

// Copy client build files to public_html
if (fs.existsSync(clientDistDir)) {
  console.log('📁 Copying client files to public_html...');
  copyDirectory(clientDistDir, publicHtmlDir);
} else {
  console.warn('⚠️  Client dist directory not found. Make sure to run build:client first.');
}

// Copy server files
if (fs.existsSync(distDir)) {
  console.log('🖥️  Server files are ready in dist directory');
} else {
  console.warn('⚠️  Server dist directory not found. Make sure to run build:server first.');
}

// Copy static assets
const publicDir = path.join(rootDir, 'public');
if (fs.existsSync(publicDir)) {
  console.log('📸 Copying static assets...');
  copyDirectory(publicDir, path.join(publicHtmlDir, 'assets'));
}

// Create .htaccess file for cPanel
createHtaccessFile(publicHtmlDir);

// Create startup script for cPanel Node.js
createStartupScript(rootDir);

console.log('✅ cPanel preparation complete!');
console.log('\n📋 Next steps for cPanel deployment:');
console.log('1. Upload all files to your cPanel file manager');
console.log('2. Set Node.js version to 18+ in cPanel');
console.log('3. Set startup file to: app.js');
console.log('4. Install dependencies: npm install --production');
console.log('5. Start the application from cPanel Node.js interface');

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

function createHtaccessFile(publicHtmlDir) {
  const htaccessContent = `# Soccer Hunters - cPanel Configuration
RewriteEngine On

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^(.*)$ /index.html [QSA,L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Compress files
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
`;

  fs.writeFileSync(path.join(publicHtmlDir, '.htaccess'), htaccessContent);
  console.log('📄 Created .htaccess file');
}

function createStartupScript(rootDir) {
  const startupContent = `{
  "name": "soccer-hunters",
  "version": "1.0.0",
  "description": "Soccer Hunters - Football talent marketing platform",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}`;

  fs.writeFileSync(path.join(rootDir, 'package-cpanel.json'), startupContent);
  console.log('📦 Created cPanel package.json');
}
