'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, ChevronRight } from 'lucide-react';

export default function QuizTaking({ 
  questions, 
  currentIndex, 
  onSubmitAnswer 
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSubmit = async () => {
    if (!selectedAnswer) return;
    
    setSubmitting(true);
    await onSubmitAnswer(selectedAnswer);
    setSubmitting(false);
    setSelectedAnswer(null);
  };

  if (!currentQuestion) return null;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-start mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {currentQuestion.questionNumber}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 ml-4">
            {currentQuestion.questionText}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              className={`w-full p-4 rounded-xl border-2 text-left transition ${
                selectedAnswer === option
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 bg-white'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                  selectedAnswer === option
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === option && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || submitting}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : currentIndex < questions.length - 1 ? (
            <>
              Next Question
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          ) : (
            'Finish Quiz'
          )}
        </button>
      </div>
    </div>
  );
}