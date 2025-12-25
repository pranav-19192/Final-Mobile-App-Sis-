
import React, { useState } from 'react';
import { Booking } from '../types';

interface CheckoutProps {
  booking: Partial<Booking> | null;
  onPay: () => void;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ booking, onPay, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'google'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!booking) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment gateway delay for realistic feel
    setTimeout(() => {
      onPay();
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] px-8 pt-8 flex flex-col pb-10">
      <div className="mb-10 flex items-center justify-between">
        <button onClick={onBack} className="p-3 bg-white rounded-full shadow-md border border-gray-50 text-gray-800 active:scale-90 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-xl font-extrabold text-[#1A1A1A]">Payment</h1>
        <div className="w-12"></div>
      </div>

      <div className="bg-white rounded-[40px] p-6 shadow-2xl shadow-violet-100 border border-gray-50 mb-10 relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-violet-500"></div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{booking.company} AC Journey</p>
            <h2 className="text-xl font-extrabold text-[#1A1A1A]">{booking.from} to {booking.to}</h2>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-sm font-bold"><span className="text-gray-400">Date</span><span className="text-[#1A1A1A]">{booking.date}</span></div>
          <div className="flex justify-between items-center text-sm font-bold"><span className="text-gray-400">Seats</span><span className="text-violet-500">{booking.seats?.join(', ')}</span></div>
        </div>

        <div className="border-t-2 border-dashed border-gray-100 pt-6 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-400">Total Price</span>
          <span className="text-3xl font-extrabold text-[#1A1A1A]">₹{booking.totalPrice}.00</span>
        </div>
      </div>

      <h2 className="text-xl font-extrabold text-[#1A1A1A] mb-6">Payment Method</h2>
      
      <div className="space-y-4 mb-10">
        <button 
          onClick={() => setPaymentMethod('upi')} 
          disabled={isProcessing}
          className={`w-full p-5 rounded-3xl flex items-center justify-between border-2 transition-all ${paymentMethod === 'upi' ? 'border-violet-500 bg-violet-50/50' : 'border-gray-50 bg-white'}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-violet-500 font-bold uppercase text-[10px]">UPI</div>
            <div>
              <p className="font-extrabold text-[#1A1A1A]">UPI Pay</p>
              <p className="text-[10px] font-bold text-gray-400">GPay, PhonePe, Paytm</p>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-violet-500 bg-violet-500' : 'border-gray-200'}`}>
            {paymentMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-white"></div>}
          </div>
        </button>

        <button 
          onClick={() => setPaymentMethod('card')} 
          disabled={isProcessing}
          className={`w-full p-5 rounded-3xl flex items-center justify-between border-2 transition-all ${paymentMethod === 'card' ? 'border-violet-500 bg-violet-50/50' : 'border-gray-50 bg-white'}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="font-extrabold text-[#1A1A1A]">Credit Card</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Visa/Mastercard</p>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-violet-500 bg-violet-500' : 'border-gray-200'}`}>
            {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-white"></div>}
          </div>
        </button>
      </div>

      <button 
        onClick={handlePayment} 
        disabled={isProcessing}
        className={`mt-auto w-full py-5 rounded-[28px] font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all ${isProcessing ? 'bg-gray-100 text-gray-400' : 'bg-violet-500 text-white shadow-violet-200 hover:bg-violet-600 active:scale-95'}`}
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            Pay ₹{booking.totalPrice}.00
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </>
        )}
      </button>
    </div>
  );
};

export default Checkout;
