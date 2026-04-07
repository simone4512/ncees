import React, { createContext, useContext, useState } from 'react';

/**
 * Exam Question interface
 * Represents a single exam question with answers
 */
interface Question {
  id: string;
  number: number;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ExamState {
  answers: Record<string, string>; // question_id -> answer (A, B, C, D)
  flaggedQuestions: Set<string>; // question_ids flagged for review
  currentQuestionIndex: number;
  startTime: number;
  endTime: number | null;
}

interface ExamContextType {
  examState: ExamState;
  setAnswer: (questionId: string, answer: string) => void;
  toggleFlag: (questionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  submitExam: () => void;
  resetExam: () => void;
  getProgress: () => number;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [examState, setExamState] = useState<ExamState>({
    answers: {},
    flaggedQuestions: new Set(),
    currentQuestionIndex: 0,
    startTime: Date.now(),
    endTime: null,
  });

  const setAnswer = (questionId: string, answer: string) => {
    setExamState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  };

  const toggleFlag = (questionId: string) => {
    setExamState(prev => {
      const newFlagged = new Set(prev.flaggedQuestions);
      if (newFlagged.has(questionId)) {
        newFlagged.delete(questionId);
      } else {
        newFlagged.add(questionId);
      }
      return {
        ...prev,
        flaggedQuestions: newFlagged,
      };
    });
  };

  const nextQuestion = () => {
    setExamState(prev => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, 79), // 80 questions total
    }));
  };

  const previousQuestion = () => {
    setExamState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0),
    }));
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < 80) {
      setExamState(prev => ({
        ...prev,
        currentQuestionIndex: index,
      }));
    }
  };

  const submitExam = () => {
    setExamState(prev => ({
      ...prev,
      endTime: Date.now(),
    }));
  };

  const resetExam = () => {
    setExamState({
      answers: {},
      flaggedQuestions: new Set(),
      currentQuestionIndex: 0,
      startTime: Date.now(),
      endTime: null,
    });
  };

  const getProgress = () => {
    const answeredCount = Object.keys(examState.answers).length;
    return Math.round((answeredCount / 80) * 100);
  };

  return (
    <ExamContext.Provider
      value={{
        examState,
        setAnswer,
        toggleFlag,
        nextQuestion,
        previousQuestion,
        goToQuestion,
        submitExam,
        resetExam,
        getProgress,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};
