'use client';

import { FileText, Clock, ChevronRight } from 'lucide-react';

export default function SummaryCard({ summary, onClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-lg group-hover:scale-110 transition">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {summary.title}
      </h3>
      
      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
        {summary.content.substring(0, 150)}...
      </p>
      
      <div className="flex items-center text-xs text-gray-500">
        <Clock className="w-4 h-4 mr-1" />
        {formatDate(summary.createdAt)}
      </div>
    </div>
  );
}