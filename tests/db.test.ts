
import { db } from '../services/db';
import { User, Booking } from '../types';

/**
 * Database Unit Tests
 * Validates the persistence logic and data retrieval for users and bookings.
 */

const mockUser: User = {
  id: 'test-user-123',
  name: 'Test User',
  email: 'test@travelease.com',
  avatar: 'https://avatar.url'
};

const mockBooking: Booking = {
  id: 'booking-789',
  userId: 'test-user-123',
  from: 'Mumbai',
  to: 'Pune',
  fromCode: 'BOM',
  toCode: 'PNQ',
  date: '2024-10-24',
  time: '07:30',
  company: 'Zingbus',
  seats: ['1A', '1B'],
  totalPrice: 900,
  status: 'active',
  pnr: 'PNR123456'
};

export const runDbTests = () => {
  console.log('--- Starting Database Unit Tests ---');

  // Test 1: User Persistence
  db.saveUser(mockUser);
  const retrievedUser = db.getUserByEmail(mockUser.email);
  if (retrievedUser?.id === mockUser.id) {
    console.log('✅ PASS: User saved and retrieved correctly');
  } else {
    console.error('❌ FAIL: User retrieval failed');
  }

  // Test 2: Booking Persistence
  db.addBooking(mockBooking);
  const userBookings = db.getUserBookings(mockUser.id);
  if (userBookings.length > 0 && userBookings[0].id === mockBooking.id) {
    console.log('✅ PASS: Booking added and filtered by userId correctly');
  } else {
    console.error('❌ FAIL: Booking retrieval failed');
  }

  // Test 3: Multiple Users Isolation
  const secondUser: User = { ...mockUser, email: 'other@test.com', id: 'other-id' };
  db.saveUser(secondUser);
  const isolatedBookings = db.getUserBookings('other-id');
  if (isolatedBookings.length === 0) {
    console.log('✅ PASS: Bookings are isolated between users');
  } else {
    console.error('❌ FAIL: User booking isolation failed');
  }
};
