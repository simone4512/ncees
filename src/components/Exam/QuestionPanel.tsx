import React from 'react';
import { useExam } from '../../contexts/ExamContext';
import { Flag, FlagOff } from 'lucide-react';

interface QuestionPanelProps {
  questions: Array<{
    id: string;
    number: number;
    text: string;
    options: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
  }>;
  currentQuestionIndex: number;
}

/**
 * Question Panel Component
 * Displays the current question and answer options
 * Allows for flagging questions for review
 */
const QuestionPanel: React.FC<QuestionPanelProps> = ({ questions, currentQuestionIndex }) => {
  const { examState, setAnswer, toggleFlag } = useExam();
  const question = questions[currentQuestionIndex];
  const selectedAnswer = examState.answers[question.id];
  const isFlagged = examState.flaggedQuestions.has(question.id);

  return (
    <div className="flex flex-col h-full">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-sm font-semibold text-slate-600 mb-1">
            Question {question.number} of 80
          </h3>
          <h2 className="text-lg font-bold text-slate-900">
            {question.text}
          </h2>
        </div>
        <button
          onClick={() => toggleFlag(question.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            isFlagged
              ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
              : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
          }`}
        >
          {isFlagged ? (
            <>
              <Flag size={18} fill="currentColor" />
              <span className="text-sm font-medium">Flagged</span>
            </>
          ) : (
            <>
              <FlagOff size={18} />
              <span className="text-sm font-medium">Flag</span>
            </>
          )}
        </button>
      </div>

      {/* Answer Options */}
      <div className="flex-1 space-y-3">
        {Object.entries(question.options).map(([letter, text]) => (
          <label
            key={letter}
            className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition"
            style={{
              borderColor: selectedAnswer === letter ? '#3b82f6' : '#e2e8f0',
              backgroundColor: selectedAnswer === letter ? '#eff6ff' : 'white',
            }}
          >
            {/* Radio Button */}
            <div className="flex items-center mt-1">
              <input
                type="radio"
                name="answer"
                value={letter}
                checked={selectedAnswer === letter}
                onChange={() => setAnswer(question.id, letter)}
                className="w-5 h-5 cursor-pointer accent-primary-600"
              />
            </div>

            {/* Answer Text */}
            <div className="flex-1">
              <div className="font-semibold text-slate-900">
                {letter}.
              </div>
              <div className="text-slate-700 mt-1">
                {text}
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Answer Status Indicator */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        {selectedAnswer ? (
          <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Answer selected: {selectedAnswer}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-2 rounded-lg">
            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
            <span className="text-sm font-medium">No answer selected</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPanel;
