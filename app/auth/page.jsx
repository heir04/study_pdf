'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, ArrowLeft, CheckCircle } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import Navbar from '@/components/shared/Navbar';
export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [success, setSuccess] = useState('');

  const handleLoginSuccess = (user) => {
    router.push('/dashboard');
  };

  const handleRegisterSuccess = () => {
    setSuccess('Registration successful! Please login.');
    setMode('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full">
          <button 
            onClick={() => router.push('/')} 
            className="mb-6 text-gray-600 hover:text-gray-900 flex items-center group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition" />
            Back to home
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-green-600">{success}</span>
              </div>
            )}

            {mode === 'login' ? (
              <LoginForm
                onSuccess={handleLoginSuccess}
                onSwitchToRegister={() => {
                  setMode('register');
                  setSuccess('');
                }}
              />
            ) : (
              <RegisterForm
                onSuccess={handleRegisterSuccess}
                onSwitchToLogin={() => {
                  setMode('login');
                  setSuccess('');
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}