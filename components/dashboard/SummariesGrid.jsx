'use client';

import { BookOpen } from 'lucide-react';
import SummaryCard from './SummaryCard';

export default function SummariesGrid({ summaries, onSummaryClick }) {
  if (summaries.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No summaries yet
        </h3>
        <p className="text-gray-500">
          Upload your first PDF to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {summaries.map((summary) => (
        <SummaryCard
          key={summary.id}
          summary={summary}
          onClick={() => onSummaryClick(summary.id)}
        />
      ))}
    </div>
  );
}