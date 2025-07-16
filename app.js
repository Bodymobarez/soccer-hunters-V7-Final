#!/usr/bin/env node

// cPanel entry point for Soccer Hunters application
// This file should be placed in the root directory of your cPanel hosting

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the compiled server
import('./dist/index.js').then(({ default: app }) => {
  // Get port from environment or use default
  const PORT = process.env.PORT || process.env.CPANEL_PORT || 3000;
  
  // For cPanel, we often need to listen on all interfaces
  const HOST = process.env.HOST || '0.0.0.0';
  
  // Start the server
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Soccer Hunters server running on ${HOST}:${PORT}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'production'}`);
  });
}).catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
