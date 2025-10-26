'use client';

import { BookOpen, Brain, ChevronRight } from 'lucide-react';

export default function SummaryView({ summary, onStartQuiz }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {summary.title}
            </h1>
            <p className="text-sm text-gray-500">
              {formatDate(summary.createdAt)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-lg">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="prose max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {summary.content}
          </div>
        </div>
      </div>

      <button
        onClick={onStartQuiz}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center group"
      >
        <Brain className="w-6 h-6 mr-2" />
        Take Quiz
        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
      </button>
    </div>
  );
}