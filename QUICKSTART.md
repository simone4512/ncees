# Quick Start Guide - NCEES Exam Platform MVP

## 🚀 Before You Begin

**System Requirements:**
- Windows 10+ / macOS 10.13+ / Linux (Ubuntu 18+)
- Node.js 18+ LTS ([Download](https://nodejs.org/))
- npm 9+ (comes with Node.js)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## ⚙️ Installation Steps

### Step 1: Install Node.js

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow the prompts
4. **Restart your terminal/PowerShell** after installation

### Step 2: Verify Installation

Open a **new** terminal/PowerShell window and run:

```bash
node --version
npm --version
```

You should see version numbers (e.g., `v18.17.0` and `9.6.7`)

### Step 3: Navigate to Project

```bash
cd "c:\Users\SMARTLAND GADGETS\Desktop\NCEES.org"
```

### Step 4: Install Dependencies

```bash
npm install
```

This downloads all required packages (~500MB). Wait for completion.

### Step 5: Set Up Firebase (Important!)

1. **Create Firebase Project:**
   - Visit [Firebase Console](https://console.firebase.google.com)
   - Create new project named `ncees-exam-platform`
   - Enable Authentication (Email/Password provider)
   - Create Firestore Database in test mode

2. **Get Firebase Credentials:**
   - Go to Project Settings → Your Apps → Web
   - Copy your configuration

3. **Create `.env.local` file** in project root:
   ```
   VITE_FIREBASE_API_KEY=YOUR_API_KEY_HERE
   VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
   VITE_FIREBASE_APP_ID=YOUR_APP_ID
   ```

### Step 6: Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 7: Open in Browser

Click the link or visit: **http://localhost:5173**

## 📱 Testing the Application

### Create a Test Account

1. Click **"Register"** in the navigation bar
2. Enter any email (e.g., `test@example.com`)
3. Enter password (minimum 6 characters)
4. Click **"Create Account"**

### Take a Practice Exam

1. Go to **Dashboard** (you're auto-logged in)
2. Click **"Launch Exam"** button
3. Answer questions, flag for review, navigate with grid
4. Click **"Submit Exam"** when done
5. View your results and performance breakdown

## 🛠️ Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint
```

## 📁 Project Structure at a Glance

```
NCEES.org/
├── src/
│   ├── pages/          # Full page components
│   ├── components/     # Reusable components
│   ├── contexts/       # State management
│   ├── lib/           # Utilities and Firebase
│   ├── App.tsx        # Main app + routing
│   └── index.css      # Styles
├── package.json       # Dependencies
├── vite.config.ts     # Build config
├── tailwind.config.js # Styling config
├── README.md          # Full documentation
├── SETUP.md           # Detailed setup guide
└── QUICKSTART.md      # This file
```

## 🔑 Key Features to Explore

### 1. **Landing Page** (`/`)
   - Professional hero section
   - Feature overview
   - Call-to-action buttons

### 2. **Login & Register** (`/login`, `/register`)
   - Email-based authentication
   - Password validation
   - Error handling

### 3. **Dashboard** (`/dashboard`)
   - Candidate profile
   - Exam status
   - Progress tracking
   - Launch exam button

### 4. **Exam Interface** (`/exam`)
   - 80 questions with timer
   - Question navigation grid
   - Flag for review
   - Reference handbook toggle
   - Real-time progress

### 5. **Results** (`/exam-results`)
   - Score and pass/fail status
   - Topic-by-topic breakdown
   - Performance analytics
   - Download report

### 6. **Exams & Practice** (`/exams`, `/practice`)
   - Exam listings
   - Feature descriptions
   - FAQs

## 🐛 Troubleshooting

### "npm is not recognized"
- **Solution:** Node.js not installed or terminal not restarted
- Reinstall Node.js and **restart your terminal**

### "Vite cannot find modules"
- **Solution:** Run `npm install` again
- Delete `node_modules` folder and reinstall

### "Firebase is not configured"
- **Solution:** Add `.env.local` with Firebase credentials
- The app provides mock Firebase credentials by default

### Port 5173 already in use
- **Solution:** Kill process or use different port
  ```bash
  npm run dev -- --port 5174
  ```

### CSS/Styling not working
- **Solution:** Tailwind CSS not initialized
- Run `npm install` and restart dev server

## 📚 Learning Resources

- **React:** [react.dev](https://react.dev)
- **TypeScript:** [typescriptlang.org](https://www.typescriptlang.org)
- **Vite:** [vitejs.dev](https://vitejs.dev)
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com)
- **Firebase:** [firebase.google.com](https://firebase.google.com/docs)

## 🎯 Next Steps After Setup

1. **Customize Branding**
   - Edit logo in `NavBar.tsx`
   - Change colors in `tailwind.config.js`
   - Update exam names in `mockData.ts`

2. **Add Real Questions**
   - Replace mock questions in `src/lib/mockData.ts`
   - Each question needs: text, options, correctAnswer, topic

3. **Connect to Firestore**
   - Implement data loading from Firestore
   - Store exam results and user profiles
   - See `SETUP.md` for database structure

4. **Deploy to Production**
   - Run `npm run build`
   - Deploy to Firebase Hosting or Vercel
   - See `SETUP.md` for deployment instructions

## 💡 Pro Tips

- **Development Mode:** Use `npm run dev` with hot reload while coding
- **Mobile Testing:** Open `http://localhost:5173` on phone (same network)
- **React DevTools:** Install React DevTools extension for browser
- **Check Console:** Press F12 to see any JavaScript errors

## 📞 Need Help?

1. **Check the code comments** - Every component has detailed comments
2. **Read `README.md`** - Comprehensive documentation
3. **Check `SETUP.md`** - Detailed setup and deployment guide
4. **Review TypeScript types** - Hover over variables in VS Code

## ✅ Success Checklist

- [ ] Node.js 18+ installed
- [ ] `npm install` completed successfully
- [ ] `.env.local` file created with Firebase credentials
- [ ] `npm run dev` starts without errors
- [ ] Browser opens to http://localhost:5173
- [ ] Landing page loads with navigation
- [ ] Can register and login
- [ ] Can launch practice exam
- [ ] Can view results page

---

**Once all steps are complete, your NCEES Exam Platform MVP is ready to use! 🎉**

For production deployment, see `SETUP.md` for Firebase Hosting or other deployment options.
