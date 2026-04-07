import React from 'react';
import { useExam } from '../../contexts/ExamContext';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

interface ExamControlsProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

/**
 * Exam Controls Component
 * Navigation buttons (Previous/Next) and Submit Exam button
 * Located at the bottom of the exam interface
 */
const ExamControls: React.FC<ExamControlsProps> = ({
  currentQuestionIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const { examState } = useExam();

  return (
    <div className="bg-white border-t border-slate-200 p-4 flex items-center justify-between">
      {/* Left: Navigation Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <div className="text-sm font-medium text-slate-600 px-4 py-2">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>

        <button
          onClick={onNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
          className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Right: Submit Button */}
      <button
        onClick={onSubmit}
        className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold"
      >
        <Send size={20} />
        Submit Exam ({Object.keys(examState.answers).length} answered)
      </button>
    </div>
  );
};

export default ExamControls;
