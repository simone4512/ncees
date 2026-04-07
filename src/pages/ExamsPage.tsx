import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Users, Award, ArrowRight } from 'lucide-react';

/**
 * Exams Page Component
 * Lists available exam types and specifications
 */
const ExamsPage: React.FC = () => {
  const exams = [
    {
      id: 1,
      title: 'PE Water Resources',
      duration: '8 hours',
      questions: 80,
      cost: '$399',
      description: 'Professional Engineer (PE) exam for Water Resources specialists',
      topics: ['Hydraulics', 'Hydrology', 'Water Quality', 'Infrastructure'],
    },
    {
      id: 2,
      title: 'PE Structural',
      duration: '8 hours',
      questions: 80,
      cost: '$399',
      description: 'Professional Engineer (PE) exam for Structural specialists',
      topics: ['Steel Design', 'Concrete', 'Foundations', 'Analysis'],
    },
    {
      id: 3,
      title: 'FE General (Fundamentals)',
      duration: '5.5 hours',
      questions: 110,
      cost: '$199',
      description: 'Fundamentals of Engineering (FE) exam - general discipline',
      topics: ['Math', 'Physics', 'Chemistry', 'Engineering Principles'],
    },
    {
      id: 4,
      title: 'PE Civil',
      duration: '8 hours',
      questions: 80,
      cost: '$399',
      description: 'Professional Engineer (PE) exam for Civil Engineering',
      topics: ['Transportation', 'Water Resources', 'Geotechnical', 'Structures'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Available Exams</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose from our selection of professional engineering exams with realistic practice environments
          </p>
        </div>

        {/* Exam Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{exam.title}</h2>
                  <p className="text-slate-600 text-sm mt-1">{exam.description}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-200">
                <div className="text-center">
                  <Clock className="text-primary-600 mx-auto mb-2" size={24} />
                  <p className="text-sm font-semibold text-slate-900">{exam.duration}</p>
                  <p className="text-xs text-slate-600">Duration</p>
                </div>
                <div className="text-center">
                  <BookOpen className="text-primary-600 mx-auto mb-2" size={24} />
                  <p className="text-sm font-semibold text-slate-900">{exam.questions}</p>
                  <p className="text-xs text-slate-600">Questions</p>
                </div>
                <div className="text-center">
                  <Award className="text-primary-600 mx-auto mb-2" size={24} />
                  <p className="text-sm font-semibold text-slate-900">{exam.cost}</p>
                  <p className="text-xs text-slate-600">Price</p>
                </div>
              </div>

              {/* Topics */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-900 mb-2">Key Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {exam.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                to="/practice"
                className="inline-flex items-center justify-center gap-2 w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                Practice Exam
                <ArrowRight size={20} />
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Exam FAQs</h2>
          <div className="space-y-6">
            {[
              {
                q: 'How are these exams structured?',
                a: 'Our exams follow the official NCEES structure with 80 questions (PE exams) or 110 questions (FE exams). Practice exams are fully timed and simulate real exam conditions.',
              },
              {
                q: 'What is the passing score?',
                a: 'The passing score is 70% for all PE exams. FE exams use a different scoring methodology based on topic competency.',
              },
              {
                q: 'Can I retake practice exams?',
                a: 'Yes, you can take unlimited practice exams. We recommend taking multiple exams to build confidence and identify weak areas.',
              },
              {
                q: 'Is a reference handbook provided?',
                a: 'Yes, a reference handbook is available during exams, just like the actual NCEES CBT exam environment.',
              },
            ].map((faq, index) => (
              <div key={index}>
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;
