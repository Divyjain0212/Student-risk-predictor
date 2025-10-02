# EduSense - Student Success Platform

A comprehensive student management and support system designed to enhance educational outcomes through intelligent monitoring, gamified engagement, and proactive intervention support. Built with Next.js 14 and optimized for modern educational institutions.

## Features

### 🎯 Core Dashboard & Analytics
- **Intelligent Student Dashboard**: Personalized view with academic progress, attendance tracking, and achievement system
- **Gamified Attendance System**: Level-based progression with XP rewards and achievement badges
- **Real-time Notifications**: Comprehensive notification system with bell icon dropdown and dedicated notifications page
- **Quick Access Features**: Streamlined navigation to key student services and support resources
- **Performance Analytics**: Visual charts and progress tracking for academic and attendance metrics

### 🏆 Gamification & Engagement
- **Level Progression System**: Students earn XP for attendance and academic achievements
- **Achievement Badges**: Unlock badges for study streaks, perfect attendance, and academic milestones
- **Progress Visualization**: Interactive charts showing attendance trends and academic performance
- **Motivational Feedback**: Positive reinforcement through achievements and progress celebrations

### 🚨 Crisis Support & Intervention
- **Immediate Help Widget**: 24/7 access to crisis support with real helpline numbers
- **Crisis Helpline**: Direct access to National Suicide Prevention Lifeline (1-800-273-8255)
- **Live Chat Support**: Real-time crisis intervention chat with trained counselors
- **Emergency Resources**: Quick access to mental health resources and emergency contacts
- **Email Support**: crisis@edusense.edu for non-urgent mental health support

### � Academic Management
- **Assignment Tracking**: Monitor due dates, submission status, and academic deadlines
- **Grade Management**: View test results, academic progress, and improvement opportunities
- **Study Materials**: Access to course materials, resources, and supplementary content
- **Academic Support**: Integrated tools for academic assistance and tutoring resources

### 💬 Communication & Notifications
- **Smart Notification System**: Categorized notifications (reminders, achievements, alerts, info)
- **Bell Icon Integration**: Real-time notification count with dropdown preview
- **Notification Management**: Mark as read/unread, priority filtering, and bulk actions
- **Email Integration**: Automated email notifications for important updates and deadlines
- **Mobile Responsive**: All notification features optimized for mobile devices

### 🔐 Authentication & Security
- **Role-based Access Control**: Student, Teacher, Admin, and Counselor roles
- **Secure Authentication**: NextAuth.js with credential-based login system
- **Session Management**: Secure session handling with automatic timeout
- **Data Protection**: Secure handling of student data and privacy compliance

## Technology Stack

### Backend
- **Framework**: Next.js 14 with App Router and TypeScript
- **Database**: MongoDB with Mongoose ODM for data management
- **Authentication**: NextAuth.js with secure credential provider
- **Email Service**: Nodemailer for automated notification delivery
- **API Routes**: RESTful API endpoints for all application functionality

### Frontend
- **UI Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design and modern aesthetics
- **Icons**: Lucide React for consistent and modern iconography
- **Components**: Reusable component architecture with proper state management
- **Responsive Design**: Mobile-first approach with full responsive support

### Features & Integrations
- **Notification System**: React Context-based notification management
- **Crisis Support**: Integrated mental health and crisis intervention tools
- **Gamification**: Level progression and achievement tracking system
- **Charts & Analytics**: Visual progress tracking and performance metrics
- **File Management**: Support for document uploads and academic resources

### Development & Deployment
- **Platform**: Optimized for Vercel deployment with serverless functions
- **Database Hosting**: MongoDB Atlas for cloud database management
- **Environment Configuration**: Secure environment variable management
- **Performance**: Optimized loading with compression and bundle splitting

## Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn package manager
- MongoDB database (local installation or MongoDB Atlas)
- Email service credentials for notifications (Gmail/SMTP)

### Installation

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd SIH2
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local` file:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edusense
   
   # Authentication
   NEXTAUTH_SECRET=your-secure-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   
   # Email Service (for notifications)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@edusense.edu
   
   # Crisis Support (optional)
   CRISIS_EMAIL=crisis@edusense.edu
   ```

3. **Database Setup**
   ```bash
   # Seed the database with initial user data
   npm run seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Default Login Credentials
After seeding the database, you can use these test accounts:
- **Student**: john.doe@student.edu / password123
- **Teacher**: jane.smith@teacher.edu / password123
- **Admin**: admin@edusense.edu / admin123
- **Counselor**: counselor@edusense.edu / password123

## Deployment to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/edusense)

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Configure Environment Variables in Vercel Dashboard**
   Set these environment variables in your Vercel project settings:
   - `MONGODB_URI` - Your MongoDB connection string
   - `NEXTAUTH_SECRET` - Secure random string for authentication
   - `NEXTAUTH_URL` - Your production domain (e.g., https://edusense.vercel.app)
   - `EMAIL_HOST` - SMTP server host
   - `EMAIL_PORT` - SMTP server port (usually 587)
   - `EMAIL_USER` - Your email username
   - `EMAIL_PASS` - Your email app password
   - `EMAIL_FROM` - From email address for notifications
   - `CRISIS_EMAIL` - Crisis support email address

## User Guide

### 1. Getting Started
- Log in with your assigned credentials (student, teacher, admin, or counselor)
- Complete your profile setup and preferences
- Explore the dashboard to familiarize yourself with available features

### 2. For Students
- **Dashboard**: View your academic progress, attendance levels, and achievements
- **Attendance Manager**: Track your attendance and earn XP for consistent participation
- **Notifications**: Stay updated with assignment deadlines, achievements, and important announcements
- **Crisis Support**: Access immediate help resources when needed
- **Quick Access**: Navigate easily to assignments, grades, and support services

### 3. For Teachers
- **Student Overview**: Monitor student progress and attendance patterns
- **Assignment Management**: Create and track assignment submissions
- **Communication**: Send notifications and updates to students
- **Crisis Intervention**: Access tools to support students in need

### 4. For Administrators
- **System Management**: Oversee platform usage and user management
- **Analytics**: View institution-wide performance metrics
- **Configuration**: Manage system settings and notification preferences

### 5. For Counselors
- **Student Support**: Access student profiles and intervention tools
- **Crisis Management**: Respond to crisis alerts and provide support
- **Resource Management**: Maintain and update support resources

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/signin` - User authentication and login
- `GET /api/auth/session` - Retrieve current user session
- `POST /api/auth/signout` - User logout and session termination

### Student Management
- `GET /api/students` - List students with filtering options
- `GET /api/students/[id]` - Get detailed student profile
- `PUT /api/students/[id]` - Update student information
- `POST /api/students/attendance` - Record attendance data

### Notifications
- `GET /api/notifications` - Retrieve user notifications
- `POST /api/notifications` - Create new notification
- `PUT /api/notifications/[id]` - Mark notification as read
- `DELETE /api/notifications/[id]` - Delete notification

### Crisis Support
- `POST /api/crisis/report` - Report crisis situation
- `GET /api/crisis/resources` - Get crisis support resources
- `POST /api/crisis/chat` - Initiate crisis chat session

## Data Schema

### User Account
```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john.doe@student.edu",
  "role": "student",
  "studentId": "STU001",
  "department": "Computer Science",
  "year": 2,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Student Progress
```json
{
  "studentId": "STU001",
  "attendance": {
    "level": 5,
    "xp": 150,
    "percentage": 85.5,
    "streak": 7
  },
  "academic": {
    "gpa": 3.8,
    "assignments": 15,
    "submitted": 14
  },
  "achievements": [
    {
      "id": "perfect_week",
      "name": "Perfect Week",
      "description": "100% attendance for one week",
      "earnedAt": "2024-01-15T00:00:00Z"
    }
  ]
}
```

### Notification
```json
{
  "id": "notif_123",
  "userId": "user_123",
  "title": "Assignment Due Tomorrow",
  "message": "Mathematics Assignment #5 is due tomorrow",
  "type": "reminder",
  "priority": "high",
  "read": false,
  "actionUrl": "/assignments/123",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Key Features

### 🔔 Comprehensive Notification System
- **Bell Icon Integration**: Real-time notification count with dropdown preview
- **Notification Types**: Reminders, achievements, alerts, info, success messages, and warnings
- **Smart Management**: Mark as read/unread, priority filtering, bulk actions
- **Mobile Responsive**: Optimized for all device sizes
- **Action Integration**: Direct navigation to relevant pages from notifications

### 🏆 Gamified Learning Experience
- **Level Progression**: Earn XP for attendance and academic achievements
- **Achievement System**: Unlock badges for study streaks, perfect attendance, and milestones
- **Visual Progress**: Interactive charts and progress bars
- **Motivational Feedback**: Celebrate student accomplishments and progress

### 🚨 Comprehensive Crisis Support
- **24/7 Helpline**: Direct access to National Suicide Prevention Lifeline (1-800-273-8255)
- **Live Chat Support**: Real-time crisis intervention with trained counselors
- **Email Support**: crisis@edusense.edu for non-urgent mental health assistance
- **Emergency Resources**: Quick access to mental health resources and emergency contacts
- **Immediate Help Widget**: Always-accessible SOS button for crisis situations

### 📊 Advanced Analytics & Tracking
- **Attendance Analytics**: Level-based progression with detailed XP tracking
- **Academic Progress**: Grade tracking, assignment monitoring, and performance trends
- **Visual Dashboards**: Interactive charts and progress visualizations
- **Historical Data**: Track improvements and identify patterns over time

## Security & Privacy

### Data Protection
- **Secure Authentication**: NextAuth.js with bcrypt password hashing
- **Role-based Access**: Student, Teacher, Admin, and Counselor permission levels
- **Session Security**: Automatic timeout and secure session management
- **Input Validation**: Comprehensive data sanitization and validation
- **Privacy Compliance**: FERPA-compliant student data handling

### Infrastructure Security
- **Environment Variables**: Secure configuration management
- **Database Security**: MongoDB authentication and encrypted connections
- **API Security**: Protected endpoints with authentication middleware
- **HTTPS Enforcement**: Secure data transmission in production

## Performance & Optimization

### Frontend Optimization
- **Next.js 14**: Latest App Router with automatic code splitting
- **Bundle Optimization**: Efficient loading with dynamic imports
- **Image Optimization**: Automatic image compression and lazy loading
- **Responsive Design**: Mobile-first approach with optimal performance

### Backend Performance
- **Serverless Functions**: Vercel edge computing for global performance
- **Database Optimization**: Efficient MongoDB queries with proper indexing
- **Caching Strategies**: API response caching and static generation
- **Compression**: Gzip compression for faster data transfer

## Accessibility & Usability

### User Experience
- **Intuitive Interface**: Clean, modern design with clear navigation
- **Mobile Responsive**: Full functionality across all device sizes
- **Fast Loading**: Optimized performance for quick page loads
- **Clear Feedback**: Visual indicators and confirmation messages

### Accessibility Features
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility support
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Clear focus indicators and logical tab order

## Contributing

We welcome contributions to EduSense! Please follow these guidelines:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/your-username/edusense
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-new-feature
   ```

3. **Development Guidelines**
   - Follow TypeScript best practices
   - Write clear, descriptive commit messages
   - Add tests for new functionality
   - Ensure responsive design compliance
   - Follow existing code style and conventions

4. **Commit and Push**
   ```bash
   git commit -m 'Add amazing new feature: detailed description'
   git push origin feature/amazing-new-feature
   ```

5. **Submit Pull Request**
   - Provide clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues
   - Ensure all tests pass

### Development Standards
- **Code Quality**: ESLint and TypeScript strict mode
- **Testing**: Write unit tests for new components
- **Documentation**: Update README and inline comments
- **Accessibility**: Ensure WCAG compliance
- **Performance**: Optimize for loading speed and responsiveness

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❗ License and copyright notice required

## Support & Community

### Getting Help
- 📧 **Email Support**: support@edusense.edu
- 📚 **Documentation**: [docs.edusense.edu](https://docs.edusense.edu)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-username/edusense/issues)
- � **Feature Requests**: [GitHub Discussions](https://github.com/your-username/edusense/discussions)

### Crisis Support Resources
- 🆘 **National Suicide Prevention Lifeline**: 1-800-273-8255
- 💬 **Crisis Text Line**: Text HOME to 741741
- 🌐 **Mental Health Resources**: [mentalhealth.gov](https://mentalhealth.gov)
- 📧 **Crisis Email Support**: crisis@edusense.edu

### Community Guidelines
- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Report issues responsibly
- Contribute to documentation

## Acknowledgments

### Built For Education
- 🎓 **Educational Institutions**: Designed to improve student success and engagement
- 👨‍🏫 **Educators**: Tools to support student monitoring and intervention
- 👩‍🎓 **Students**: Gamified learning experience with comprehensive support
- 🧠 **Mental Health**: Proactive crisis intervention and support resources

### Technology Partners
- **Next.js Team**: For the amazing React framework
- **Vercel**: For seamless deployment and hosting
- **MongoDB**: For reliable database services
- **Tailwind CSS**: For beautiful, responsive design
- **Lucide Icons**: For consistent, modern iconography

### Research & Inspiration
- Educational psychology research on student engagement
- Gamification studies in educational contexts
- Crisis intervention best practices in educational settings
- Accessibility standards and inclusive design principles

---

**EduSense** - Empowering educational success through intelligent student support and engagement.

*Last updated: October 2025*