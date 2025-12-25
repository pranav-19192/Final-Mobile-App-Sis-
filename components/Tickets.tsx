
import React from 'react';
import { User, Booking } from '../types';
import { db } from '../services/db';

interface TicketsProps {
  user: User | null;
  onBack: () => void;
  onLogout: () => void;
}

const Tickets: React.FC<TicketsProps> = ({ user, onBack, onLogout }) => {
  const bookings = user ? db.getUserBookings(user.id) : [];

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-24">
      <div className="px-6 pt-8 flex justify-between items-center mb-10">
        <button onClick={onBack} className="p-3 bg-white rounded-full shadow-md border border-gray-50 text-gray-800 active:scale-90 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-xl font-extrabold text-[#1A1A1A]">My Journeys</h1>
        <button onClick={onLogout} className="text-pink-500 font-bold text-xs uppercase tracking-wider">Logout</button>
      </div>

      <div className="px-6 space-y-6">
        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
            </div>
            <p className="text-gray-400 font-bold">No bookings found.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-[40px] p-6 shadow-xl shadow-violet-50 border border-gray-50 relative overflow-hidden">
              <div className={`absolute top-0 right-0 px-4 py-2 text-[10px] font-bold rounded-bl-3xl uppercase tracking-widest ${booking.status === 'active' ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-50 text-gray-400'}`}>
                {booking.status}
              </div>
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-500">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                 </div>
                 <div>
                   <h3 className="font-extrabold text-[#1A1A1A]">{booking.from} to {booking.to}</h3>
                   <p className="text-xs text-gray-400 font-bold">{booking.date} • {booking.company}</p>
                 </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-100">
                 <span className="text-xs font-bold text-gray-400">PNR: {booking.pnr}</span>
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-300 uppercase">Total Paid</p>
                    <p className="font-extrabold text-[#1A1A1A]">₹{booking.totalPrice}</p>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tickets;
