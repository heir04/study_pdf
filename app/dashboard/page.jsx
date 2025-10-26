'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Loader2, BookOpen, Clock, ChevronRight, FileText, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import Navbar from '@/components/shared/Navbar';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    // Check auth
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!storedToken || !storedUser) {
      router.push('/auth');
      return;
    }

    setToken(storedToken);
    setUser(JSON.parse(storedUser));
    loadSummaries(storedToken);
  }, [router]);

  const loadSummaries = async (authToken) => {
    try {
      const result = await api.getAllSummaries(authToken);
      if (result.status) {
        setSummaries(result.data || []);
      }
    } catch (err) {
      console.error('Failed to load summaries');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    if (file.type !== 'application/pdf') {
      setUploadError('Please upload a PDF file');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const result = await api.createSummary(file, token);
      if (result.status) {
        await loadSummaries(token);
        e.target.value = '';
      } else {
        setUploadError(result.message);
      }
    } catch (err) {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar userEmail={user.email} showAuth />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Study Materials</h1>
          <p className="text-gray-600">Upload PDFs and generate AI-powered summaries and quizzes</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-dashed border-gray-300 hover:border-blue-500 transition">
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
                    This may take a few moments
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
                </>
              )}
              {uploadError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center space-x-2 max-w-md mx-auto">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-sm text-red-600">{uploadError}</span>
                </div>
              )}
            </div>
          </label>
        </div>

        {/* Summaries Grid */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 text-blue-600 mx-auto animate-spin" />
            <p className="mt-4 text-gray-600">Loading your summaries...</p>
          </div>
        ) : summaries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No summaries yet</h3>
            <p className="text-gray-500">Upload your first PDF to get started!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map((summary) => (
              <div
                key={summary.id}
                onClick={() => router.push(`/summary/${summary.id}`)}
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
                  {summary.content.substring(0, 120)}...
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDate(summary.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}