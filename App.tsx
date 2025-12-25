
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Itinerary from './components/Itinerary';
import Checkout from './components/Checkout';
import Success from './components/Success';
import Chat from './components/Chat';
import Tickets from './components/Tickets';
import { AppView, User, Booking } from './types';
import { db } from './services/db';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [user, setUser] = useState<User | null>(null);
  const [pendingBooking, setPendingBooking] = useState<Partial<Booking> | null>(null);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  // Check for session on load
  useEffect(() => {
    const savedEmail = localStorage.getItem('travelease_current_user');
    if (savedEmail) {
      const userData = db.getUserByEmail(savedEmail);
      if (userData) setUser(userData);
    }
  }, []);

  const navigate = (newView: AppView) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData: User) => {
    db.saveUser(userData);
    setUser(userData);
    localStorage.setItem('travelease_current_user', userData.email);
    
    // If we were in the middle of a booking, go back to checkout
    if (pendingBooking) {
      navigate('checkout');
    } else {
      navigate('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('travelease_current_user');
    navigate('home');
  };

  const startBooking = (details: Partial<Booking>) => {
    setPendingBooking(details);
    navigate('checkout');
  };

  const finalizeBooking = () => {
    if (!user) {
      alert("Please login to complete your booking.");
      navigate('login');
      return;
    }

    if (pendingBooking) {
      const fullBooking: Booking = {
        ...pendingBooking as Booking,
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        pnr: 'PNR' + Math.floor(100000 + Math.random() * 900000),
        status: 'active'
      };
      db.addBooking(fullBooking);
      setLastBooking(fullBooking);
      setPendingBooking(null);
      navigate('success');
    } else {
      console.error("No pending booking found");
    }
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home 
          user={user}
          onSearch={() => navigate('itinerary')} 
          onChat={() => navigate('chat')} 
          onProfile={() => navigate(user ? 'tickets' : 'login')}
          onNotification={() => alert("No new notifications")}
        />;
      case 'login':
        return <Login onLogin={handleLogin} onBack={() => navigate('home')} />;
      case 'itinerary':
        return <Itinerary onProceed={startBooking} onBack={() => navigate('home')} />;
      case 'checkout':
        return <Checkout booking={pendingBooking} onPay={finalizeBooking} onBack={() => navigate('itinerary')} />;
      case 'success':
        return <Success booking={lastBooking} onHome={() => navigate('home')} />;
      case 'chat':
        return <Chat onBack={() => navigate('home')} />;
      case 'tickets':
        return <Tickets user={user} onBack={() => navigate('home')} onLogout={handleLogout} />;
      default:
        return <Home user={user} onSearch={() => navigate('itinerary')} onChat={() => navigate('chat')} onProfile={() => navigate('login')} onNotification={() => {}} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDFDFF] relative overflow-hidden shadow-2xl">
      {renderView()}
      
      {['home', 'tickets'].includes(view) && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-md border-t border-gray-100 px-8 py-4 flex justify-between items-center z-50">
          <button onClick={() => navigate('home')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'home' ? 'text-violet-600' : 'text-gray-400'}`}>
            <div className={`p-2 rounded-xl transition-colors ${view === 'home' ? 'bg-violet-100' : ''}`}>
               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
            <span className="text-xs font-semibold">Search</span>
          </button>
          
          <button onClick={() => navigate(user ? 'tickets' : 'login')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'tickets' ? 'text-violet-600' : 'text-gray-400'}`}>
            <div className={`p-2 rounded-xl transition-colors ${view === 'tickets' ? 'bg-violet-100' : ''}`}>
               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
               </svg>
            </div>
            <span className="text-xs font-semibold">Tickets</span>
          </button>

          <button onClick={() => navigate(user ? 'tickets' : 'login')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'login' ? 'text-violet-600' : 'text-gray-400'}`}>
            <div className="p-2">
               {user ? (
                 <img src={user.avatar} className="w-6 h-6 rounded-full" alt="" />
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
               )}
            </div>
            <span className="text-xs font-semibold">{user ? 'Profile' : 'Login'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
