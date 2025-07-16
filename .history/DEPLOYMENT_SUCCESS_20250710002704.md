# Soccer Hunters - Complete Deployment Guide 🚀

## ✅ Deployment Status
Your Soccer Hunters application is now fully prepared for cPanel deployment! All necessary files have been organized in the `./deploy` directory.

## 📁 What's Ready
- ✅ Client application built and optimized
- ✅ Server source code prepared
- ✅ Production dependencies configured
- ✅ Environment configuration template
- ✅ Static assets organized
- ✅ .htaccess file for SPA routing
- ✅ File upload directory structure

## 🎯 Quick Start for cPanel

### Step 1: Upload Files
Upload the entire contents of `./deploy/` to your cPanel public_html directory.

### Step 2: Configure Environment
1. Copy `.env.example` to `.env`
2. Update database credentials:
   ```bash
   DATABASE_URL=mysql://your_db_user:your_password@localhost:3306/your_database
   ```
3. Update the session secret and domain settings

### Step 3: Setup Node.js App in cPanel
1. Go to cPanel → Node.js Apps
2. Create new application:
   - **Node.js Version**: 18.0 or higher
   - **Startup File**: `app.js`
   - **Application Root**: `/public_html` (or your domain folder)

### Step 4: Install Dependencies
In cPanel terminal, run:
```bash
npm install --production
```

### Step 5: Start Application
Start the application from cPanel Node.js interface.

## 🌐 Access Your App
- **Website**: `https://yourdomain.com`
- **API**: `https://yourdomain.com/api/`
- **Admin**: Login with test credentials (update in production)

## 📋 Production Checklist
- [ ] Database credentials configured in .env
- [ ] Session secret updated to a secure random string
- [ ] Domain configured in CORS_ORIGIN
- [ ] File permissions set correctly for uploads directory
- [ ] SSL certificate installed (recommended)
- [ ] Test user accounts removed/updated

## 🔧 Troubleshooting
- Verify Node.js is enabled in your hosting plan
- Check error logs in cPanel if the app doesn't start
- Ensure database connection is working
- Verify file permissions are correct

## 📞 Support
If you encounter any issues:
1. Check cPanel error logs
2. Verify all environment variables are set
3. Test database connection
4. Ensure all dependencies are installed

Your Soccer Hunters application is ready for the world! 🌟
