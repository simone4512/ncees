import React, { useState } from 'react';
import { useExam } from '../../contexts/ExamContext';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';

interface NavigationPanelProps {
  totalQuestions: number;
  onQuestionSelect: (index: number) => void;
}

/**
 * Navigation Panel Component
 * 80-question navigation grid with status indicators
 * Shows answered, flagged, and unanswered questions
 */
const NavigationPanel: React.FC<NavigationPanelProps> = ({
  totalQuestions,
  onQuestionSelect,
}) => {
  const { examState } = useExam();
  const [isExpanded, setIsExpanded] = useState(true);
  const currentQuestion = examState.currentQuestionIndex;

  const getQuestionStatus = (index: number) => {
    const questionId = `q${index + 1}`;
    const isAnswered = questionId in examState.answers;
    const isFlagged = examState.flaggedQuestions.has(questionId);

    return { isAnswered, isFlagged };
  };

  // Create grid of question numbers (10x8 for 80 questions)
  const rows = Math.ceil(totalQuestions / 10);

  return (
    <div className="flex flex-col h-full bg-white border-l border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <h3 className="font-bold text-slate-900">Questions</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-slate-100 rounded transition"
        >
          {isExpanded ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Grid */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }).map((_, colIndex) => {
                  const questionIndex = rowIndex * 10 + colIndex;
                  if (questionIndex >= totalQuestions) return null;

                  const { isAnswered, isFlagged } = getQuestionStatus(questionIndex);
                  const isCurrentQuestion = questionIndex === currentQuestion;
                  const questionNumber = questionIndex + 1;

                  return (
                    <button
                      key={questionIndex}
                      onClick={() => onQuestionSelect(questionIndex)}
                      className={`relative h-10 rounded font-semibold text-sm transition border-2 ${
                        isCurrentQuestion
                          ? 'border-primary-600 bg-primary-600 text-white'
                          : isAnswered && isFlagged
                          ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                          : isAnswered
                          ? 'border-green-400 bg-green-50 text-green-700'
                          : isFlagged
                          ? 'border-yellow-300 bg-yellow-100 text-yellow-700'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                      title={`Question ${questionNumber}${isFlagged ? ' (Flagged)' : ''}${isAnswered ? ' (Answered)' : ''}`}
                    >
                      {questionNumber}
                      {isFlagged && (
                        <Flag
                          size={10}
                          fill="currentColor"
                          className="absolute top-0 right-0"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border-2 border-slate-300 rounded"></div>
              <span className="text-slate-600">Not answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-50 border-2 border-green-400 rounded"></div>
              <span className="text-slate-600">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-400 rounded relative">
                <Flag size={8} fill="currentColor" className="absolute -top-1 -right-1" />
              </div>
              <span className="text-slate-600">Flagged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary-600 border-2 border-primary-600 rounded"></div>
              <span className="text-slate-600">Current</span>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Answered:</span>
                <span className="font-semibold text-slate-900">
                  {Object.keys(examState.answers).length} / 80
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Flagged:</span>
                <span className="font-semibold text-slate-900">
                  {examState.flaggedQuestions.size}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationPanel;
