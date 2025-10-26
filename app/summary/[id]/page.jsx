'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Loader2, BookOpen, Brain, Award, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { api } from '@/lib/api';
import Navbar from '@/components/shared/Navbar';

export default function SummaryPage() {
  const router = useRouter();
  const params = useParams();
  const summaryId = params.id;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [summary, setSummary] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizSummary, setQuizSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('summary');
  const [submitting, setSubmitting] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!storedToken || !storedUser) {
      router.push('/auth');
      return;
    }

    setToken(storedToken);
    setUser(JSON.parse(storedUser));
    loadSummary(storedToken);
  }, [summaryId, router]);

  const loadSummary = async (authToken) => {
    try {
      const result = await api.getSummary(summaryId, authToken);
      if (result.status && result.data) {
        setSummary(result.data);
      }
    } catch (err) {
      console.error('Failed to load summary');
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const result = await api.getQuizQuestions(summaryId, token);
      if (result.status && result.data) {
        setQuestions(result.data);
        setViewMode('quiz');
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
      }
    } catch (err) {
      console.error('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!token || !selectedAnswer || !questions[currentQuestionIndex]) return;
    
    setSubmitting(true);
    try {
      await api.submitAnswer(questions[currentQuestionIndex].id, selectedAnswer, token);
      
      // Move to next question or finish
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz completed, load results
        await loadQuizResults();
      }
    } catch (err) {
      console.error('Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  const loadQuizResults = async () => {
    if (!token || questions.length === 0) return;
    
    setLoading(true);
    try {
      const quizId = questions[0].quizId;
      
      // Get quiz summary
      const summaryResult = await api.getQuizSummary(quizId, token);
      if (summaryResult.status && summaryResult.data) {
        setQuizSummary(summaryResult.data);
      }
      
      // Get questions with answers
      const questionsResult = await api.getQuestionsWithAnswers(quizId, token);
      if (questionsResult.status && questionsResult.data) {
        setQuestions(questionsResult.data);
      }
      
      setViewMode('results');
    } catch (err) {
      console.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <p className="text-gray-600">Summary not found</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Go back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar userEmail={user.email} showAuth />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/dashboard')}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition" />
          Back to dashboard
        </button>

        {/* Summary View */}
        {viewMode === 'summary' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{summary.title}</h1>
                  <p className="text-sm text-gray-500">
                    {new Date(summary.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
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
              onClick={startQuiz}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center group"
            >
              <Brain className="w-6 h-6 mr-2" />
              Take Quiz
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
            </button>
          </div>
        )}

        {/* Quiz Taking View */}
{/* Quiz Taking View */}
        {viewMode === 'quiz' && currentQuestion && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
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
                onClick={submitAnswer}
                disabled={!selectedAnswer || submitting}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : currentQuestionIndex < questions.length - 1 ? (
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
        )}

        {/* Results View */}
        {viewMode === 'results' && quizSummary && (
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
                  You got {Math.round((quizSummary.score / quizSummary.totalQuestions) * 100)}% correct
                </p>
              </div>
            </div>

            {/* Review Questions */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Review Your Answers</h3>
              
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div
                    key={question.id || index}
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
                onClick={() => setViewMode('summary')}
                className="flex-1 bg-white text-gray-900 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-600 transition"
              >
                Back to Summary
              </button>
              <button
                onClick={startQuiz}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}