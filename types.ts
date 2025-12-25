
export type AppView = 'home' | 'login' | 'itinerary' | 'checkout' | 'success' | 'chat' | 'tickets';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Booking {
  id: string;
  userId: string;
  from: string;
  to: string;
  fromCode: string;
  toCode: string;
  date: string;
  time: string;
  company: string;
  seats: string[];
  totalPrice: number;
  status: 'active' | 'completed' | 'cancelled';
  pnr: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'alice';
  text: string;
  timestamp: string;
}
