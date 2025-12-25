
import React, { useState } from 'react';
import { Booking } from '../types';

interface ItineraryProps {
  onProceed: (details: Partial<Booking>) => void;
  onBack: () => void;
}

const Itinerary: React.FC<ItineraryProps> = ({ onProceed, onBack }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState('24');
  
  const days = [{ day: 'Mon', num: '24' }, { day: 'Tue', num: '25' }, { day: 'Wed', num: '26' }, { day: 'Thu', num: '27' }, { day: 'Fri', num: '28' }];

  const seats = [
    { id: '1A', status: 'free' }, { id: '1B', status: 'sold' }, { id: '1C', status: 'free' }, { id: '1D', status: 'free' },
    { id: '2A', status: 'free' }, { id: '2B', status: 'free' }, { id: '2C', status: 'sold' }, { id: '2D', status: 'free' },
    { id: '3A', status: 'free' }, { id: '3B', status: 'free' }, { id: '3C', status: 'sold' }, { id: '3D', status: 'sold' },
    { id: '4A', status: 'free' }, { id: '4B', status: 'free' }, { id: '4C', status: 'free' }, { id: '4D', status: 'free' },
  ];

  const handleSeatClick = (id: string, status: string) => {
    if (status === 'sold') return;
    if (selectedSeats.includes(id)) setSelectedSeats(selectedSeats.filter(s => s !== id));
    else setSelectedSeats([...selectedSeats, id]);
  };

  const handleConfirm = () => {
    onProceed({
      from: 'Mumbai',
      to: 'Pune',
      fromCode: 'BOM',
      toCode: 'PNQ',
      date: '24 Oct, 2024',
      time: '07:30',
      company: 'Zingbus',
      seats: selectedSeats,
      totalPrice: selectedSeats.length * 450
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-32">
      <div className="px-6 pt-8 flex justify-between items-center mb-6">
        <button onClick={onBack} className="p-3 bg-white rounded-full shadow-md border border-gray-50 text-gray-800 active:scale-90 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div className="text-center">
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Itinerary</p>
          <div className="flex items-center gap-3"><span className="text-xl font-extrabold text-[#1A1A1A]">BOM</span><div className="flex gap-1.5"><div className="w-1 h-1 rounded-full bg-gray-200"></div><div className="w-1 h-1 rounded-full bg-gray-200"></div></div><span className="text-xl font-extrabold text-[#1A1A1A]">PNQ</span></div>
        </div>
        <div className="w-12"></div>
      </div>

      <div className="px-6 mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-extrabold text-[#1A1A1A]">Select Date</h2>
          <button className="text-violet-500 font-bold text-xs hover:underline">Calendar</button>
        </div>
        <div className="flex gap-3 overflow-x-auto custom-scrollbar">
          {days.map((d, i) => (
            <button key={i} onClick={() => setSelectedDay(d.num)} className={`min-w-[70px] flex flex-col items-center py-4 rounded-[32px] border-2 transition-all ${selectedDay === d.num ? 'border-violet-500 bg-white shadow-xl' : 'border-gray-50 bg-white'}`}>
              <span className={`text-[10px] font-bold uppercase mb-2 ${selectedDay === d.num ? 'text-violet-500' : 'text-gray-300'}`}>{d.day}</span>
              <span className={`text-xl font-extrabold ${selectedDay === d.num ? 'text-[#1A1A1A]' : 'text-gray-300'}`}>{d.num}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mb-4">
        <div className="bg-white rounded-[40px] p-6 shadow-2xl shadow-violet-100 border-2 border-violet-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-[#1A3A5A] rounded-2xl flex items-center justify-center p-2"><img src="https://picsum.photos/seed/zing/100/100" className="w-full h-full object-contain" alt="" /></div>
            <div>
              <h3 className="text-lg font-extrabold text-[#1A1A1A]">Zingbus</h3>
              <p className="text-xs font-bold text-violet-500">Premium Sleeper</p>
            </div>
            <div className="ml-auto text-right"><span className="text-2xl font-extrabold text-[#1A1A1A]">₹450</span></div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.08)] z-50 p-8 pt-4">
        <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6"></div>
        <div className="px-2 grid grid-cols-4 gap-4 mb-10">
          {seats.map((s) => (
            <button key={s.id} disabled={s.status === 'sold'} onClick={() => handleSeatClick(s.id, s.status)} className={`h-10 rounded-xl transition-all ${s.status === 'sold' ? 'bg-gray-100 opacity-40' : selectedSeats.includes(s.id) ? 'bg-violet-500 text-white' : 'bg-[#F8F9FE] text-gray-400'}`}>
              <span className="text-[10px] font-bold">{s.id}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div><p className="text-[10px] font-bold text-gray-400 uppercase">Seats: {selectedSeats.length}</p><p className="text-3xl font-extrabold text-[#1A1A1A]">₹{selectedSeats.length * 450}</p></div>
          <button disabled={selectedSeats.length === 0} onClick={handleConfirm} className={`px-10 py-5 rounded-[28px] font-bold text-lg transition-all ${selectedSeats.length > 0 ? 'bg-[#1A1A1A] text-white' : 'bg-gray-100 text-gray-400'}`}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
