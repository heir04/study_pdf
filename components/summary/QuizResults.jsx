'use client';

import { Award, CheckCircle, XCircle } from 'lucide-react';

export default function QuizResults({ 
  quizSummary, 
  questions, 
  onBackToSummary, 
  onRetakeQuiz 
}) {
  const percentage = Math.round((quizSummary.score / quizSummary.totalQuestions) * 100);

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="text-center">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <div className="text-6xl font-bold mb-4">
            {quizSummary.score}/{quizSummary.totalQuestions}
          </div>
          <p className="text-blue-100 text-lg">
            You got {percentage}% correct
          </p>
        </div>
      </div>

      {/* Review Questions */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Review Your Answers
        </h3>
        
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <div className="flex items-start mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${
                  question.isAnsweredCorrectly ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {index + 1}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-lg font-semibold text-gray-900 mb-3">
                    {question.questionText}
                  </p>

                  {/* User's Answer */}
                  <div className={`p-3 rounded-lg mb-2 ${
                    question.isAnsweredCorrectly ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Your answer: {question.userAnswer}
                      </span>
                      {question.isAnsweredCorrectly ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </div>

                  {/* Correct Answer (if wrong) */}
                  {!question.isAnsweredCorrectly && (
                    <div className="p-3 rounded-lg bg-green-50 mb-3">
                      <span className="text-sm font-medium text-green-700">
                        Correct answer: {question.answer}
                      </span>
                    </div>
                  )}

                  {/* Explanation */}
                  {question.explanation && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Explanation:
                      </p>
                      <p className="text-sm text-blue-800">
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBackToSummary}
          className="flex-1 bg-white text-gray-900 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-600 transition"
        >
          Back to Summary
        </button>
        <button
          onClick={onRetakeQuiz}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}