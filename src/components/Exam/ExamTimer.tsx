import React, { useState, useEffect } from 'react';
import { useExam } from '../../contexts/ExamContext';
import { Clock, AlertCircle } from 'lucide-react';

interface ExamTimerProps {
  totalMinutes: number;
  onTimeUp?: () => void;
}

/**
 * Countdown Timer Component
 * Displays time remaining in exam with visual warnings
 */
const ExamTimer: React.FC<ExamTimerProps> = ({ totalMinutes, onTimeUp }) => {
  const [timeRemaining, setTimeRemaining] = useState(totalMinutes * 60); // in seconds
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp?.();
          return 0;
        }
        const newTime = prev - 1;
        // Warning when less than 15 minutes
        setIsWarning(newTime < 15 * 60);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold transition ${
        isWarning
          ? 'bg-red-100 text-red-700 border border-red-300'
          : 'bg-slate-100 text-slate-900 border border-slate-300'
      }`}
    >
      <Clock size={20} />
      <span>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </span>
      {isWarning && <AlertCircle size={20} className="ml-2 animate-pulse" />}
    </div>
  );
};

export default ExamTimer;
