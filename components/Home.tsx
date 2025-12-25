
import React, { useState } from 'react';
import { User } from '../types';

interface HomeProps {
  user: User | null;
  onSearch: () => void;
  onChat: () => void;
  onProfile: () => void;
  onNotification: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onSearch, onChat, onProfile, onNotification }) => {
  const [transport, setTransport] = useState<'Bus' | 'Train'>('Bus');
  const [from, setFrom] = useState('Mumbai, MH');
  const [to, setTo] = useState('');

  const swapLocations = () => {
    const temp = from;
    setFrom(to || 'Destination');
    setTo(temp);
  };

  return (
    <div className="pb-24 pt-8 px-6 bg-[#FDFDFF]">
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-500 bg-violet-50 px-2 py-1 rounded-md mb-2 inline-block">TravelEase India</span>
          <h1 className="text-4xl font-extrabold text-[#1A1A1A] leading-tight">
            {user ? `Namaste, ${user.name.split(' ')[0]}!` : 'Chalo,'}<br />
            <span className="text-violet-500">let's explore.</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <button onClick={onNotification} className="p-3 bg-white rounded-full shadow-sm border border-gray-50 text-gray-600 active:scale-95 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button onClick={onProfile} className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md active:scale-95 transition-transform">
            <img src={user?.avatar || "https://picsum.photos/seed/user-india/100/100"} alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <div className="relative mb-10">
        <div className="bg-white rounded-[40px] p-6 shadow-2xl shadow-violet-100 border border-gray-50 relative z-10">
          <div className="flex justify-center mb-8">
            <div className="bg-[#F8F9FE] p-1.5 rounded-full flex gap-1 w-fit">
              <button onClick={() => setTransport('Bus')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 font-bold ${transport === 'Bus' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'text-gray-400'}`}>Bus</button>
              <button onClick={() => setTransport('Train')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 font-bold ${transport === 'Train' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'text-gray-400'}`}>Train</button>
            </div>
          </div>

          <div className="space-y-4 relative">
            <div className="bg-[#F8F9FE] p-4 rounded-3xl flex items-center gap-4 border border-transparent focus-within:border-violet-100 focus-within:bg-white transition-all">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-500"><div className="w-4 h-4 rounded-full border-4 border-violet-500 bg-white"></div></div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">From</p>
                <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} className="bg-transparent w-full font-bold text-[#1A1A1A] outline-none" />
              </div>
            </div>
            <div className="absolute right-6 top-[55px] z-20">
              <button onClick={swapLocations} className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-50 flex items-center justify-center text-violet-500 hover:rotate-180 transition-all active:scale-90"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg></button>
            </div>
            <div className="bg-[#F8F9FE] p-4 rounded-3xl flex items-center gap-4 border border-transparent focus-within:border-violet-100 focus-within:bg-white transition-all">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/><circle cx="12" cy="9" r="2.5"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">To</p>
                <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="e.g. Pune, MH" className="bg-transparent w-full font-bold text-[#1A1A1A] outline-none placeholder-gray-300" />
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-[#F8F9FE] p-4 rounded-3xl flex items-center gap-4 hover:bg-violet-50 transition-colors text-left">
                <div className="text-violet-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
                <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</p><p className="font-bold text-[#1A1A1A] text-sm whitespace-nowrap">Today, 24 Oct</p></div>
              </button>
              <button className="flex-1 bg-[#F8F9FE] p-4 rounded-3xl flex items-center gap-4 hover:bg-violet-50 transition-colors text-left">
                <div className="text-violet-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</p><p className="font-bold text-[#1A1A1A] text-sm">Now</p></div>
              </button>
            </div>

            <button onClick={onSearch} className="w-full bg-violet-500 text-white py-5 rounded-[28px] font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-violet-200 hover:bg-violet-600 active:scale-95 transition-all mt-4">
              Find My Trip
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-extrabold text-[#1A1A1A] mb-6 px-1">Trending Destinations</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group overflow-hidden rounded-[40px] h-64 text-left">
            <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80" alt="Manali" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-xl font-extrabold text-white mb-2">Manali</h3>
              <span className="px-3 py-1.5 bg-violet-500 text-white font-extrabold text-xs rounded-xl">₹1,200</span>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-[40px] h-64 text-left">
            <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80" alt="Goa" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-xl font-extrabold text-white mb-2">Goa</h3>
              <span className="px-3 py-1.5 bg-violet-500 text-white font-extrabold text-xs rounded-xl">₹950</span>
            </div>
          </div>
        </div>
      </div>

      <button onClick={onChat} className="fixed bottom-28 right-8 w-14 h-14 bg-violet-500 rounded-2xl shadow-2xl flex items-center justify-center text-white z-40 border-4 border-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
      </button>
    </div>
  );
};

export default Home;
