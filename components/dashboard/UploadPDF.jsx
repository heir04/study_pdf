'use client';

import { useState } from 'react';
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';

export default function UploadPDF({ token, onSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const result = await api.createSummary(file, token);
      if (result.status) {
        onSuccess();
        e.target.value = ''; // Reset file input
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-300 hover:border-blue-500 transition">
      <label className="cursor-pointer block">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
        <div className="text-center">
          {uploading ? (
            <>
              <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Processing your PDF...
              </h3>
              <p className="text-gray-600">
                AI is generating summary and quiz questions
              </p>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Upload a PDF
              </h3>
              <p className="text-gray-600">
                Click to browse or drag and drop your study material
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Maximum file size: 10MB
              </p>
            </>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center space-x-2 max-w-md mx-auto">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}