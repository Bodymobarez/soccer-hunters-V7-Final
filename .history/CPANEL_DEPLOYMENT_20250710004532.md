# 🚀 Soccer Hunters - cPanel Deployment Guide

## Prerequisites

- cPanel hosting account with Node.js support (18+ recommended)
- SSH access (optional but recommended)
- File Manager access in cPanel
- Database access (PostgreSQL or MySQL)

## 🔧 Step 1: Prepare Your Application

1. **Build the application for production:**

   ```bash
   npm run build:cpanel
   ```

2. **This will create:**
   - `public_html/` - Client-side files (React app)
   - `dist/` - Server-side compiled files
   - `app.js` - cPanel entry point
   - `.htaccess` - Apache configuration

## 📁 Step 2: Upload Files to cPanel

### Using File Manager:
1. Log into your cPanel
2. Open File Manager
3. Navigate to your domain's root directory
4. Upload the following files/folders:
   - `app.js` (main entry point)
   - `dist/` folder (server files)
   - `public_html/` contents (to your domain's public_html)
   - `package.json`
   - `node_modules/` (or install via SSH/cPanel terminal)

### Using SSH (Recommended):
```bash
# Upload your project files to the server
scp -r . username@your-server:/home/username/your-domain/

# Or use git if available
git clone https://github.com/yourusername/soccer-hunters.git
cd soccer-hunters
```

## 🗄️ Step 3: Database Setup

1. **Create a database in cPanel:**
   - Go to "MySQL Databases" or "PostgreSQL Databases"
   - Create a new database: `your_username_soccerhunters`
   - Create a database user and assign to the database

2. **Update environment variables:**
   - Copy `.env.cpanel` to `.env`
   - Update database connection string:
   ```
   DATABASE_URL=mysql://username:password@localhost:3306/database_name
   ```

## 🔧 Step 4: Configure Node.js in cPanel

1. **Access Node.js section in cPanel**
2. **Create New Application:**
   - Node.js Version: 18+ (recommended)
   - Application Mode: Production
   - Application Root: `/home/username/your-domain`
   - Application URL: your-domain.com
   - Application Startup File: `app.js`

3. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=your-database-connection-string
   SESSION_SECRET=your-secret-key
   ```

## 📦 Step 5: Install Dependencies

In cPanel Node.js interface or via SSH:
```bash
npm install --production
```

Or if you have specific issues with dependencies:
```bash
npm ci --production
```

## 🏃‍♂️ Step 6: Start the Application

1. In cPanel Node.js interface, click "Start Application"
2. Monitor the logs for any errors
3. Visit your domain to test the application

## 🔍 Step 7: Verify Deployment

1. **Check the frontend:** Visit `https://yourdomain.com`
2. **Test API endpoints:** Visit `https://yourdomain.com/api/categories`
3. **Test login functionality** with test credentials
4. **Check cPanel Node.js logs** for any errors

## 🐛 Troubleshooting

### Common Issues:

1. **"Cannot find module" errors:**
   ```bash
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install --production
   ```

2. **Database connection issues:**
   - Verify database credentials in `.env`
   - Check if database service is running
   - Ensure database user has proper permissions

3. **Static files not loading:**
   - Check `.htaccess` file in public_html
   - Verify file permissions (644 for files, 755 for directories)

4. **Port binding issues:**
   - cPanel usually assigns a specific port
   - Check cPanel Node.js interface for the assigned port
   - Update your application configuration if needed

### Checking Logs:
- cPanel Node.js interface provides application logs
- Check cPanel Error Logs for Apache/server errors
- Monitor application console output

## 🔒 Security Considerations

1. **Update environment variables:**
   - Change default SESSION_SECRET
   - Use strong database passwords
   - Enable HTTPS (SSL certificate)

2. **File permissions:**
   ```bash
   chmod 644 .env
   chmod 755 dist/
   chmod 644 dist/*
   ```

3. **Database security:**
   - Use least privilege principle for database user
   - Enable database firewall if available

## 🚀 Performance Optimization

1. **Enable compression** (already in .htaccess)
2. **Use CDN** for static assets if needed
3. **Monitor resource usage** in cPanel
4. **Consider Redis/Memcached** for session storage in high-traffic scenarios

## 📞 Support

If you encounter issues:
1. Check cPanel Node.js application logs
2. Verify all environment variables are set correctly
3. Ensure database connection is working
4. Contact your hosting provider for Node.js specific issues

## 🎉 Success!

Your Soccer Hunters application should now be running on cPanel! 

Visit your domain to see the application in action.

---

**Note:** This guide assumes you have a cPanel hosting provider that supports Node.js applications. Some shared hosting providers may have limitations on Node.js applications.
