"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Sparkles, Brain, CheckCircle, ArrowRight, Menu, X, Upload, Zap, BarChart } from 'lucide-react';

export default function StudyPDFLanding() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                StudyPDF
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">How It Works</a>
              <button 
                onClick={() => router.push('/auth')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition transform hover:scale-105"
              >
                Try Free
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-700 hover:text-blue-600">Features</a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600">How It Works</a>
              <button 
                onClick={() => router.push('/auth')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full"
              >
                Try Free
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">AI-Powered PDF Learning</span>
            </div>
             */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Upload PDF.<br/>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Get Smart Summaries & Quizzes.
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Turn any PDF into bite-sized summaries and interactive quizzes. Study smarter, not harder — powered by AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={() => router.push('/auth')}
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105"
              >
                Upload Your First PDF
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Instant Results</span>
              </div>
            </div>

            {/* Visual Demo */}
            <div className="mt-16 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">1. Upload PDF</h3>
                    <p className="text-sm text-gray-600">Drop your study material</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                    <Sparkles className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">2. AI Analyzes</h3>
                    <p className="text-sm text-gray-600">Extracts key concepts</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">3. Study & Quiz</h3>
                    <p className="text-sm text-gray-600">Learn efficiently</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Study Better
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Two powerful features that transform how you learn from PDFs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-10 rounded-3xl hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Smart Summaries</h3>
              <p className="text-gray-600 text-lg mb-6">
                AI reads through your entire PDF and creates clear, concise summaries highlighting the most important points. Perfect for quick revision.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Extracts key concepts and main ideas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Organized into digestible sections</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Save hours of reading time</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-indigo-50 to-purple-50 p-10 rounded-3xl hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <BarChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Interactive Quizzes</h3>
              <p className="text-gray-600 text-lg mb-6">
                Auto-generated quizzes test your understanding. Take them in-app and get instant results with detailed explanations for every answer.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Multiple-choice questions from content</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Instant grading with score breakdown</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Detailed explanations for each answer</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quiz Results Preview */}
          <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center">
              <Brain className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Learn from Every Quiz</h3>
              <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                Our AI doesn't just grade you — it teaches you. Get comprehensive explanations for correct and incorrect answers, helping you truly understand the material.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-blue-100">Instant Feedback</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-4xl font-bold mb-2">∞</div>
                  <div className="text-blue-100">Unlimited Retakes</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-4xl font-bold mb-2">📊</div>
                  <div className="text-blue-100">Progress Tracking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple. Fast. Effective.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start studying smarter in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-xl transform hover:scale-110 transition">
                  <Upload className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload Your PDF</h3>
              <p className="text-gray-600 text-lg">
                Drag and drop or select your study material. We support PDFs of any size — textbooks, lecture notes, research papers.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-xl transform hover:scale-110 transition">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-indigo-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Generates Content</h3>
              <p className="text-gray-600 text-lg">
                Our AI analyzes the document, identifies key concepts, and creates summaries and quiz questions in seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-xl transform hover:scale-110 transition">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Study & Test</h3>
              <p className="text-gray-600 text-lg">
                Review summaries, take quizzes in-app, and get instant feedback with explanations to reinforce your learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Study Smarter?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join students who are already learning faster with AI-powered summaries and quizzes.
          </p>
          <button 
            onClick={() => router.push('/auth')}
            className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-5 rounded-full text-xl font-semibold hover:shadow-2xl transition transform hover:scale-105"
          >
            Get Started — It's Free
            <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition" />
          </button>
          <p className="mt-6 text-sm text-gray-500">
            Works on any device • Unlimited PDFs
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">StudyPDF</span>
              </div>
              <p className="text-gray-400">
                AI-powered PDF learning assistant for smarter studying.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 StudyPDF. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}