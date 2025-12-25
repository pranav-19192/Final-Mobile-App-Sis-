
import { User, Booking } from '../types';

const USERS_KEY = 'travelease_users';
const BOOKINGS_KEY = 'travelease_bookings';

class Database {
  // Initialize storage if empty
  private init() {
    if (!localStorage.getItem(USERS_KEY)) localStorage.setItem(USERS_KEY, JSON.stringify([]));
    if (!localStorage.getItem(BOOKINGS_KEY)) localStorage.setItem(BOOKINGS_KEY, JSON.stringify([]));
  }

  constructor() {
    this.init();
  }

  // User Operations
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }

  getUserByEmail(email: string): User | undefined {
    return this.getUsers().find(u => u.email === email);
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.email === user.email);
    if (index > -1) {
      users[index] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // Booking Operations
  getBookings(): Booking[] {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
  }

  getUserBookings(userId: string): Booking[] {
    return this.getBookings().filter(b => b.userId === userId);
  }

  addBooking(booking: Booking): void {
    const bookings = this.getBookings();
    bookings.push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }
}

export const db = new Database();
