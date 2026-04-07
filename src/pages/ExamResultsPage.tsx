import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, BarChart3, ArrowRight, Download } from 'lucide-react';
import { mockExamQuestions } from '../lib/mockData';

interface ResultsState {
  answers: Record<string, string>;
  totalQuestions: number;
  timeSpent: number;
}

/**
 * Exam Results Page Component
 * Displays score, pass/fail status, and diagnostic breakdown
 */
const ExamResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [score, setScore] = useState(0);
  const [topicScores, setTopicScores] = useState<Record<string, { correct: number; total: number }>>({});

  useEffect(() => {
    const state = location.state as ResultsState;
    if (!state) {
      navigate('/dashboard');
      return;
    }

    // Calculate score
    let correctCount = 0;
    const questionTopics: Record<string, { correct: number; total: number }> = {};

    mockExamQuestions.forEach(question => {
      const questionId = question.id;
      const userAnswer = state.answers[questionId];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) correctCount++;

      if (!questionTopics[question.topic]) {
        questionTopics[question.topic] = { correct: 0, total: 0 };
      }
      questionTopics[question.topic].total += 1;
      if (isCorrect) {
        questionTopics[question.topic].correct += 1;
      }
    });

    const scorePercentage = Math.round((correctCount / mockExamQuestions.length) * 100);
    setScore(scorePercentage);
    setTopicScores(questionTopics);
  }, [location.state, navigate]);

  const isPassed = score >= 70;
  const timeSpent = location.state?.timeSpent || 0;
  const timeSpentMinutes = Math.round(timeSpent / 60000);
  const hours = Math.floor(timeSpentMinutes / 60);
  const minutes = timeSpentMinutes % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Result Card */}
        <div className={`bg-white rounded-lg shadow-xl p-12 mb-8 border-t-4 ${
          isPassed ? 'border-green-500' : 'border-red-500'
        }`}>
          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            {isPassed ? (
              <CheckCircle size={80} className="text-green-500 animate-bounce" />
            ) : (
              <XCircle size={80} className="text-red-500" />
            )}
          </div>

          {/* Score */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-2">
              <span className={isPassed ? 'text-green-600' : 'text-red-600'}>
                {score}%
              </span>
            </h1>
            <p className={`text-2xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
              {isPassed ? 'PASS' : 'FAIL'}
            </p>
          </div>

          {/* Score Bar */}
          <div className="mb-8">
            <div className="w-full bg-slate-200 rounded-full h-6">
              <div
                className={`h-6 rounded-full transition-all ${
                  isPassed ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-slate-600 mt-2">
              <span>0%</span>
              <span>Passing Score: 70%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-6">
            {isPassed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-green-900 font-medium">
                  Congratulations! You have successfully passed the exam. 
                  You are eligible for professional licensure.
                </p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-900 font-medium">
                  Unfortunately, you did not meet the passing score on this attempt. 
                  Review your performance below and try again.
                </p>
              </div>
            )}
          </div>

          {/* Test Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{score}%</p>
              <p className="text-sm text-slate-600">Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{Math.round((score / 100) * 80)}/80</p>
              <p className="text-sm text-slate-600">Correct Answers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{hours}h {minutes}m</p>
              <p className="text-sm text-slate-600">Time Used</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{480 - timeSpentMinutes}m</p>
              <p className="text-sm text-slate-600">Time Remaining</p>
            </div>
          </div>
        </div>

        {/* Topic Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-primary-600" size={28} />
            <h2 className="text-2xl font-bold text-slate-900">Performance by Topic</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(topicScores).map(([topic, scores]) => {
              const percentage = Math.round((scores.correct / scores.total) * 100);
              return (
                <div key={topic}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-900">{topic}</span>
                    <span className="text-sm font-semibold text-slate-600">
                      {scores.correct}/{scores.total} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        percentage >= 70 ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 flex-1 bg-white border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition"
          >
            <Download size={20} />
            Download Report
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Back to Dashboard
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">Next Steps</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            {isPassed ? (
              <>
                <li>✓ Your exam results will be reported to the licensing board</li>
                <li>✓ Professional licensure certificates will be mailed within 2-4 weeks</li>
                <li>✓ You can download your official score report above</li>
              </>
            ) : (
              <>
                <li>→ Review the topics where you scored below 70%</li>
                <li>→ Take additional practice exams to strengthen weak areas</li>
                <li>→ Schedule your next exam attempt</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExamResultsPage;
