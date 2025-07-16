# VERCEL DEPLOYMENT INSTRUCTIONS

## CRITICAL BUILD REQUIREMENTS

### ⚠️ IMPORTANT: vite-tsconfig-paths REMOVAL
This project previously used `vite-tsconfig-paths` but it has been **COMPLETELY REMOVED** as of commit 47ec798.

### Current Build Configuration:
- **NO** `vite-tsconfig-paths` dependency anywhere
- Uses manual path alias in `client/vite.config.ts`
- All imports work with `@/` prefix resolved to `./src`

### Build Process:
1. `npm install` (root dependencies)
2. `cd client && npm install` (client dependencies) 
3. `npm run build` (builds both client and server)

### Expected Output:
- Client build: `client/dist/` directory
- Build time: ~12-15 seconds locally
- No errors related to missing packages

### Troubleshooting:
If you see "Cannot find package 'vite-tsconfig-paths'" error:
- This indicates Vercel is using a cached/old version of files
- The error should NOT occur with commit 47ec798 or later
- All vite-tsconfig-paths references have been removed

### Latest Working Commit: 47ec798
Date: 2025-07-10 13:43:24
