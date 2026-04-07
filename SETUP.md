# Environment Setup Guide

## Firebase Configuration

### Step 1: Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com)
2. Click "Create a new project"
3. Enter project name: `ncees-exam-platform`
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Select **Email/Password** provider
4. Toggle "Email/Password" to **Enabled**
5. Save changes

### Step 3: Create Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Select **Start in test mode** (for development)
4. Choose a region (recommended: `us-east1`)
5. Create database

### Step 4: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Under "Your apps", click the **Web** icon
3. Register app with name "NCEES Exam"
4. Copy the configuration object

### Step 5: Set Environment Variables

Create `.env.local` in project root:

```env
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=ncees-exam-platform.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ncees-exam-platform
VITE_FIREBASE_STORAGE_BUCKET=ncees-exam-platform.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abc...
```

## Development Setup

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Server runs at `http://localhost:5173`

### Hot Module Replacement

Changes auto-reload in browser without full page refresh.

## Production Deployment

### Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder.

### Deploy to Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login:
   ```bash
   firebase login
   ```

3. Initialize Firebase in project:
   ```bash
   firebase init hosting
   ```

4. When prompted:
   - Select your Firebase project
   - Set public directory to `dist`
   - Configure as single-page app: **Yes**

5. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

### Production Checklist

- [ ] Set up proper Firebase Security Rules
- [ ] Enable HTTPS only
- [ ] Configure CORS if using API
- [ ] Set up rate limiting on auth endpoints
- [ ] Enable Firebase backup
- [ ] Monitor usage in Firebase Console
- [ ] Set up billing alerts
- [ ] Test authentication flows
- [ ] Verify environment variables are set
- [ ] Test on multiple browsers

## Database Security Rules

For production, use restrictive rules in `Firestore Rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles - only readable/writable by owner
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Exam results - writable by authenticated users, readable by owner
    match /results/{resultId} {
      allow create, update: if request.auth != null;
      allow read: if request.auth.uid == resource.data.userId;
    }
    
    // Exam questions - read-only for authenticated users
    match /exams/{examId}/questions/{questionId} {
      allow read: if request.auth != null;
    }
  }
}
```

## Troubleshooting

### Firebase Connection Issues

**Error: "Firebase config is invalid"**
- Verify all environment variables in `.env.local`
- Check API key is enabled in Google Cloud Console
- Ensure web domain is authorized in Firebase

**Error: "Quota exceeded"**
- Check Firebase billing
- Review Firestore read/write operations
- Consider upgrading plan if necessary

### Build Issues

**"Module not found" errors**
- Run `npm install` to ensure all dependencies installed
- Delete `node_modules` and `package-lock.json`, reinstall
- Check Node.js version (18+ required)

**CSS not loading**
- Verify Tailwind CSS is configured in `tailwind.config.js`
- Check `postcss.config.js` exists
- Clear browser cache and rebuild

## Docker Deployment (Optional)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

Build and run:
```bash
docker build -t ncees-exam-app .
docker run -p 3000:3000 ncees-exam-app
```

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          # ... other secrets
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: ncees-exam-platform
```

---

For more help, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
