
import React, { useState } from 'react';
import { Booking } from '../types';

interface SuccessProps {
  booking: Booking | null;
  onHome: () => void;
}

const Success: React.FC<SuccessProps> = ({ booking, onHome }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    if (!booking) return;
    setDownloading(true);
    
    // Simulate real PDF generation logic
    setTimeout(() => {
      const ticketContent = `
        TRAVELEASE INDIA - E-TICKET
        PNR: ${booking.pnr}
        ROUTE: ${booking.from} to ${booking.to}
        DATE: ${booking.date}
        SEATS: ${booking.seats.join(', ')}
        TOTAL: ₹${booking.totalPrice}
      `;
      
      const blob = new Blob([ticketContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Ticket_${booking.pnr}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      setDownloading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center px-8 text-center animate-slide-up">
      <div className="w-32 h-32 bg-emerald-50 rounded-[45px] flex items-center justify-center mb-10 shadow-2xl shadow-emerald-100 border-4 border-white rotate-12 transition-transform hover:rotate-0 duration-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-500 -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-4xl font-extrabold text-[#1A1A1A] mb-4">You're All Set!</h1>
      <p className="text-gray-400 font-medium mb-12 max-w-[280px]">
        {booking 
          ? `Your trip from ${booking.from} to ${booking.to} is confirmed.` 
          : "Your ticket has been booked successfully."}
      </p>

      <div className="w-full bg-white p-8 rounded-[40px] shadow-lg border border-gray-50 mb-12 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50 rounded-full -mr-12 -mt-12 opacity-50"></div>
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Confirmation PNR</p>
            <p className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">{booking?.pnr || "#TR-882194"}</p>
          </div>
          <div className="w-14 h-14 bg-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-200">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
             </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 mb-8">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Seats</p>
            <p className="font-bold text-[#1A1A1A]">{booking?.seats.join(', ') || '1C, 2B'}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Amount</p>
            <p className="font-bold text-[#1A1A1A]">₹{booking?.totalPrice || '900'}</p>
          </div>
        </div>

        <button 
          onClick={handleDownload}
          disabled={downloading}
          className={`w-full py-5 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 ${downloading ? 'bg-gray-100 text-gray-400' : 'bg-violet-50 text-violet-600 hover:bg-violet-100'}`}
        >
          {downloading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download E-Ticket
            </>
          )}
        </button>
      </div>

      <button 
        onClick={onHome}
        className="w-full bg-violet-500 text-white py-5 rounded-[28px] font-bold text-lg shadow-xl shadow-violet-200 hover:bg-violet-600 active:scale-95 transition-all"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Success;
