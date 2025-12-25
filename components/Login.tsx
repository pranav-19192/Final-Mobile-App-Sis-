
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
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleManualLogin = () => {
    setError('');
    
    if (method === 'Email') {
      if (!email.trim()) {
        setError("Please enter your email");
        return;
      }
      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      setIsLoggingIn(true);
      
      // Simulate a brief network delay for UX
      setTimeout(() => {
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email: email,
          avatar: `https://ui-avatars.com/api/?name=${email}&background=8B5CF6&color=fff`
        };
        onLogin(mockUser);
        setIsLoggingIn(false);
      }, 800);

    } else {
      // OTP logic
      if (!otpSent) {
        setOtpSent(true);
        // In a real app, this would trigger an SMS API
      } else {
        setIsLoggingIn(true);
        setTimeout(() => {
          const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: "Mobile User",
            email: "mobile@travelease.com",
            avatar: `https://ui-avatars.com/api/?name=Mobile&background=8B5CF6&color=fff`
          };
          onLogin(mockUser);
          setIsLoggingIn(false);
        }, 800);
      }
    }
  };

  const handleGoogleLogin = () => {
    const mockGoogleUser: User = {
      id: 'google_12345',
      name: 'Debosmita Sharma',
      email: 'debosmita.travels@gmail.com',
      avatar: 'https://picsum.photos/seed/debosmita/100/100'
    };
    onLogin(mockGoogleUser);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] px-8 pt-8 flex flex-col pb-10">
      <div className="mb-12">
        <button 
          type="button"
          onClick={onBack} 
          className="p-3 bg-white rounded-full shadow-md border border-gray-50 text-gray-800 active:scale-90 transition-all"
        >
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
        <button 
          type="button"
          onClick={() => { setMethod('Email'); setError(''); }} 
          className={`flex-1 pb-4 text-sm font-bold transition-all ${method === 'Email' ? 'text-violet-500 border-b-2 border-violet-500' : 'text-gray-400'}`}
        >
          Email
        </button>
        <button 
          type="button"
          onClick={() => { setMethod('OTP'); setError(''); }} 
          className={`flex-1 pb-4 text-sm font-bold transition-all ${method === 'OTP' ? 'text-violet-500 border-b-2 border-violet-500' : 'text-gray-400'}`}
        >
          Mobile OTP
        </button>
      </div>

      <div className="space-y-6 mb-8">
        {method === 'Email' ? (
          <>
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2.5 ml-1">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => { setEmail(e.target.value); setError(''); }} 
                placeholder="name@example.com" 
                className="w-full bg-[#F8F9FE] px-6 py-4 rounded-2xl text-sm font-semibold outline-none border border-transparent focus:border-violet-100 focus:bg-white transition-all text-[#1A1A1A]" 
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2.5 ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••" 
                  className="w-full bg-[#F8F9FE] px-6 py-4 rounded-2xl text-sm font-semibold outline-none border border-transparent focus:border-violet-100 focus:bg-white transition-all text-[#1A1A1A]" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"} />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-bold text-[#1A1A1A] mb-2.5 ml-1">Phone Number</label>
            <div className="flex gap-2">
              <div className="bg-[#F8F9FE] px-4 py-4 rounded-2xl text-sm font-bold border border-transparent text-[#1A1A1A]">+91</div>
              <input 
                type="tel" 
                placeholder="9876543210" 
                className="flex-1 bg-[#F8F9FE] px-6 py-4 rounded-2xl text-sm font-semibold outline-none border border-transparent focus:border-violet-100 focus:bg-white transition-all text-[#1A1A1A]" 
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-pink-50 text-pink-500 px-6 py-4 rounded-2xl text-xs font-bold mb-6 flex items-center gap-3 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <button 
        type="button"
        onClick={handleManualLogin} 
        disabled={isLoggingIn}
        className={`w-full text-white py-5 rounded-[22px] font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${isLoggingIn ? 'bg-violet-400 cursor-not-allowed' : 'bg-violet-500 shadow-violet-200 hover:bg-violet-600 active:scale-95'}`}
      >
        {isLoggingIn ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing In...
          </>
        ) : (
          method === 'Email' ? 'Sign In' : (otpSent ? 'Verify & Login' : 'Send OTP')
        )}
      </button>

      <div className="flex items-center gap-4 my-10 px-2">
        <div className="flex-1 h-px bg-gray-100"></div>
        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Or continue with</span>
        <div className="flex-1 h-px bg-gray-100"></div>
      </div>

      <button 
        type="button"
        onClick={handleGoogleLogin} 
        className="w-full bg-white border border-gray-100 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-[#1A1A1A] hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
      >
        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-6 h-6" />
        Google Sign-In
      </button>
    </div>
  );
};

export default Login;
