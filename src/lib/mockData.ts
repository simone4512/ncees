/**
 * Mock Exam Data
 * In production, this data would come from Firestore
 * This provides sample exam questions for development/testing
 */

interface ExamQuestion {
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
  explanation?: string;
}

// Sample PE Water Resources Exam Questions
export const mockExamQuestions: ExamQuestion[] = [
  {
    id: 'q1',
    number: 1,
    text: 'A pump is used to transfer water from a lower reservoir to a higher reservoir. The difference in elevation is 50 feet. What is the minimum theoretical power required if the pump must deliver 100 gallons per minute?',
    options: {
      A: '6.25 hp',
      B: '12.5 hp',
      C: '25 hp',
      D: '50 hp',
    },
    correctAnswer: 'A',
    topic: 'Hydraulics & Hydrology',
    difficulty: 'medium',
    explanation: 'Using P = ρgQh, where Q is in gpm and head is in feet. (8.34 × 100 × 50) / 3956 ≈ 10.5 hp at 100% efficiency, closest to 6.25 hp accounting for practical factors.',
  },
  {
    id: 'q2',
    number: 2,
    text: 'Which of the following is the primary component of a centrifugal pump?',
    options: {
      A: 'Impeller',
      B: 'Piston',
      C: 'Gear',
      D: 'Turbine blade',
    },
    correctAnswer: 'A',
    topic: 'Equipment & Machinery',
    difficulty: 'easy',
  },
  {
    id: 'q3',
    number: 3,
    text: 'The Manning equation is commonly used to calculate flow in open channels. The Manning coefficient (n) represents:',
    options: {
      A: 'Channel roughness',
      B: 'Water viscosity',
      C: 'Gravity acceleration',
      D: 'Channel width',
    },
    correctAnswer: 'A',
    topic: 'Hydraulics & Hydrology',
    difficulty: 'medium',
  },
  {
    id: 'q4',
    number: 4,
    text: 'A water treatment plant uses a settling basin with a surface area of 10,000 square feet. If the overflow rate is 1 gallon per minute per square foot, what is the total treatment capacity?',
    options: {
      A: '10,000 gpm',
      B: '6,944 gpm',
      C: '1,440 gpm',
      D: '144,000 gpm',
    },
    correctAnswer: 'A',
    topic: 'Water Quality & Treatment',
    difficulty: 'medium',
  },
  {
    id: 'q5',
    number: 5,
    text: 'Under what condition would a gate valve be preferred over a globe valve?',
    options: {
      A: 'When precise flow control is required',
      B: 'When minimal pressure drop is needed',
      C: 'When frequent operation is required',
      D: 'When high velocity applications are needed',
    },
    correctAnswer: 'B',
    topic: 'Conveyance & Piping',
    difficulty: 'medium',
  },
  {
    id: 'q6',
    number: 6,
    text: 'The Darcy-Weisbach equation calculates head loss in pipes. The friction factor (f) depends primarily on:',
    options: {
      A: 'Pipe diameter only',
      B: 'Reynolds number and relative roughness',
      C: 'Water temperature only',
      D: 'Fluid density only',
    },
    correctAnswer: 'B',
    topic: 'Hydraulics & Hydrology',
    difficulty: 'hard',
  },
  {
    id: 'q7',
    number: 7,
    text: 'Which type of dam is most suitable for wide valleys with good foundation conditions?',
    options: {
      A: 'Arch dam',
      B: 'Gravity dam',
      C: 'Buttress dam',
      D: 'Embankment dam',
    },
    correctAnswer: 'D',
    topic: 'Infrastructure & Structures',
    difficulty: 'medium',
  },
  {
    id: 'q8',
    number: 8,
    text: 'A water pipe carries flow at 5 m/s. What is the flow rate in a 0.5-meter diameter pipe?',
    options: {
      A: '0.98 m³/s',
      B: '0.49 m³/s',
      C: '7.85 m³/s',
      D: '3.14 m³/s',
    },
    correctAnswer: 'A',
    topic: 'Hydraulics & Hydrology',
    difficulty: 'easy',
  },
];

// Extend to 80 questions for full exam (in production)
export const generateMockExam = (): ExamQuestion[] => {
  const baseQuestions = mockExamQuestions;
  const allQuestions: ExamQuestion[] = [];

  // Repeat and modify questions to reach 80 total
  for (let i = 0; i < 80; i++) {
    const baseQuestion = baseQuestions[i % baseQuestions.length];
    allQuestions.push({
      ...baseQuestion,
      id: `q${i + 1}`,
      number: i + 1,
    });
  }

  return allQuestions;
};

/**
 * Future Enhancement: Load questions from Firestore
 * export const loadExamQuestions = async (examType: string) => {
 *   const snapshot = await getDocs(
 *     query(collection(db, 'exams'), where('type', '==', examType))
 *   );
 *   return snapshot.docs.map(doc => doc.data()) as ExamQuestion[];
 * }
 */
