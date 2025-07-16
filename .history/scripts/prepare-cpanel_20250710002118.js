const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('� Preparing Soccer Hunters for cPanel deployment...');

// Function to copy files recursively (Windows compatible)
function copyRecursive(src, dest) {
  try {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      const files = fs.readdirSync(src);
      files.forEach(file => {
        copyRecursive(path.join(src, file), path.join(dest, file));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  } catch (error) {
    console.warn(`Warning: Could not copy ${src} - ${error.message}`);
  }
}

try {
  const deployDir = './deploy';
  
  // Clean and create deploy directory
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true, force: true });
  }
  fs.mkdirSync(deployDir, { recursive: true });

  console.log('� Building client application...');
  try {
    process.chdir('./client');
    execSync('npm run build', { stdio: 'inherit' });
    process.chdir('../');
  } catch (buildError) {
    console.error('Client build failed:', buildError.message);
    process.chdir('../');
    throw buildError;
  }

  console.log('🔧 Compiling server application...');
  try {
    execSync('npx tsc server/index.ts --outDir dist --module esnext --target es2020 --moduleResolution node', { stdio: 'inherit' });
  } catch (serverError) {
    console.warn('TypeScript compilation failed, copying source files instead');
    copyRecursive('./server', `${deployDir}/server`);
  }

  console.log('📋 Organizing deployment files...');
  
  // Copy built client to deploy directory
  if (fs.existsSync('./client/dist')) {
    copyRecursive('./client/dist', `${deployDir}/public`);
    console.log('✅ Client files copied');
  }
  
  // Copy server files
  if (fs.existsSync('./dist')) {
    copyRecursive('./dist', `${deployDir}/dist`);
    console.log('✅ Compiled server copied');
  } else {
    copyRecursive('./server', `${deployDir}/server`);
    console.log('✅ Server source files copied');
  }
  
  // Copy entry point
  if (fs.existsSync('./app.js')) {
    fs.copyFileSync('./app.js', `${deployDir}/app.js`);
    console.log('✅ Entry point copied');
  }
  
  // Create production package.json
  const originalPackage = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const productionPackage = {
    name: originalPackage.name,
    version: originalPackage.version,
    description: originalPackage.description,
    main: "app.js",
    type: "module",
    scripts: {
      start: "node app.js"
    },
    engines: {
      node: ">=18.0.0"
    },
    dependencies: {
      express: originalPackage.dependencies.express,
      "express-session": originalPackage.dependencies["express-session"],
      passport: originalPackage.dependencies.passport,
      "passport-local": originalPackage.dependencies["passport-local"],
      bcryptjs: originalPackage.dependencies.bcryptjs,
      mysql2: originalPackage.dependencies.mysql2,
      pg: originalPackage.dependencies.pg,
      multer: originalPackage.dependencies.multer,
      cors: originalPackage.dependencies.cors,
      tsx: originalPackage.dependencies.tsx || originalPackage.devDependencies.tsx
    }
  };
  fs.writeFileSync(`${deployDir}/package.json`, JSON.stringify(productionPackage, null, 2));
  console.log('✅ Production package.json created');
  
  // Copy environment template
  if (fs.existsSync('./.env.cpanel')) {
    fs.copyFileSync('./.env.cpanel', `${deployDir}/.env.example`);
    console.log('✅ Environment template copied');
  }
  
  // Copy static assets
  if (fs.existsSync('./public')) {
    copyRecursive('./public', `${deployDir}/assets`);
    console.log('✅ Static assets copied');
  }
  
  // Create uploads directory
  fs.mkdirSync(`${deployDir}/uploads`, { recursive: true });
  console.log('✅ Uploads directory created');
  
  // Create .htaccess for single-page application
  const htaccessContent = `# Soccer Hunters SPA Configuration
Options -MultiViews
RewriteEngine On

# Handle API routes
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^(.*)$ - [L]

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [QSA,L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Cache optimization
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/* "access plus 1 year"
</IfModule>`;

  fs.writeFileSync(`${deployDir}/public/.htaccess`, htaccessContent);
  console.log('✅ .htaccess created for SPA routing');

  console.log('\n🎉 cPanel deployment preparation complete!');
  console.log('\n📁 Deployment structure:');
  console.log('├── app.js (Node.js entry point)');
  console.log('├── package.json (production dependencies)');
  console.log('├── .env.example (environment configuration template)');
  console.log('├── public/ (client application with .htaccess)');
  console.log('├── server/ or dist/ (backend application)');
  console.log('├── assets/ (static files)');
  console.log('└── uploads/ (file uploads directory)');
  
  console.log('\n📋 cPanel Deployment Steps:');
  console.log('1. 📤 Upload ./deploy/* to your cPanel public_html directory');
  console.log('2. 🔧 In cPanel Node.js Apps, create new application:');
  console.log('   - Node.js version: 18+');
  console.log('   - Startup file: app.js');
  console.log('   - Application root: /public_html (or your domain folder)');
  console.log('3. 🔑 Copy .env.example to .env and configure your database');
  console.log('4. 📦 Run in cPanel terminal: npm install --production');
  console.log('5. ▶️  Start the application from cPanel Node.js interface');
  console.log('6. 🌐 Access your app via your domain');
  
  console.log('\n⚠️  Important Notes:');
  console.log('• Make sure Node.js is enabled in your cPanel hosting');
  console.log('• Configure your database connection in .env file');
  console.log('• Set proper file permissions for uploads directory');
  console.log('• API endpoints will be available at yoursite.com/api/');

} catch (error) {
  console.error('\n❌ Deployment preparation failed:', error.message);
  console.error('\n🔍 Troubleshooting:');
  console.error('• Make sure npm dependencies are installed');
  console.error('• Check that client/dist directory exists (run npm run build in client folder)');
  console.error('• Verify that app.js file exists in root directory');
  process.exit(1);
}
