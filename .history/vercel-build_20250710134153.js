#!/usr/bin/env node

// Vercel Build Script - Forces clean build without vite-tsconfig-paths
console.log('🚀 Starting Vercel Build Process...');
console.log('Node Version:', process.version);
console.log('Working Directory:', process.cwd());

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Verify vite.config.ts doesn't contain vite-tsconfig-paths
  const viteConfigPath = path.join(process.cwd(), 'client', 'vite.config.ts');
  if (fs.existsSync(viteConfigPath)) {
    const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
    if (viteConfig.includes('vite-tsconfig-paths')) {
      throw new Error('❌ CRITICAL: vite.config.ts still contains vite-tsconfig-paths import!');
    }
    console.log('✅ vite.config.ts is clean - no vite-tsconfig-paths found');
  }

  // Install root dependencies
  console.log('📦 Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Install client dependencies
  console.log('📦 Installing client dependencies...');
  execSync('cd client && npm install', { stdio: 'inherit' });

  // Build the application
  console.log('🔨 Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
