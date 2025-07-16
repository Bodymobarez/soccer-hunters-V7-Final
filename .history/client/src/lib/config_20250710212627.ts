/**
 * Application configuration based on environment
 */

const config = {
  // API base URL - different for development vs production
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || (
    import.meta.env.DEV 
      ? 'http://localhost:3001' 
      : 'https://your-backend-server.com'  // Replace with your actual backend URL
  ),
  
  // Whether we're in development mode
  isDevelopment: import.meta.env.DEV,
  
  // Whether we're in production mode  
  isProduction: import.meta.env.PROD,
  
  // App name and version
  appName: 'Soccer Hunter',
  appVersion: '1.0.0',
};

export default config;
