# NCEES Engineering Exam Platform - MVP

A professional, computer-based testing (CBT) platform for PE/FE engineering licensure exam preparation, built with React, TypeScript, and Firebase.

## 🎯 Project Overview

This is a **production-ready MVP** that simulates the NCEES exam environment with:

- **Professional CBT Interface** - Realistic exam experience with 80-question exams
- **Real-time Timer** - 8-hour countdown with visual warnings
- **Comprehensive Analytics** - Topic-based performance breakdown
- **User Authentication** - Secure login and registration with Firebase
- **Candidate Dashboard** - Exam status, scheduling, and progress tracking
- **Reference Materials** - Toggle-able reference handbook during exams
- **Responsive Design** - Desktop-first, mobile-friendly interface

## 🏗️ Architecture

### Project Structure

```
src/
├── components/
│   ├── Exam/                    # Exam interface components
│   │   ├── ExamTimer.tsx        # Countdown timer with warnings
│   │   ├── QuestionPanel.tsx    # Question display and answering
│   │   ├── NavigationPanel.tsx  # 80-question navigation grid
│   │   ├── ExamControls.tsx     # Previous/Next/Submit buttons
│   │   └── ReferenceHandbook.tsx # Toggleable reference material
│   ├── NavBar.tsx               # Navigation bar with auth
│   ├── Footer.tsx               # Footer with links and info
│   └── ProtectedRoute.tsx       # Route guard for authenticated pages
├── contexts/
│   ├── AuthContext.tsx          # Firebase authentication management
│   └── ExamContext.tsx          # Exam state management (answers, flags, progress)
├── pages/
│   ├── LandingPage.tsx          # Home page with hero section
│   ├── LoginPage.tsx            # User login form
│   ├── RegisterPage.tsx         # User registration form
│   ├── DashboardPage.tsx        # Candidate profile and exam launch
│   ├── ExamsPage.tsx            # Available exams listing
│   ├── PracticePage.tsx         # Practice exam information
│   ├── ExamPage.tsx             # Main exam interface
│   └── ExamResultsPage.tsx      # Score and results display
├── lib/
│   ├── firebase.ts              # Firebase configuration and initialization
│   └── mockData.ts              # Sample exam questions (80-question set)
├── contexts/
│   ├── AuthContext.tsx
│   └── ExamContext.tsx
├── App.tsx                      # Main app with routing
├── main.tsx                     # React entry point
└── index.css                    # Global styles and Tailwind setup
```

### Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3 |
| **Icons** | Lucide React |
| **Routing** | React Router v6 |
| **Authentication** | Firebase Auth |
| **Database** | Firestore (configured) |
| **State Management** | React Context API |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase project (free tier available at console.firebase.google.com)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Firebase:**
   - Create a new project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your config from Project Settings

3. **Configure environment variables:**
   Create a `.env.local` file in the project root:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### Running the Application

**Development server:**
```bash
npm run dev
```
Server runs on `http://localhost:5173`

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## 📖 Features Documentation

### 1. Authentication System

**Login & Registration:**
- Email-based authentication via Firebase
- Password validation (minimum 6 characters)
- Error handling for existing emails and invalid credentials
- Demo login helper for testing

**Protected Routes:**
- Dashboard, Exam, and Results pages require authentication
- Automatic redirect to login for unauthenticated users
- User context available throughout app

### 2. Exam Interface (Core Feature)

**Question Panel (Left Side):**
- Current question number and text
- Radio button options (A, B, C, D)
- Answer selection tracking
- Flag for review functionality
- Answer status indicator

**Navigation Panel (Right Side):**
- 10x8 grid of 80 question buttons
- Color-coded status indicators:
  - White: Unanswered
  - Green: Answered
  - Yellow: Flagged for review
  - Blue: Currently viewing
- Progress summary (answered count, flagged count)
- Legend showing status meanings

**Timer & Controls:**
- 8-hour countdown (480 minutes)
- Visual warning at <15 minutes remaining
- Previous/Next question navigation
- Submit Exam button with answer count display
- Validation warning if submitting incomplete exam

**Reference Handbook:**
- Floating button (bottom-right)
- Modal popup with sample reference materials
- Includes hydraulics formulas, hydrology concepts, unit conversions
- Toggleable during exam (like real NCEES exam)

### 3. Results & Analytics

**Score Display:**
- Pass/Fail status (70% passing score)
- Visual score bar
- Detailed performance metrics

**Topic Breakdown:**
- Performance by topic with percentage bars
- Correct/total questions per topic
- Color-coded performance levels

**Statistics:**
- Overall score percentage
- Correct answers count
- Time spent and remaining
- Next steps recommendations

### 4. Candidate Dashboard

**Application Status:**
- Exam type selection
- Application status (Approved/Pending/Scheduled)
- Scheduled exam date countdown
- Important notices

**Progress Tracking:**
- Completed practice exams counter
- Average score across attempts
- Total study time
- Progress bar to target completion

**Quick Links & Resources:**
- Exam specifications
- Reference handbook
- Study guide
- FAQ and support

## 🎨 Design System

### Color Palette

- **Primary Blue**: `#3b82f6` - Main actions and highlights
- **Slate Gray**: `#334155` - Text and neutral elements
- **Green**: `#22c55e` - Success and correct answers
- **Red**: `#ef4444` - Errors and incorrect answers
- **Yellow**: `#eab308` - Warnings and flagged questions

### Responsive Breakpoints

- Mobile-first approach
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Navigation panel hidden on mobile (< lg screens)
- Full-width exam on tablets

## 💾 State Management

### AuthContext
Manages:
- Current authenticated user
- Loading state during auth checks
- Logout functionality

### ExamContext
Manages:
- User answers (question_id -> answer)
- Flagged questions set
- Current question index
- Exam start/end times
- Progress calculation

## 🔧 Configuration & Customization

### Adding Exam Questions

Edit `src/lib/mockData.ts`:
```typescript
interface ExamQuestion {
  id: string;
  number: number;
  text: string;
  options: { A: string; B: string; C: string; D: string; };
  correctAnswer: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
```

### Changing Passing Score

In `ExamResultsPage.tsx`:
```typescript
const isPassed = score >= 70; // Change 70 to desired percentage
```

### Customizing Exam Duration

In `ExamPage.tsx`:
```typescript
<ExamTimer totalMinutes={480} /> // Change 480 (8 hours) as needed
```

## 🔐 Security Considerations

### Current Implementation
- Firebase authentication handles password hashing
- Environment variables for sensitive config
- Protected routes prevent unauthenticated access
- HTTPS enforced in production

### Production Recommendations
1. **Firebase Security Rules:**
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth.uid == userId;
       }
       match /results/{resultId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

2. **Enable CORS** - Configure allowed origins in Firebase
3. **Rate Limiting** - Implement on authentication endpoints
4. **Input Validation** - Sanitize all user inputs server-side

## 📊 Future Enhancements (Scalability)

### Phase 2 Features
- [ ] **Question Randomization** - Shuffle question order per exam
- [ ] **Timed Breaks** - Mandatory breaks matching real NCEES exam
- [ ] **Payment Integration** - Stripe/PayPal for premium exams
- [ ] **Admin Panel** - Upload and manage exam questions
- [ ] **Analytics Dashboard** - Track user statistics and trends
- [ ] **Export Results** - PDF report generation
- [ ] **Question Explanations** - Detailed explanations for each question
- [ ] **Spaced Repetition** - Adaptive learning algorithm

### Phase 3 Architecture
- [ ] **Exam Bank Management** - 1000+ questions per discipline
- [ ] **AI-Powered Analytics** - Predict passing probability
- [ ] **Leaderboards** - Competitive exam statistics
- [ ] **Study Groups** - Collaborative features
- [ ] **Mobile App** - Native iOS/Android apps
- [ ] **Multi-language Support** - Internationalization

### Database Structure (Future)
```
/exams/{examType}
  /questions/{questionId}
    - text
    - options
    - correctAnswer
    - topic
    - difficulty
    
/users/{userId}
  - email
  - name
  - createdAt
  - examAttempts

/results/{resultId}
  - userId
  - examType
  - score
  - answers
  - timeSpent
  - timestamp
```

## 🧪 Testing Credentials

**Demo Account:**
- Email: `demo@example.com`
- Password: `demo123456`

Or create a new account via the registration page.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This is an MVP with a modular structure designed for easy expansion:

1. Components are self-contained and reusable
2. Contexts manage global state cleanly
3. Pages are minimal and delegate to components
4. Mock data is easily replaceable with API calls

## 📝 License

This project is created as a professional engineering exam preparation platform. All content is for educational purposes.

## ⚠️ Disclaimer

This platform is **not affiliated with or endorsed by NCEES**. NCEES is a registered trademark. The exam content and structure are educational simulations based on publicly available exam specifications.

## 📞 Support & Documentation

For questions or issues:
- Check the code comments throughout the project
- Review component prop types in TypeScript
- Refer to this README for architecture overview

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Status:** MVP Ready for Production
