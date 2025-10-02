# Deployment Guide for Student Risk Prediction System

## Vercel Deployment Instructions

### Prerequisites
- GitHub account with your code repository
- MongoDB Atlas database (or other MongoDB hosting)
- Email service credentials (Gmail with App Password recommended)

### Step 1: Prepare Your Repository
1. Ensure all files are committed to your GitHub repository
2. Verify that your `.env.example` file is present
3. Make sure `.env.local` is in your `.gitignore`

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up using your GitHub account
3. Grant Vercel access to your repositories

### Step 3: Deploy from GitHub
1. Click "New Project" in your Vercel dashboard
2. Import your repository from GitHub
3. Vercel will auto-detect it's a Next.js project
4. Click "Deploy" (initial deployment will fail due to missing env vars)

### Step 4: Configure Environment Variables
In your Vercel dashboard, go to Settings > Environment Variables and add:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-risk-db
NEXTAUTH_SECRET=your-random-32-character-secret-here
NEXTAUTH_URL=https://your-app-name.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=noreply@yourdomain.com
```

### Step 5: Set Up MongoDB Atlas
1. Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create database user with read/write permissions
4. Add IP whitelist (0.0.0.0/0 for Vercel or specific IPs)
5. Get connection string and add to MONGODB_URI

### Step 6: Configure Email Service
For Gmail:
1. Enable 2-factor authentication
2. Generate App Password: Account > Security > App Passwords
3. Use the generated password in EMAIL_PASS

### Step 7: Redeploy
1. Go to Deployments tab in Vercel
2. Click "Redeploy" on the latest deployment
3. Your app should now deploy successfully

### Step 8: Initial Data Setup
1. Access your deployed app
2. Create the first admin user via MongoDB directly or API
3. Login and start importing student data

## Custom Domain Setup (Optional)
1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Update NEXTAUTH_URL to your custom domain

## Production Optimizations

### Database Indexing
Add these indexes to your MongoDB collections for better performance:

```javascript
// Students collection
db.students.createIndex({ "studentId": 1 })
db.students.createIndex({ "riskLevel": 1, "course": 1 })
db.students.createIndex({ "mentorId": 1 })

// Attendance collection
db.attendances.createIndex({ "studentId": 1, "year": -1, "month": -1 })

// Assessments collection
db.assessments.createIndex({ "studentId": 1, "submissionDate": -1 })

// Fee Payments collection
db.feepayments.createIndex({ "studentId": 1, "status": 1 })
```

### Environment Variables for Production
```env
# Production MongoDB with connection pooling
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority&maxPoolSize=20

# Strong secret for production
NEXTAUTH_SECRET=use-openssl-rand-base64-32-to-generate-this

# Production URL
NEXTAUTH_URL=https://yourdomain.com

# Production email service
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com
```

## Monitoring and Maintenance

### Vercel Analytics
- Enable Vercel Analytics in your dashboard
- Monitor performance and usage metrics
- Set up alerts for errors and downtime

### Database Monitoring
- Use MongoDB Atlas monitoring tools
- Set up alerts for high usage or errors
- Regular backup schedule

### Security Considerations
- Regularly rotate API keys and secrets
- Monitor authentication logs
- Keep dependencies updated
- Use environment-specific configurations

## Troubleshooting Common Issues

### Build Errors
- Check Node.js version compatibility (18+)
- Verify all dependencies are installed
- Review TypeScript errors in build logs

### Runtime Errors
- Check environment variables are set correctly
- Verify MongoDB connection string and network access
- Test email configuration with a simple send

### Performance Issues
- Enable Vercel Edge Caching
- Optimize database queries with proper indexing
- Use image optimization for uploads

## Scaling Considerations

### For Large Institutions
- Consider MongoDB sharding for large datasets
- Implement Redis caching for frequently accessed data
- Use Vercel Pro for better performance guarantees
- Set up CDN for static assets

### Multi-tenant Setup
- Implement organization-level data separation
- Use subdomain routing for different institutions
- Configure organization-specific email settings

## Support and Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [NextAuth.js Documentation](https://next-auth.js.org)