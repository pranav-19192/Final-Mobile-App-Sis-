
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [method, setMethod] = useState<'Email' | 'OTP'>('Email');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleManualLogin = () => {
    // Simulating a success for any non-empty email
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${email}&background=8B5CF6&color=fff`
    };
    onLogin(mockUser);
  };

  const handleGoogleLogin = () => {
    // Simulating Google OAuth redirect and callback
    const mockGoogleUser: User = {
      id: 'google_12345',
      name: 'Debosmita Sharma',
      email: 'debosmita.travels@gmail.com',
      avatar: 'https://picsum.photos/seed/debosmita/100/100'
    };
    onLogin(mockGoogleUser);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] px-8 pt-8 flex flex-col">
      <div className="mb-12">
        <button onClick={onBack} className="p-3 bg-white rounded-full shadow-md border border-gray-50 text-gray-800 active:scale-90 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <p className="text-center font-extrabold uppercase tracking-widest text-[10px] text-gray-400 mt-[-32px]">Sign In</p>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-[#1A1A1A] mb-3">Welcome Back</h1>
        <p className="text-gray-400 font-medium">Connect and manage your trips</p>
      </div>

      <div className="flex border-b border-gray-100 mb-10">
        <button onClick={() => setMethod('Email')} className={`flex-1 pb-4 text-sm font-bold transition-all ${method === 'Email' ? 'text-violet-500 border-b-2 border-violet-500' : 'text-gray-400'}`}>Email</button>
        <button onClick={() => setMethod('OTP')} className={`flex-1 pb-4 text-sm font-bold transition-all ${method === 'OTP' ? 'text-violet-500 border-b-2 border-violet-500' : 'text-gray-400'}`}>Mobile OTP</button>
      </div>

      <div className="space-y-6 mb-8">
        {method === 'Email' ? (
          <>
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2.5 ml-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-[#F8F9FE] px-6 py-4 rounded-2xl text-sm font-semibold outline-none border border-transparent focus:border-violet-100 focus:bg-white transition-all text-[#1A1A1A]" />
            </div>
            <div className="relative">
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2.5 ml-1">Password</label>
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-[#F8F9FE] px-6 py-4 rounded-2xl text-sm font-semibold outline-none border border-transparent focus:border-violet-100 focus:bg-white transition-all text-[#1A1A1A]" />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-bold text-[#1A1A1A] mb-2.5 ml-1">Phone Number</label>
            <div className="flex gap-2">
              <div className="bg-[#F8F9FE] px-4 py-4 rounded-2xl text-sm font-bold border border-transparent text-[#1A1A1A]">+91</div>
              <input type="tel" placeholder="9876543210" className="flex-1 bg-[#F8F9FE] px-6 py-4 rounded-2xl text-sm font-semibold outline-none border border-transparent focus:border-violet-100 focus:bg-white transition-all text-[#1A1A1A]" />
            </div>
          </div>
        )}
      </div>

      <button onClick={handleManualLogin} className="w-full bg-violet-500 text-white py-5 rounded-[22px] font-bold text-lg shadow-xl shadow-violet-200 hover:bg-violet-600 active:scale-95 transition-all">
        {method === 'Email' ? 'Sign In' : (otpSent ? 'Verify & Login' : 'Send OTP')}
      </button>

      <div className="flex items-center gap-4 my-10 px-2">
        <div className="flex-1 h-px bg-gray-100"></div>
        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Or continue with</span>
        <div className="flex-1 h-px bg-gray-100"></div>
      </div>

      <button onClick={handleGoogleLogin} className="w-full bg-white border border-gray-100 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-[#1A1A1A] hover:bg-gray-50 active:scale-95 transition-all shadow-sm">
        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-6 h-6" />
        Google Sign-In
      </button>
    </div>
  );
};

export default Login;
