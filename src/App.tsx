import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ExamProvider } from './contexts/ExamContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Page imports
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ExamsPage from './pages/ExamsPage';
import PracticePage from './pages/PracticePage';
import ExamPage from './pages/ExamPage';
import ExamResultsPage from './pages/ExamResultsPage';

import './index.css';
import ContactPage from './pages/contact';

/**
 * Main App Component
 * Sets up routing, authentication context, and exam context
 * All pages are wrapped with necessary providers
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <ExamProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />

            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/exams" element={<ExamPage />} />
                <Route path="/practice" element={<PracticePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <DashboardPage />
                  }
                />
                <Route
                  path="/exam"
                  element={
                    <ProtectedRoute>
                      <ExamPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/exam-results"
                  element={
                    <ProtectedRoute>
                      <ExamResultsPage />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </ExamProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
